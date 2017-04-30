import sortBy from 'lodash/sortBy';

function chatOrderFilter(chats) {
    return sortBy(chats, (chat) => {
        const timestamp = new Date(chat.register_timestamp).getTime();

        return -timestamp;
    });
}

export default () => chatOrderFilter;
