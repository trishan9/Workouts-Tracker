import { formatDistance } from "date-fns";

const getTimeAgo = (date: string) => {
  const timeAgo = formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
  return timeAgo;
};

export default getTimeAgo;
