import { FC, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import workoutsState, { sortState } from "@/atoms/workouts";
import { tokenState } from "@/atoms/user";

import AddWorkoutForm from "@/components/Workout/CreateForm";
import Workouts from "@/components/Workout";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home: FC = () => {
  const [token] = useRecoilState(tokenState);
  const [workouts, setWorkouts] = useRecoilState(workoutsState);
  const [sortMethod] = useRecoilState(sortState);

  const getWorkouts = async (pageNum?: number) => {
    const res = await axios.get(
      `${VITE_API_BASE_URL}/api/workouts/?page=${
        pageNum ? pageNum : 1
      }&sortBy=${sortMethod}`,
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

  useEffect(() => {
    getWorkouts(1);
  }, [sortMethod]);

  return (
    <div className="w-full gap-6 p-6 sm:flex sm:flex-row-reverse sm:items-start">
      {isLoading && <p>Loading...</p>}

      {data && workouts?.workouts?.length > 0 && (
        <Workouts workouts={workouts} getWorkouts={getWorkouts} />
      )}

      {!isLoading && workouts?.workouts?.length == 0 && <AddWorkoutForm />}
    </div>
  );
};

export default Home;
