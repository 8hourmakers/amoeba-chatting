import angular from 'angular';

class Socket {
    constructor(socketConstants) {
        this.socketConstants = socketConstants;
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
        if (this._readReadyState() !== this.readyState.CONNECTING) {
            return;
        }

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            onConnected();
        };

        this.socket.onmessage = ({ event }) => {
            const action = event.action;
            const payload = event.payload;

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
        if (this._readReadyState() !== this.readyState.OPEN) {
            return;
        }

        this.socket.send(JSON.stringify({
            action,
            payload,
        }));
    }

    close() {
        if (this._readReadyState() !== this.readyState.OPEN) {
            return;
        }

        this.socket.close();
        this.socket = null;

        return this;
    }
}

export default () => Socket;
