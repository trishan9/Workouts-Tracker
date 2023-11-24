import { atom } from "recoil";

interface WorkoutProps {
  currentPage: number;
  hasNextPage: boolean;
  success: boolean;
  totalPages: number;
  workouts: [];
}

const workoutsState = atom<WorkoutProps>({
  key: "workoutsState",
  //@ts-expect-error ignore
  default: [] as WorkoutProps,
});

export default workoutsState;
