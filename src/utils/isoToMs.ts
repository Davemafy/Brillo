export const isoToMs = (isoDate: string) => {
    const dateString = isoDate.replace(" ", "T");
    return new Date(dateString).getTime();
}