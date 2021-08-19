import express, { Application } from 'express';
import authRoutes from '../routes/auth';
import cors from 'cors';

import http from 'http';
import socketIO from 'socket.io';
import Sockets from './sockets';
import dbConnection from '../database/config';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    auth: '/api/auth',
  };

  private server: http.Server;
  private io: socketIO.Server;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.server = http.createServer(this.app);

    //Base de datos
    dbConnection();

    this.io = new socketIO.Server();

    //Metodos iniciales
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura del body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static('public'));
  }

  routes() {
    //Definir rutas
    this.app.use(this.apiPaths.auth, authRoutes);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto: ' + this.port);
    });

    this.io.listen(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.configureSockets();
  }

  configureSockets() {
    new Sockets(this.io);
  }
}

export default Server;
