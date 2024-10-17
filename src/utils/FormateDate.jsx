export function formatDate(isoString) {

    if (!isoString) {
        return ""
    }
    const date = new Date(isoString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = months[monthIndex];
    const formattedDate = `${day.toString().padStart(2, '0')}-${monthName}-${year}`;

    return formattedDate;
}

// export default formatDate;