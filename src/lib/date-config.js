import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);
dayjs.locale("en", {
    relativeTime: {
        future: "%s",
        past: "%s ago",
        s: "%ds",
        ss: "%ds",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1M",
        MM: "%dM",
        y: "1y",
        yy: "%dy"
    }
})