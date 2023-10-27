// pwaUpdateNotifications.ts
import Swal from 'sweetalert2';

export function setupPwaUpdateNotifications() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              const newVersion = '1.1.1';
              showUpdateNotification(registration, newVersion); 
              window.addEventListener('message', receiveMessage);    
            }
          });
        }
      });
    });
  }
}

function showUpdateNotification(registration: ServiceWorkerRegistration, newVersion: string) {
  Swal.fire({
    title: 'App Update Available',
    text: `A new version of the app (${newVersion}) is available. Click OK to refresh.`,
    icon: 'info',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  }).then((result: { isConfirmed: boolean }) => {
    if (result.isConfirmed) {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });

      // Reload once
      window.location.reload();

      // Reload again
      setTimeout(() => {
        window.location.reload();
      }, 1000); // รอ 1 วินาทีก่อนเริ่ม reload ครั้งที่สอง
    }
  });
}

function receiveMessage() {
  window.parent.postMessage('AppUpdate');
}

