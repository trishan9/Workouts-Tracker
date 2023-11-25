import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useWorkouts from "@/hooks/use-workouts";
import spinner from "@/assets/spinner.gif";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Workout Title is required.",
  }),
  load: z.string().min(1, {
    message: "Workout Load is required.",
  }),
  reps: z.string().min(1, {
    message: "Workout Reps is required.",
  }),
});

const AddWorkoutForm = () => {
  const { isPending, addWorkout } = useWorkouts();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      load: "0",
      reps: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
      title: values.title,
      load: values.load,
      reps: values.reps,
    };
    //@ts-expect-error ignore
    addWorkout(payload);
  };

  return (
    <Card className="w-full sm:w-[650px] mb-6 sm:mb-0">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Add Workout</CardTitle>

          <CardDescription>Add your new workout in one-click.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <div className="grid items-center w-full gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <FormControl>
                      <Input placeholder="Title of Workout" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="load"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Load (in kg)</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Load of Workout"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Reps of Workout"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={() => form.reset()} variant="outline">
            Cancel
          </Button>

          <Button
            className="flex items-center gap-2"
            disabled={isPending}
            type="submit"
          >
            Add
            {isPending && <img src={spinner} className="w-6" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddWorkoutForm;
