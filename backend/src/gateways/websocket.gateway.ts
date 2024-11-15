import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '../message/dto/createMessageDto';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connecté : ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client déconnecté : ${client.id}`);
    }

    // Méthode pour diffuser un message à tous les clients connectés
    sendMessageToClients(createMessageDto: CreateMessageDto): void {
        this.server.emit('message', createMessageDto);
        console.log('Message envoyé à tous les clients connectés');
        console.log(createMessageDto);
    }
}
