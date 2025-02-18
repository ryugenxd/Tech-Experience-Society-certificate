export function createSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

export function setCapitalize(text: string) {
    return text.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

