import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import useSignup from "@/hooks/use-signup";
import spinner from "@/assets/spinner.gif";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  avatar: z.string().min(1, {
    message: "Profile Picture is required",
  }),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z.string().email("Must be valid email address").min(1, {
    message: "Email Address is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { createUser, isPending } = useSignup();

  //@ts-expect-error ignore
  function onSubmit(values: z.infer<typeof formSchema>, event) {
    values.avatar = event.target.avatar.files[0];
    createUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>

              <FormControl>
                <Input id="picture" type="file" accept="image/*" {...field} />
              </FormControl>

              <FormDescription>
                This is your public profile picture.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>

              <FormDescription>
                This is your public display name.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>

              <FormDescription>
                This is your email address which you'll use for logging in.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input {...field} type={showPassword ? "text" : "password"} />
              </FormControl>

              <button
                type="button"
                className="absolute right-0 mr-2 top-[32px]"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <EyeIcon className="w-4" />
                ) : (
                  <EyeOffIcon className="w-4" />
                )}
              </button>

              <FormDescription>This is your private password.</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="flex items-center gap-2"
        >
          Create Account
          {isPending && <img src={spinner} className="w-6" />}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
