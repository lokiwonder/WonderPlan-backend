import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4001, { namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  afterInit(server: any) {
    this.logger.log('init server');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log('Client disconnected: ' + client.id);
  }

  // @WebSocketServer()
  // server;

  // wsClients = [];

  // @SubscribeMessage('welcome')
  // connectMember(@MessageBody() data: string, @ConnectedSocket() client) {
  //   const [nickname, room] = data;
  //   console.log(nickname, room);
  //   const welcomeMessage = `${nickname}님이 입장했습니다.`;
  //   this.server.emit('welcome', room, welcomeMessage);
  //   this.wsClients.push(client);
  // }

  // private broadcast(event, client, message: any) {
  //   for (const c of this.wsClients) {
  //     if (client.id === c.id) {
  //       continue;
  //     }
  //     c.emit(event, message);
  //   }
  // }

  // @SubscribeMessage('send')
  // sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
  //   const [room, nickname, message] = data;
  //   console.log(`${client.id} : ${data}`);
  //   this.broadcast(event, client, [room, message]);
  // }

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}
