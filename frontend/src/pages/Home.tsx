import { FC, Fragment, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import workoutsState from "@/atoms/workouts";
import { tokenState } from "@/atoms/user";

import WorkoutCard from "@/components/WorkoutCard";
import AddWorkoutForm from "@/components/AddWorkoutForm";

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

  const getWorkouts = async (pageNum: number) => {
    return await axios.get(`/api/workouts/?page=${pageNum}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => getWorkouts(1),
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

          <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
            {workouts?.workouts?.map((data: WorkoutProps) => (
              <WorkoutCard key={data._id} data={data} />
            ))}

            <p>Current Page:{workouts.currentPage}</p>

            <p>Total Pages: {workouts.totalPages}</p>
          </div>
        </Fragment>
      )}

      {!isLoading && workouts?.workouts?.length == 0 && <AddWorkoutForm />}
    </div>
  );
};

export default Home;
