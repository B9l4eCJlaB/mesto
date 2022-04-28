export default class Sction {
    constructor({data, renderer}, containerSelector) {
        this._renderItems = data;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
    }
    renderItems() {
        this._renderItems.forEach(item => {
            this._renderer(item);
        })
    }
    addItem(element) {
        this._containerSelector.prepend(element);
    }
}