import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export default function fromNow(
  date: Date | string,
  withoutSuffix: boolean = false
) {
  return dayjs(date).fromNow(withoutSuffix);
}
