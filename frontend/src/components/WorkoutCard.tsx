import { Trash2Icon } from "lucide-react";

import useWorkouts from "@/hooks/use-workouts";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PopupAlert from "./PopupAlert";

interface WorkoutProps {
  _id?: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

const WorkoutCard = ({ data }: { data: WorkoutProps }) => {
  const { deleteWorkout } = useWorkouts();

  const handleDelete = (id: string | undefined) => {
    deleteWorkout(id);
  };

  return (
    <div className="flex items-start justify-between p-6 border rounded-sm shadow-sm h-fit bg-background text-secondary-foreground">
      <div>
        <p className="text-xl font-medium text-primary">{data.title}</p>

        <div className="mt-2 text-gray-500">
          <p>
            <span className="font-semibold">Loads: </span>
            {data.load} (kg)
          </p>

          <p>
            <span className="font-semibold">Reps: </span>
            {data.reps}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="mb-6 text-sm">{data.createdAt.slice(0, 10)}</p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 border rounded-sm active:scale-105 bg-secondary hover:bg-secondary/80">
              <Trash2Icon className="w-5 text-destructive" />
            </button>
          </AlertDialogTrigger>

          <PopupAlert
            type="DELETE"
            handleClick={() => handleDelete(data._id)}
          />
        </AlertDialog>
      </div>
    </div>
  );
};

export default WorkoutCard;
