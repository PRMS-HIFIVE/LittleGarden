export interface DdayResult{
    text: string;
    isOverdue: boolean;
}

/**
 * D-day를 계산하는 함수
 * @param last_watering - 마지막으로 물 준 날짜 (YYYY-MM-DD 형식의 문자열)
 * @param wateringCycle - 물 주기 간격 (일)
 * @returns D-day 정보 객체 (예: { text: "D-Day", isOverdue: true })
 */
export const calculateDday = (last_watering: string, wateringCycle: number): DdayResult => {
    if (!last_watering || !wateringCycle || isNaN(wateringCycle)) {
        return { text: '정보 없음', isOverdue: false };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정하여 날짜만 비교

    const lastDate = new Date(last_watering);
    lastDate.setHours(0, 0, 0, 0);

    const nextWateringDate = new Date(lastDate);
    nextWateringDate.setDate(lastDate.getDate() + wateringCycle);

    const timeDiff = nextWateringDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if(dayDiff <= 0){
        const text = dayDiff === 0 ? 'D-Day' : `D+${Math.abs(dayDiff)}`;
        return {text, isOverdue: true};
    }

    return {text: `D-${dayDiff}`, isOverdue: false}
};
