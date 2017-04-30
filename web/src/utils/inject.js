/* eslint no-param-reassign:0 */
import angular from 'angular';

const inject = {
    get(sourceClass, thisObj) {
        const injections = sourceClass.injections;

        angular.extend(thisObj, injections);
    },

    put(sourceClass, injections) {
        sourceClass.injections = injections;
    },
};

export default inject;
