import { Trash2Icon } from "lucide-react";

interface WorkoutProps {
  title: string;
  load: number;
  reps: number;
  createdAt: string;
}

const WorkoutCard = ({ data }: { data: WorkoutProps }) => {
  return (
    <div className="flex items-start justify-between p-6 bg-white border rounded-sm shadow-sm text-secondary-foreground">
      <div>
        <p className="text-xl font-medium text-primary">{data.title}</p>

        <div className="text-gray-500">
          <p>Loads: {data.load} (kg)</p>

          <p>Reps: {data.reps}</p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <p className="text-sm">{data.createdAt.slice(0, 10)}</p>

        <button className="active:scale-105">
          <Trash2Icon className="text-destructive" />
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
