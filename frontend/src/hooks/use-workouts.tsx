import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { tokenState } from "@/atoms/user";
import { selectOptionState, sortState } from "@/atoms/workouts";
import { toast } from "@/components/ui/use-toast";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface WorkoutPayload {
  title: string;
  load: number;
  reps: number;
}

const useWorkouts = () => {
  const queryClient = useQueryClient();
  const [token] = useRecoilState(tokenState);
  const [, setSelectOption] = useRecoilState(selectOptionState);
  const [, setSort] = useRecoilState(sortState);

  const addMutation = useMutation({
    mutationFn: async (payload: WorkoutPayload) => {
      return await axios.post(`${VITE_API_BASE_URL}/api/workouts`, payload, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setSelectOption("reset");
      setSort("date-desc");
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
      return await axios.delete(`${VITE_API_BASE_URL}/api/workouts/${id}`, {
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
