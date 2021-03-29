import ContentView from "./ContentView";
import SideView from "./SideView";
import template from '../templates/main.html';
import common from '../common';

const MainView = Marionette.View.extend({
    template,
    regions: {
        content: '#content',
        sidebar: '#sidebar',
    },
    onRender() {
        this.addRegion('content', '#content');
        this.addRegion('sidebar', '#sidebar');
    },
});

export default MainView;