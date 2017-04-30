import template from './chat-room.component.html';
import './chat-room.component.less';

class ChatRoomController {
    constructor($state, Socket, Chatting) {
        this.$state = $state;
        this.socket = new Socket();
        this.topicId = $state.params.topicId;
        this.chatting = new Chatting(this.topicId);
    }

    $onInit() {
        this.isInitialized = false;
        this.isChattingAvaliable = false;
        this.isErrorCaught = false;
        this.chats = this.chatting.chats;

        this.chatting
            .initChats()
            .then(() => { this.isInitialized = true; })
            .catch(() => { this.isErrorCaught = true; });

        this.socket
            .listen('new_chat_receive', (newChat) => {
                this.chatting.addNewChat(newChat);
            })
            .connect(`ws://localhost/amoeba_chatting/ws/chat/${this.topicId}`, () => {
                this.isChattingAvaliable = true;
            });
    }

    $onDestroy() {
        this.socket.close();
    }

    loadMoreChats() {
        if (!this.isInitialized || this.chatting.isAllChatLoaded()) {
            return;
        }

        this.chatting
            .getChats(this.chatting.getLastChatId())
            .catch(() => { this.isErrorCaught = true; });
    }

    sendChat(content) {
        this.socket
            .send('new_chat_send', { content });
    }
}

ChatRoomController.$inject = [
    '$state',
    'Socket',
    'Chatting',
];

const ChatRoomComponent = {
    template,
    controller: ChatRoomController,
};

export default ChatRoomComponent;
