import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import toNumber from 'lodash/toNumber';
import apiUrl from '../../constants/api-url';
import inject from '../../utils/inject';

class Chatting {
    constructor(topicId) {
        inject.get(Chatting, this);

        this.isLoading = false;
        this.allChatLoaded = false;
        this.chats = [];
        this.topicId = topicId;
    }

    sortChats() {
        this.chats.sort((chat1, chat2) => {
            const t1 = new Date(chat1.timestamp).getTime();
            const t2 = new Date(chat2.timestamp).getTime();

            return t1 - t2;
        });
    }

    initChats() {
        this.isLoading = true;

        return this.httpService
            .get(apiUrl.chats({ topicId: this.topicId }))
            .then((res) => {
                this.allChatLoaded = res.data.length < 20;
                this.isLoading = false;

                res.data.forEach(chat => this.chats.push(chat));

                this.sortChats();
            });
    }

    getChats(fromId) {
        this.isLoading = true;

        return this.httpService
            .get(apiUrl.chats({ topicId: this.topicId }), { params: { from_id: fromId } })
            .then((res) => {
                this.allChatLoaded = res.data.length < 20;
                this.isLoading = false;

                res.data.forEach(chat => this.chats.unshift(chat));

                this.sortChats();
            });
    }

    addNewChat(newChat) {
        this.chats.push(newChat);
        this.sortChats();
    }

    getLastChatId() {
        return this.chats[0].id;
    }

    getIndex(chatId) {
        return findIndex(this.chats, chat => chat.id === chatId);
    }

    isAllChatLoaded() {
        return this.allChatLoaded;
    }

    isRequesting() {
        return this.isLoading;
    }

    isSenderSame(chatId, senderId) {
        const targetChat = find(this.chats, chat => toNumber(chat.id) === toNumber(chatId));

        if (!targetChat) {
            return false;
        }

        return toNumber(targetChat.user.id) === toNumber(senderId);
    }
}

export default ['httpService', (httpService, chatOrderFilter) => {
    inject.put(Chatting, { httpService, chatOrderFilter });
    return Chatting;
}];
