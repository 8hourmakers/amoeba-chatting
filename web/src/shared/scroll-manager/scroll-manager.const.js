import keyMaker from '../../utils/key-maker';

const scrollManagerConstants = {
    actions: keyMaker('app.shared.scrollManager.action', {
        SCROLL_BOTTOM: 'SCROLL_BOTTOM',
        SCROLL_TO: 'SCROLL_TO',
    }),
};

export default scrollManagerConstants;
