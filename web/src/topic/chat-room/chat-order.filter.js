import sortBy from 'lodash/sortBy';

function chatOrderFilter(chats) {
    return sortBy(chats, (chat) => {
        const timestamp = new Date(chat.timestamp).getTime();

        return -1 * timestamp;
    });
}

export default () => chatOrderFilter;
