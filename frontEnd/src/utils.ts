
export const formatDollarsToCents = (value: number): number => {
    return value ? (value * 100) : 0
};

export const formatCentsToDollars = (value: number): number => {
    return value ? value / 100 : 0;
}