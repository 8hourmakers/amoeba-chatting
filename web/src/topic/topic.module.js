import angular from 'angular';
import UIRouter from 'angular-ui-router';
import ChatRoomModule from './chat-room/chat-room.module';
import FavoriteModule from './favorite/favorite.module';
import TopicHomeModule from './topic-home/topic-home.module';
import topicRoutingConfig from './topic-routing.config';

const TopicModule = angular
    .module('app.topic', [
        UIRouter,
        ChatRoomModule,
        FavoriteModule,
        TopicHomeModule,
    ])
    .config(topicRoutingConfig)
    .name;

export default TopicModule;
