import { createPinia } from 'pinia';
import piniaPersistedStatePlugin from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPersistedStatePlugin);

export default pinia;
