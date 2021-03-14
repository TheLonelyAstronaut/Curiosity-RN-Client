import { ON_CONNECT, ON_ERROR } from './events';

export class ConnectionProvider {
    private socket?: WebSocket;

    public connect = (address: string): void => {
        this.socket = new WebSocket(address);
    };

    public addHandler = (event: string, callback: (data: any) => void) => {
        if (event === ON_CONNECT && this.socket) {
            this.socket.onopen = callback;
        } else if (event === ON_ERROR && this.socket) {
            this.socket.onerror = callback;
        } else if (this.socket) {
            this.socket.onmessage = callback;
        }
    };

    public close = () => {
        this.socket?.close();
    };

    public emit = (command: string) => {
        this.socket?.send(command);
    };
}

export const socket = new ConnectionProvider();
