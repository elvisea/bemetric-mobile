function formatHours(label: string, value: number | null) {
  if (label !== "horas") {
    if (value) {
      return String(value);
    } else {
      return "";
    }
  } else {
    if (value) {
      const [hours, minutes] = String(value).split(".");

      return `${hours}h ${minutes}m`;
    } else {
      return "";
    }
  }
}

const formatHour = (value: string) => {
  const [hours, minutes] = value.split(".");
  const min = minutes ? minutes : "00";

  return `${hours}h ${min}m`;
};

export { formatHours, formatHour };
