/* eslint no-param-reassign:0 */
import template from './file-selector.directive.html';
import './file-selector.directive.less';

function FileSelectorDirective() {
    const config = {
        restrict: 'E',
        template,
        scope: {
            onFileSelect: '&',
        },
    };

    config.link = function link(scope, elem) {
        const $input = elem[0].querySelector('input');

        scope.label = '파일 선택';

        const onChange = (event) => {
            const file = event.target.files[0];

            scope.label = file.name;
            scope.onFileSelect({ file });
            scope.$apply();
        };

        $input.addEventListener('change', onChange);
    };

    return config;
}

export default FileSelectorDirective;
