import { getUrl } from "./constants"

export const getStaff = async () => {
    const response = await fetch(getUrl('staff'));
    if (!response.ok) {
        throw new Error(`Couldn't fetch staff list`);
    }
    return response.json();
}