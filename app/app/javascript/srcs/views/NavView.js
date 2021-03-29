import template from '../templates/nav.html';
import common from '../common';
import Radio from 'backbone.radio';

const NavView = common.View.extend({
    el: '#nav',
    events: {
        'click a': 'link',
    },
    template,
    link,
});

/* click route event when clicking a link */
function link(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href').substr(1); // #main -> main, remove sharp
    const routeChannel = Radio.channel('route');

    routeChannel.trigger('route', target);
}

export default NavView;