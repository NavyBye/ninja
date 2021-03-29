import app from './app';
import view from './views';
import LoginView from './views/LoginView';
import Radio from 'backbone.radio';

const Router = Backbone.Router.extend({
    routes: {
        'login': 'login',
        '': 'home',
        'home': 'home',
    },
    initialize,
    login,
    home,
});

function initialize() {
    const channel = Radio.channel('route');

    /* listen on route event */
    const router = this;
    channel.on('route', function(target) {
        router.navigate(target, {trigger: true});
    });
}

function home() {
    app.rootView.show('main', new view.MainView());
}

function login() {
    app.rootView.show('main', new view.LoginView());
}

export default Router;