import { Server, Socket } from 'socket.io';

class Sockets {
  private io: Server;
  constructor(io: Server) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Cliente conectado');
    });
  }
}

export default Sockets;
