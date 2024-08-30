export const transformDataInMoth = (data: Date): number => {
    const moth = data.getMonth()
    return moth + 1;
};

export const transformDataInYear = (data: Date): number => {
    return data.getFullYear();
};

export const extractNumber = (value: string): number => {
    const match = value.match(/\d+/)
    return match ? parseInt(match[0], 10) : 0;
}