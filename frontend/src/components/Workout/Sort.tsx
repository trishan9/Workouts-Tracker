import { useRecoilState } from "recoil";

import { selectOptionState, sortState } from "@/atoms/workouts";
import { ISortMethods } from "@/atoms/workouts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WorkoutSort = () => {
  const [sort, setSort] = useRecoilState(sortState);
  const [selectOption, setSelectOption] = useRecoilState(selectOptionState);

  const handleChange = (data: ISortMethods["method"]) => {
    setSort(data);
    setSelectOption("");
  };

  return (
    <Select
      value={selectOption == "reset" ? "" : sort}
      onValueChange={handleChange}
    >
      <SelectTrigger className="sm:w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Title</SelectLabel>

          <SelectItem value="title-asc">Ascending Title</SelectItem>

          <SelectItem value="title-desc">Descending Title</SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Date</SelectLabel>

          <SelectItem value="date-asc">Ascending Date</SelectItem>

          <SelectItem value="date-desc">Descending Date</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WorkoutSort;
