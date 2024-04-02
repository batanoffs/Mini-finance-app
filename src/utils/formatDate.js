export const formatDate = (date) => {
    return new Intl.DateTimeFormat("bg-BG", {
        hour: "numeric",
        minute: "numeric",
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    }).format(new Date(date));
};

export const formatDateTable = (date) => {
    return new Intl.DateTimeFormat("bg-BG", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "long",
    }).format(new Date(date));
}