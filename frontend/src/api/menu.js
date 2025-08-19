import { getUrl } from "./constants"

export const getMenu = async () => {
    const response = await fetch(getUrl('menu'));
    if (!response.ok) {
        throw new Error(`Couldn't fetch menu list`);
    }
    return response.json();
}