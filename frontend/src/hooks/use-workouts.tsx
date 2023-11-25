import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { tokenState } from "@/atoms/user";
import { toast } from "@/components/ui/use-toast";

interface WorkoutPayload {
  title: string;
  load: number;
  reps: number;
}

const useWorkouts = () => {
  const queryClient = useQueryClient();
  const [token] = useRecoilState(tokenState);

  const addMutation = useMutation({
    mutationFn: async (payload: WorkoutPayload) => {
      return await axios.post("/api/workouts", payload, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    //@ts-expect-error ignore
    onError: ({ response }: unknown) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response?.data?.error,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | undefined) => {
      return await axios.delete(`/api/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      toast({
        title: "Success",
        description: "Workout Deleted Succesfully!",
      });
    },
  });

  const addWorkout = (payload: WorkoutPayload) => {
    addMutation.mutate(payload);
  };

  const deleteWorkout = (id: string | undefined) => {
    deleteMutation.mutate(id);
  };

  return {
    addWorkout,
    deleteWorkout,
    isPending: addMutation.isPending,
  };
};

export default useWorkouts;
