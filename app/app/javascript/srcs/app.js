import RootView from './views/RootView';

const app = {
    start() {
        Backbone.history.start();
        new RootView().render();
    },
};

export default app;