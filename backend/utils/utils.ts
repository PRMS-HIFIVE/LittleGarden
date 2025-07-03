export const getWatercycleColumn = (month: number): string => {
    switch (true) {
        case month >= 3 && month <= 5:
            return 'watercycleSprngCode';
        case month >= 6 && month <= 8:
            return 'watercycleSummerCode';
        case month >= 9 && month <= 11:
            return 'watercycleAutumnCode';
        case month === 12 || month <= 2:
            return 'watercycleWinterCode';
        default:
            throw new Error('Invalid month');
    }
}