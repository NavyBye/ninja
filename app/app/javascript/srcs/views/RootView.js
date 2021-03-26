import NavView from './NavView';
import MainView from './MainView';
import rootTemplate from '../templates/root.html';

const RootView = Marionette.View.extend({
    template: rootTemplate,
    regions: {
        nav: '#nav',
        main: '#main',
    },
    onRender() {
        console.log('[RootView.onRender]');
        this.showChildView('nav', new NavView());
        this.showChildView('main', new MainView());
    },
});

export default RootView;