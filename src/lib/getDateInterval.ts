import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export const getDateInterval = (date: Date | string) => {
  dayjs.extend(relativeTime);

  return dayjs(date).fromNow();
};
