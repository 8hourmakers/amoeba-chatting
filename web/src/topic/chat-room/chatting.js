import find from 'lodash/find';
import toNumber from 'lodash/toNumber';
import apiUrl from '../../constants/api-url';
import inject from '../../utils/inject';

class Chatting {
    constructor(topicId) {
        inject.get(Chatting, this);

        this.allChatLoaded = false;
        this.chats = [];
        this.topicId = topicId;
    }

    initChats() {
        return this.httpService
            .get(apiUrl.chats(this.topicId))
            .then((res) => {
                this.allChatLoaded = res.data.length < 30;

                res.data.forEach(chat => this.chats.push(chat));
            });
    }

    getChats(fromId) {
        return this.httpService
            .get(apiUrl.chats(this.topicId), { params: { from_id: fromId } })
            .then((res) => {
                this.allChatLoaded = res.data.length < 30;

                res.data.forEach(chat => this.chats.unshift(chat));
            });
    }

    addNewChat(newChat) {
        this.chats.push(newChat);
    }

    getLastChatId() {
        return this.chats[0].id;
    }

    isAllChatLoaded() {
        return this.allChatLoaded;
    }

    isSenderSame(chatId, senderId) {
        const targetChat = find(this.chats, chat => toNumber(chat.id) === toNumber(chatId));

        if (!targetChat) {
            return false;
        }

        return toNumber(targetChat.sender.id) === toNumber(senderId);
    }
}

export default ['httpService', (httpService) => {
    inject.put(Chatting, { httpService });
    return Chatting;
}];
