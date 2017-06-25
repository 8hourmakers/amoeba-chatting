import angular from 'angular';
import AuthModule from '../../account/auth/auth.module';
import StateModule from '../../core/state/state.module';
import SocketModule from '../../core/socket/socket.module';
import ScrollManagerModule from '../../shared/scroll-manager/scroll-manager.module';
import ChatRoomComponent from './chat-room.component';
import Chatting from './chatting';
import ChatOrderFilter from './chat-order.filter';

const ChatRoomModule = angular
    .module('app.topic.chatRoom', [
        AuthModule,
        StateModule,
        SocketModule,
        ScrollManagerModule,
    ])
    .component('appChatRoom', ChatRoomComponent)
    .factory('Chatting', Chatting)
    .filter('chatOrderFilter', ChatOrderFilter)
    .name;

export default ChatRoomModule;
