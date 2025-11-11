const useFormatDate = (utcDate) => {
  if (!utcDate) return "";
  try {
    const date = new Date(utcDate);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  } catch (err) {
    console.error("Invalid date passed to useFormatDate:", utcDate, err);
    return "";
  }
};

export default useFormatDate;
