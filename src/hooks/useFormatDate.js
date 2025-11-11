import { useMemo } from "react";

const useFormatDate = (utcDate) => {
    const formatted = useMemo(() => {
        if (!utcDate) return "";

        try {
            const date = new Date(utcDate);

            // Format date & time in user's local timezone
            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                
            };

            return date.toLocaleString(undefined, options);
        } catch (err) {
            console.error("Invalid date passed to useFormatDate:", utcDate + err);
            return "";
        }
    }, [utcDate]);

    return formatted;
};

export default useFormatDate;
