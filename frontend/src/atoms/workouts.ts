import { atom } from "recoil";

export interface WorkoutWithPageProps {
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

export interface ISortMethods {
  method: "title-asc" | "title-desc" | "date-asc" | "date-desc";
}

const workoutsState = atom<WorkoutWithPageProps>({
  key: "workoutsState",
  //@ts-expect-error ignore
  default: [] as WorkoutProps,
});

export const sortState = atom<ISortMethods["method"]>({
  key: "sortState",
  default: "date-desc",
});

export const selectOptionState = atom<string>({
  key: "selectOptionState",
  default: "",
});

export default workoutsState;
