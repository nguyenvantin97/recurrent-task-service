import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';

class HelloController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      /**
       * @swagger
       * /api/hello:
       *   get:
       *     tags:
       *       - "hello"
       *     description: Returns a "Hello World" message
       *     produces:
       *       - application/json
       *     responses:
       *       200:
       *         description: "\"Hello World\" message successfully sent"
       */
      {
        method: 'GET',
        url: '/',
        handler: this.sayHello
      }
    ];
  }

  private sayHello(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'Hello World!' });
  }
}

export default new HelloController().initialize;