import angular from 'angular';
import FileSelectDirective from './file-selector.directive';

const FileSelectorModule = angular
    .module('app.shared.fileSelector', [])
    .directive('appFileSelector', FileSelectDirective)
    .name;

export default FileSelectorModule;
