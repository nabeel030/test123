import './bootstrap';
import { createApp } from 'vue';

const app = createApp({});

const components = import.meta.glob('./components/*.vue', { eager: true });

Object.entries(components).forEach(([path, definition]) => {
    const componentName = path.split('/').pop().replace('.vue', '');
    app.component(componentName, definition.default);
});

app.mount('#app');
