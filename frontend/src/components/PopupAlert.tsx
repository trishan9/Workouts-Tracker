import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Map {
  [key: string]: string | undefined;
}

const MESSAGE: Map = {
  DELETE:
    "This will permanently delete your workout and remove your workout data from our servers.",
  LOGOUT:
    "This will log you out of your Workouts Tracker and you'll need to re-login next time.",
};

const PopupAlert = ({
  type,
  handleClick,
}: {
  type: "DELETE" | "LOGOUT";
  handleClick: () => void;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

        <AlertDialogDescription>
          This action cannot be undone. {MESSAGE[type]}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <AlertDialogAction
          className="bg-destructive hover:bg-destructive/90"
          onClick={handleClick}
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default PopupAlert;
