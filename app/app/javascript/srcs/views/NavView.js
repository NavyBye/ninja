import template from '../templates/nav.html';
import common from '../common';

const NavView = common.View.extend({
    el: '#nav',
    template,
});

export default NavView;