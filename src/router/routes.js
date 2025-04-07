import MainScreen from "@/views/MainScreen.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: MainScreen,
        meta: {
            title: 'Compiner'
        }
    },
    {
        path: '/goals',
        name: 'MyGoals',
        component: MainScreen,
        meta: {
            title: 'Мои цели'
        }
    },

];

export default routes;
