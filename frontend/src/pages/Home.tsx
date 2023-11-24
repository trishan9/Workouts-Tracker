import { FC, Fragment } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { useRecoilState } from "recoil";
import workoutsState from "@/atoms/workouts";
import { useQuery } from "@tanstack/react-query";
import { tokenState } from "@/atoms/user";
import axios from "axios";
import AddWorkoutForm from "@/components/AddWorkoutForm";

const Home: FC = () => {
  const [token] = useRecoilState(tokenState);
  const [workouts, setWorkouts] = useRecoilState(workoutsState);
  interface WorkoutProps {
    _id: string;
    title: string;
    load: number;
    reps: number;
    createdAt: string;
  }

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

  if (data) setWorkouts(data.data);

  return (
    <div className="flex items-start w-full gap-6 p-12">
      {isLoading && <p>Loading...</p>}

      {workouts?.workouts?.length > 0 && (
        <Fragment>
          <div className="grid w-full grid-cols-3 gap-6">
            {workouts?.workouts?.map((data: WorkoutProps) => (
              <WorkoutCard key={data._id} data={data} />
            ))}

            <p>Current Page:{workouts.currentPage}</p>
            <p>Total Pages: {workouts.totalPages}</p>
          </div>
          <AddWorkoutForm />
        </Fragment>
      )}
    </div>
  );
};

export default Home;
