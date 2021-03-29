const Region = function(regionName, selector) {
    this.regionName = regionName;
    this.selector = selector;
    
    this.view = null;
    this.show = function(view) {
        if (this.view) {
            this.view.destroy();
        }
        this.view = view;
        this.view.render({el: selector});
    }
}

export default Region;