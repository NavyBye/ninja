import view from './views'
import Router from './router';

const app = {
    start() {
        if (Backbone.History.started)
            return ;
        Backbone.history.start();
        this.rootView = new view.RootView();
        this.rootView.render();
        this.router = new Router();
        
    },
};

export default app;