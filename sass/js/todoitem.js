export default class ToDoItem {
    constructor() {
        this._id = null;
        this._item = null;
    }

    getId() {
        return this._id;
    }

    setId() {
        this._id
    }

    getItem() {
        return this._item;
    }

    setItem(item) {
        this.item = item;
    }
}
