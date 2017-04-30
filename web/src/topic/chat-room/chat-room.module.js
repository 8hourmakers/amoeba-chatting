import angular from 'angular';
import UIRouter from 'angular-ui-router';
import ChatRoomComponent from './chat-room.component';
import Chatting from './chatting';
import ChatOrderFilter from './chat-order.filter';

const ChatRoomModule = angular
    .module('app.topic.chatRoom', [
        UIRouter,
    ])
    .component('appChatRoom', ChatRoomComponent)
    .factory('Chatting', Chatting)
    .filter('chatOrderFilter', ChatOrderFilter)
    .name;

export default ChatRoomModule;
