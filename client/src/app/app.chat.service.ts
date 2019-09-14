import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message: any) {
        this.socket.emit('client-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('server-message', (message: any) => {
                observer.next(message);
            });
        });
    }
}