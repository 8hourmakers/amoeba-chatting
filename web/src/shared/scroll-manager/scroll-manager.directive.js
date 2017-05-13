/* eslint no-param-reassign:0 */
function ScrollManagerDirective($timeout, scrollManagerConstants) {
    const config = {
        restrict: 'A',
        scope: {
            scrollThreshold: '<?',
            onInfiniteScroll: '&',
        },
    };

    config.link = function link(scope, elem) {
        const rawElem = elem[0];

        // 가장 아래로 스크롤 되도록 초기화한다.
        $timeout(() => {
            rawElem.scrollTop = rawElem.scrollHeight;
        });

        elem.bind('scroll', () => {
            if (rawElem.scrollTop <= scope.scrollThreshold) {
                // const sh = rawElem.scrollHeight;
                // scope.$apply(scope.onInfiniteScroll());
                // rawElem.scrollTop = rawElem.scrollHeight - sh;

                scope.onInfiniteScroll();
                scope.$apply();
            }
        });

        scope.$on(scrollManagerConstants.actions.SCROLL_TO, (e, data) => {
            const chatIndex = data.chatIndex;

            $timeout(() => {
                const $chat = document.querySelector(`.Chat[data-chat-index="${chatIndex}"]`);
                const containerRect = rawElem.getBoundingClientRect();
                const chatRect = $chat.getBoundingClientRect();

                const scrollTop = (chatRect.top - containerRect.top) - chatRect.height;

                rawElem.scrollTop = scrollTop;
            });
        });

        scope.$on(scrollManagerConstants.actions.SCROLL_BOTTOM, () => {
            $timeout(() => {
                rawElem.scrollTop = rawElem.scrollHeight;
            });
        });
    };

    return config;
}

ScrollManagerDirective.$inject = [
    '$timeout',
    'scrollManagerConstants',
];

export default ScrollManagerDirective;
