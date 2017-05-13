import template from './header.component.html';
import './header.component.less';

const HeaderComponent = {
    template,
    transclude: {
        left: '?appHeaderLeft',
        right: '?appHeaderRight',
    },
};

export default HeaderComponent;
