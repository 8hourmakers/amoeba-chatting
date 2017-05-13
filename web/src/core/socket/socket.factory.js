import angular from 'angular';
import inject from '../../utils/inject';
import logger from '../../utils/logger';

class Socket {
    constructor() {
        inject.get(Socket, this);

        this.readyState = this.socketConstants.readyState;

        this.socket = null;
        this.listeners = {};
    }

    _readReadyState() {
        if (!this.socket) {
            return -1;
        }

        return this.socket.readyState;
    }

    connect(url, onConnected) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            onConnected();
            logger.log('socket open', url);
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            const action = data.action;
            const payload = data.payload;

            logger.log(data);

            if (angular.isFunction(this.listeners[action])) {
                this.listeners[action](payload);
            }
        };

        return this;
    }

    listen(action, callback) {
        this.listeners[action] = callback;
        return this;
    }

    send(action, payload) {
        this.socket.send(JSON.stringify({
            action,
            payload,
        }));
    }

    close() {
        this.socket.close();
        this.socket = null;
    }
}

export default ['socketConstants', (socketConstants) => {
    inject.put(Socket, { socketConstants });
    return Socket;
}];
