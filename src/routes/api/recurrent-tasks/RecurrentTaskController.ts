import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
import RecurrentTaskSchemaModels from '@schemas/recurrent-task/models';
import RecurrentTaskSchemaRequests from '@schemas/recurrent-task/requests';
import CommonSchemaRequests from '@schemas/common/requests';
import CommonSchemaResponses from '@schemas/common/responses';
import { TAGS } from '@schemas/common/tags';

class RecurrentTaskController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      {
        method: 'POST',
        url: '/',
        handler: this.createRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Creates a new recurrent task',
          body: RecurrentTaskSchemaRequests.CreateRecurrentTaskRequestBody,
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            400: CommonSchemaResponses.BadRequest400Response
          }
        }
      },
      {
        method: 'GET',
        url: '/:recurrentTaskID',
        handler: this.getRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Gets detailed information about a specific recurrent task',
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'PUT',
        url: '/:recurrentTaskID',
        handler: this.updateRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Updates an existing recurrent task',
          body: RecurrentTaskSchemaRequests.UpdateRecurrentTaskRequestBody,
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            304: CommonSchemaResponses.NotModified304Response,
            400: CommonSchemaResponses.BadRequest400Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'DELETE',
        url: '/:recurrentTaskID',
        handler: this.deleteRecurrentTask,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Deletes an existing recurrent task',
          response: {
            200: RecurrentTaskSchemaModels.RecurrentTask,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'GET',
        url: '/search',
        handler: this.searchRecurrentTasks,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Searches for recurrent tasks',
          querystring: CommonSchemaRequests.PaginationQueryParams,
          body: RecurrentTaskSchemaRequests.SearchRecurrentTaskRequestBody,
          response: {
            200: {
              description: 'A list of recurrent tasks',
              type: 'array',
              items: RecurrentTaskSchemaModels.RecurrentTask
            },
            400: CommonSchemaResponses.BadRequest400Response,
            401: CommonSchemaResponses.Unauthorized401Response
          }
        }
      },
      {
        method: 'GET',
        url: '/',
        handler: this.getRecurrentTasksByUserId,
        schema: {
          tags: [TAGS.RECURRENT_TASKS],
          description: 'Gets all recurrent tasks of a user',
          querystring: RecurrentTaskSchemaRequests.GetRecurrentTasksByUserIdQueryParams,
          response: {
            200: {
              description: 'A list of recurrent tasks',
              type: 'array',
              items: RecurrentTaskSchemaModels.RecurrentTask
            },
            400: CommonSchemaResponses.BadRequest400Response,
            401: CommonSchemaResponses.Unauthorized401Response
          }
        }
      }
    ];
  }

  private createRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });    
  }

  private getRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private updateRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private deleteRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private searchRecurrentTasks(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }

  private getRecurrentTasksByUserId(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }
}

export default new RecurrentTaskController().initialize;