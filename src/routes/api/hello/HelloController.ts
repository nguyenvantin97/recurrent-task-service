import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import BaseController from '@routes/BaseController';

class HelloController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      {
        method: 'GET',
        url: '/',
        handler: this.sayHello
      }
    ];
  }

  private sayHello(request: FastifyRequest, reply: FastifyReply<any>): void {
    reply.send({ message: 'Hello World!' });
  }
}

export default new HelloController().initialize;