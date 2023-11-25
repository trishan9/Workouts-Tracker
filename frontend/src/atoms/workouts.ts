import { atom } from "recoil";

interface WorkoutProps {
  pageData: {
    currentPage: number;
    hasNextPage: boolean;
    totalPages: number;
    totalResults: number;
    from: number;
    to: number;
  };
  success: boolean;
  workouts: [];
}

const workoutsState = atom<WorkoutProps>({
  key: "workoutsState",
  //@ts-expect-error ignore
  default: [] as WorkoutProps,
});

export default workoutsState;
