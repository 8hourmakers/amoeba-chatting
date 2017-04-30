class StorageService {
    constructor($window) {
        this.storage = $window.localStorage;
    }

    isItemExists(key) {
        const item = this.getItem(key);

        return !!item;
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    removeItemIfExists(key) {
        this.storage.removeItem(key);
    }

    setItem(key, obj) {
        const stringifiedObj = JSON.stringify(obj);

        this.storage.setItem(key, stringifiedObj);
    }
}

StorageService.$inject = [
    '$window',
];

export default StorageService;
