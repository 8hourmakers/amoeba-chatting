import angular from 'angular';

function keyMaker(namespace, obj) {
    const composed = {};

    angular.forEach(obj, (value, key) => {
        composed[key] = `${namespace}:${key}`;
    });

    return composed;
}

export default keyMaker;
