import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
import LogSchemaModels from '@schemas/log/models';
import LogSchemaRequests from '@schemas/log/requests';
import { TAGS } from '@schemas/common/tags';
import BadRequest400 from '@models/responses/BadRequest400';

class HelloController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      {
        method: 'GET',
        url: '/recurrent-tasks',
        handler: this.getTaskLogs,
        schema: {
          tags: [TAGS.LOGS],
          querystring: LogSchemaRequests.GetTaskLogRequest,
          response: {
            200: LogSchemaModels.Log
          }
        }
      },
      {
        method: 'GET',
        url: '/labels',
        handler: this.getLabelLogs,
        schema: {
          tags: [TAGS.LOGS],
          querystring: LogSchemaRequests.GetLabelLogRequest,
          response: {
            200: LogSchemaModels.Log
          }
        }
      }
    ];
  }

  private getTaskLogs(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.status(400).send(BadRequest400.generate('Missing fields'));
  }

  private getLabelLogs(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.status(400).send(BadRequest400.generate('Missing fields'));
  }
}

export default new HelloController().initialize;
