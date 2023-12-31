import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import useLogin from "@/hooks/use-login";
import spinner from "@/assets/spinner.gif";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Must be valid email address").min(1, {
    message: "Email Address is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser, isPending } = useLogin();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    loginUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>

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

              <FormControl className="flex items-center justify-between ">
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

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="flex items-center gap-2"
        >
          Log In
          {isPending && <img src={spinner} className="w-6" />}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
