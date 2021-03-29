import Region from "./Region";

const View = Backbone.View.extend({
    preinitialize,
    initialize,
    render,
    addRegion,
    getRegion,
    show,
    destroy,
});

function preinitialize() {
    this.listenTo(this, 'initialize', this.onInitialize);
    this.listenTo(this, 'render', this.onRender);
    this.listenTo(this, 'destroy', this.onDestroy);
}

function initialize(obj) {
    this.trigger('before:initialize', obj);

    this.regions = {};  
    if (obj && obj.model) {
        this.model = obj.model;
        this.listenTo(this.model, 'change', this.render);
    }

    this.trigger('initialize', obj);
    this.trigger('after:initialize', obj);
}

function render(obj) {
    this.trigger('before:render');

    let el;
    if (obj && obj.el)
        el = obj.el;
    else
        el = this.el;

    const template = this.template || _.template('');
    if (this.model) {
        $(el).html(template(this.model.toJSON()));
    } else {
        $(el).html(template());
    }

    this.trigger('render');
    this.trigger('after:render');
    return this;
}

function getRegion(regionName) {
    if (regionName in this.regions) {
        return this.regions[regionName];
    } else {
        throw 'no region named ' + regionName + '!';
    }
}

function addRegion(regionName, selector) {
    this.regions[regionName] = new Region(regionName, selector);
}

function show(regionName, view) {
    const region = this.getRegion(regionName);
    region.show(view);
}

function destroy() {
    this.trigger('before:destroy');
    this.trigger('destroy');

    this.remove();
    $(this.el).empty();

    this.trigger('after:destroy');
}

export default View;