// 푸시 알림 수신 이벤트
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || '새 알림';
    const options = {
        body: data.body || '내용이 없습니다.',
        icon: data.icon || '../src/assets/icons/Logo.svg', // 기본 아이콘 
        badge: data.badge || '../src/assets/icons/Logo.svg', // Android 아이콘
        data: {
            url: data.url || 'http://localhost:5173' // 알림 클릭 시 이동할 URL
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // 알림 닫기

    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

// 서비스 워커 설치 이벤트 (최초 설치 시 한 번만 실행)
self.addEventListener('install', function(event) {
    console.log('Service Worker installing...');
    self.skipWaiting(); // 이전 버전의 서비스 워커가 있다면 즉시 새 버전으로 활성화
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', function(event) {
    console.log('Service Worker activating...');
    event.waitUntil(self.clients.claim()); // 현재 페이지를 즉시 제어
});