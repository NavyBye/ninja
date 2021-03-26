import RootView from './views/RootView';

const App = Marionette.Application.extend({
    region: '#root',
    onStart() {
        console.log('App Start!');
        Backbone.history.start();
        this.showView(new RootView());
    }
});

export default App;