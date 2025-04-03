import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */

// import './echo';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
Pusher.logToConsole = true; // Add this line

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('🟢 WebSocket Connected');
});

window.Echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('🔴 WebSocket Disconnected');
});

window.Echo.connector.pusher.connection.bind('reconnecting', () => {
    console.log('🟡 WebSocket Reconnecting...');
});

window.Echo.connector.pusher.connection.bind('reconnected', () => {
    console.log('🟢 WebSocket Reconnected');
});
