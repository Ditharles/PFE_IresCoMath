//formater les dates envoyés par la base de données 
export const formatDate = (dateString: string | number | Date | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
};