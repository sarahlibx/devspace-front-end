export const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);


    if (isNaN(date.getTime())) {
        return new Date(dateString.replace(' ', 'T')).toLocaleDateString();
    }
    return date.toLocaleDateString();
}    