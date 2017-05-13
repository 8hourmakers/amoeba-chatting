import template from './chat-room.component.html';
import './chat-room.component.less';

class ChatRoomController {
    constructor($scope, $state, authService, Socket, Chatting, scrollManagerConstants) {
        this.$scope = $scope;
        this.$state = $state;
        this.authService = authService;
        this.socket = new Socket();
        this.Chatting = Chatting;
        this.scrollManagerConstants = scrollManagerConstants;
    }

    $onInit() {
        this.topicId = this.$state.params.topicId;
        this.previousState = this.$state.params.previousState;

        this.chatting = new this.Chatting(this.topicId);

        this.isInitialized = false;
        this.isChattingAvaliable = false;
        this.isErrorCaught = false;
        this.chats = this.chatting.chats;

        this.content = '';

        this.chatting
            .initChats()
            .then(() => {
                this.isInitialized = true;
                this.$scope.$broadcast(this.scrollManagerConstants.actions.SCROLL_BOTTOM);
            })
            .catch(() => { this.isErrorCaught = true; });

        this.socket
            .listen('new_chat_receive', (newChat) => {
                this.chatting.addNewChat(newChat);
                this.$scope.$apply();
                this.$scope.$broadcast(this.scrollManagerConstants.actions.SCROLL_BOTTOM);
            })
            .connect(`ws://8hourmakers.com/amoeba_chatting/ws/chat/${this.topicId}/`, () => {
                this.isChattingAvaliable = true;
            });
    }

    $onDestroy() {
        this.socket.close();
    }

    back() {
        this.$state.go(this.previousState.name, this.previousState.params);
    }

    isAvaliable() {
        return this.isChattingAvaliable && this.content.length > 0;
    }

    loadMoreChats() {
        if (!this.isInitialized ||
            this.chatting.isRequesting() ||
            this.chatting.isAllChatLoaded()) {
            return;
        }

        const lastChatId = this.chatting.getLastChatId();

        this.chatting
            .getChats(lastChatId)
            .then(() => {
                const prevLastChatIndex = this.chatting.getIndex(lastChatId);

                this.$scope.$broadcast(this.scrollManagerConstants.actions.SCROLL_TO, {
                    chatIndex: prevLastChatIndex,
                });
            })
            .catch(() => { this.isErrorCaught = true; });
    }

    isSenderSame(chat) {
        const senderId = this.authService.getUser().id;

        return this.chatting.isSenderSame(chat.id, senderId);
    }

    onInput($event) {
        if ($event.keyCode === 13 && this.isAvaliable()) {
            this.sendChat(this.content);
        }
    }

    sendChat(content) {
        const senderId = this.authService.getUser().id;

        this.socket
            .send('new_chat_send', { user_id: senderId, content });

        this.content = '';
    }
}

ChatRoomController.$inject = [
    '$scope',
    '$state',
    'authService',
    'Socket',
    'Chatting',
    'scrollManagerConstants',
];

const ChatRoomComponent = {
    template,
    controller: ChatRoomController,
};

export default ChatRoomComponent;
