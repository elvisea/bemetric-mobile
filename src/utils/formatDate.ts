function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return {
    show: `${day}/${month}/${year}`,
    send: `${year}/${month}/${day}T00:00`,
  };
}

export { formatDate };
