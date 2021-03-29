import ContentView from "./ContentView";
import SideView from "./SideView";
import template from '../templates/main.html';
import common from '../common';

const MainView = common.View.extend({
    template,
    onRender() {
        this.addRegion('content', '#content');
        this.addRegion('sidebar', '#sidebar');
    },
});

export default MainView;