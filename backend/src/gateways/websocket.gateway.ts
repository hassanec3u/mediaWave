import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {CreateMessageDto} from "../message/dto/createMessageDto";

@WebSocketGateway()
export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    // Envoi du message à tous les clients connectés
    sendMessageToClients(createMessageDto: CreateMessageDto): void {
        this.server.emit('message', createMessageDto);
    }
}
