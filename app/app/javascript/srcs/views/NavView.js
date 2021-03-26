import navTemplate from '../templates/nav.html';

const NavView = Marionette.View.extend({
    className: 'container-fluid justify-content-center',
    template: navTemplate,
});

export default NavView;