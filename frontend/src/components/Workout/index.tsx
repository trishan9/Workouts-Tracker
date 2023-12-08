import { Fragment } from "react";

import { WorkoutWithPageProps } from "@/atoms/workouts";

import { Button } from "@/components/ui/button";
import WorkoutCard from "./Card";
import AddWorkoutForm from "./CreateForm";
import WorkoutSort from "./Sort";

interface IWorkouts {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

const Workouts = ({
  workouts,
  getWorkouts,
}: {
  workouts: WorkoutWithPageProps;
  getWorkouts: (arg0: number) => void;
}) => {
  return (
    <Fragment>
      <AddWorkoutForm />

      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between">
          <WorkoutSort />
        </div>

        <div className="grid w-full grid-cols-1 content-start gap-6 xl:grid-cols-2 2xl:grid-cols-3 sm:min-h-[456px]">
          {workouts?.workouts?.map((data: IWorkouts) => (
            <WorkoutCard key={data._id} data={data} />
          ))}
        </div>

        <div className="flex items-center justify-between w-full col-span-1 text-lg xl:col-span-2 2xl:col-span-3 text-primary">
          <p className="">
            Showing{" "}
            <span className="font-semibold">{workouts.pageData.from}</span> to{" "}
            <span className="font-semibold">{workouts.pageData.to}</span> of{" "}
            <span className="font-semibold">
              {workouts.pageData.totalResults}
            </span>{" "}
            results
          </p>

          <div className="flex gap-3">
            <Button
              disabled={workouts.pageData.currentPage == 1}
              variant="outline"
              onClick={() => getWorkouts(workouts.pageData.currentPage - 1)}
            >
              Previous
            </Button>

            <Button
              disabled={!workouts.pageData.hasNextPage}
              variant="outline"
              onClick={() => getWorkouts(workouts.pageData.currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Workouts;
