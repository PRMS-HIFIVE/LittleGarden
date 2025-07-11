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

export const arrayBufferToBase64Url = (buffer: ArrayBuffer | null) : string => {
    if (buffer) {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return "";
}

export const isDuplicateSubscription = (result: any[], endpoint: string): boolean => {
    return result.some(row => {
        if (!row.subscription) return false;
        try {
            const sub = JSON.parse(row.subscription);
            return sub.endpoint === endpoint;
        } catch {
            return false;
        }
    });
}