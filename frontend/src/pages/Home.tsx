import { FC, Fragment, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import workoutsState from "@/atoms/workouts";
import { tokenState } from "@/atoms/user";

import WorkoutCard from "@/components/WorkoutCard";
import AddWorkoutForm from "@/components/AddWorkoutForm";
import { Button } from "@/components/ui/button";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface WorkoutProps {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

const Home: FC = () => {
  const [token] = useRecoilState(tokenState);
  const [workouts, setWorkouts] = useRecoilState(workoutsState);

  const getWorkouts = async (pageNum?: number) => {
    const res = await axios.get(
      `${VITE_API_BASE_URL}/api/workouts/?page=${pageNum ? pageNum : 1}`,
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    if (pageNum) setWorkouts(res.data);
    return res;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => getWorkouts(),
  });

  useEffect(() => {
    if (data) setWorkouts(data.data);
  }, [data]);

  return (
    <div className="w-full gap-6 p-6 sm:flex sm:flex-row-reverse sm:items-start">
      {isLoading && <p>Loading...</p>}

      {data && workouts?.workouts?.length > 0 && (
        <Fragment>
          <AddWorkoutForm />

          <div className="flex flex-col w-full gap-6">
            <div className="grid w-full grid-cols-1 content-start gap-6 xl:grid-cols-2 2xl:grid-cols-3 min-h-[456px]">
              {workouts?.workouts?.map((data: WorkoutProps) => (
                <WorkoutCard key={data._id} data={data} />
              ))}
            </div>

            <div className="flex items-center justify-between w-full col-span-1 text-lg xl:col-span-2 2xl:col-span-3 text-primary">
              <p className="">
                Showing{" "}
                <span className="font-semibold">{workouts.pageData.from}</span>{" "}
                to <span className="font-semibold">{workouts.pageData.to}</span>{" "}
                of{" "}
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
      )}

      {!isLoading && workouts?.workouts?.length == 0 && <AddWorkoutForm />}
    </div>
  );
};

export default Home;
