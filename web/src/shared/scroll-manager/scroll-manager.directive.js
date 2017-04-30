function ScrollManagerDirective($timeout) {
    const config = {
        restrict: 'A',
        scope: {
            scrollThreshold: '<?',
            onInfiniteScroll: '&',
        },
    };

    config.link = function link(scope, elem) {
        const rawElem = elem[0];

        scope.scrollThreshold = scope.scrollThreshold || 50;

        // 가장 아래로 스크롤 되도록 초기화한다.
        $timeout(() => {
            rawElem.scrollTop = rawElem.scrollHeight;
        });

        elem.bind('scroll', () => {
            if (rawElem.scrollTop <= scope.scrollThreshold) {
                const sh = rawElem.scrollHeight;
                scope.$apply(scope.onInfiniteScroll());
                rawElem.scrollTop = rawElem.scrollHeight - sh;
            }
        });
    };
}

ScrollManagerDirective.$inject = [
    '$timeout',
];

export default ScrollManagerDirective;
