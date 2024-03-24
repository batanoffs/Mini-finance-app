export const formatDate = (date) => {
    return new Intl.DateTimeFormat("bg-BG", {
        hour: "numeric",
        minute: "numeric",
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    }).format(new Date(date));
};