import NavView from './NavView';
import MainView from './MainView';
import LoginView from './LoginView';
import template from '../templates/root.html';
import common from '../common';

const RootView = common.View.extend({
    el: '#root',
    template,
    onRender() {
        console.log('[RootView.onRender]');
        this.addRegion('nav', '#nav');
        this.addRegion('main', '#main');

        this.getRegion('nav').show(new NavView());
        this.getRegion('main').show(new MainView());
    },
});

export default RootView;