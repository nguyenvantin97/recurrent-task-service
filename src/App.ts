import fastify, { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import fastifyStatic from 'fastify-static';
import mongoose from 'mongoose';

import APIRoutes from '@routes/Routes';

class App {
  public fastifyApp: fastify.FastifyInstance;
  public apiRoutes: APIRoutes;
  public swaggerSpec: swaggerJSDoc;

  constructor() {
    this.fastifyApp = fastify({
      logger: { prettyPrint: true }
    });
    this.apiRoutes = new APIRoutes(this.fastifyApp);

    this.connectToDatabase();
    this.configPreRouteMiddlewares();
    this.setUpSwagger();
    this.setUpAPIRoutes();
    this.configPostRouteMiddlewares();
  }

  private configPreRouteMiddlewares(): void {

  }

  private configPostRouteMiddlewares(): void {

  }

  private async connectToDatabase(): Promise<any> {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/rtms';

    try {
      this.fastifyApp.log.info('Connecting to MongoDB...');
      await mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
      this.fastifyApp.log.info('MongoDB connected.');
    } catch (err) {
      this.fastifyApp.log.error('Could not connect to MongoDB.', err);
    }
  }

  private setUpSwagger() {
    const swaggerDefinition = {
      info: {
        title: 'Recurrent Task Microservice - API Documentation',
        version: '0.0.1',
        description: 'This is the API documentation for the microservice managing recurrent tasks.'
      }
    };

    const swaggerDocOptions = {
      swaggerDefinition,
      apis: ['**/*.yml', '**/*.ts']
    };

    this.swaggerSpec = swaggerJSDoc(swaggerDocOptions);

    this.fastifyApp.get('/swagger.json', (request, reply: FastifyReply<ServerResponse>) => {
      reply.send(this.swaggerSpec); 
    });
  }

  private setUpAPIRoutes(): void {
    this.fastifyApp.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'public'),
      redirect: true
    });

    this.apiRoutes.initialize();
  }
}

export default new App().fastifyApp;
