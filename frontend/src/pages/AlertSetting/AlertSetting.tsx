import * as S from './AlertSetting.style';
import MainpageHeader from '@/common/Header/HeaderVariants/MainpageHeader';

const subscribeUser = async () => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const applicationServerKey = urlBase64ToUint8Array("BBVnko8Rz9Ayottqou8j9mkgnAZuWbG5wzqQAhDhBZAwzL1Euq3WHKrnqc2pPo1lvQ336WcsvNVxzNuakQa8zsM");

        const options = {
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        };

        const subscription = await registration.pushManager.subscribe(options);
        console.log('✅ Push 구독 성공:', subscription);
        const response = await fetch(`http://localhost:5000/push`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription: subscription,
                // userId: 5, 
                deviceType: '',
                deviceName: navigator.userAgent 
            }),
            credentials: "include",
        });

        if (response.ok) {
            console.log('✨ 구독 정보 서버 전송 성공!');
        } else {
            const errorData = await response.json();
            console.error('❌ 구독 정보 서버 전송 실패:', errorData.message);
        }
    } catch (error) {
        console.error('❌ 구독 요청 중 오류 발생:', error);
    }
};

function urlBase64ToUint8Array(base64String : string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


function AlertSetting(){
    return(
        <>
            <MainpageHeader />
            <S.AlertSettingWrapper>
                <S.AlertTitleArea>
                    <S.AlertTitle>🔔 알림 설정</S.AlertTitle>
                </S.AlertTitleArea>
                <S.AlertSettingArea>
                    <S.AlertSettingBox>
                        <label>
                            <span>전체 푸시 알림</span>
                            <input role="switch" type="checkbox" onClick={() => (subscribeUser())}/>
                        </label>
                    </S.AlertSettingBox>
                </S.AlertSettingArea>
            </S.AlertSettingWrapper>
        </>
    )
}


export default AlertSetting;