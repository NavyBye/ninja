import ContentView from "./ContentView";
import SideView from "./SideView";
import mainTemplate from '../templates/main.html';

const MainView = Marionette.View.extend({
    template: mainTemplate,
    regions: {
        content: '#content',
        sidebar: '#sidebar',
    },
    onRender() {
        this.showChildView('content', new ContentView());
        this.showChildView('sidebar', new SideView());
    },
});

export default MainView;