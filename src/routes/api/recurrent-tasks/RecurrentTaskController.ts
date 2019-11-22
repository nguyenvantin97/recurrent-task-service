import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
import RecurrentTaskSchemaModels from '@schemas/recurrent-task/models';
import RecurrentTaskSchemaRequests from '@schemas/recurrent-task/requests';
import CommonSchemaRequests from '@schemas/common/requests';
import CommonSchemaResponses from '@schemas/common/responses';
import { TAGS } from '@schemas/common/tags';
import RecurrentTaskModel from '@models/RecurrentTask';
import NotFound404 from '@models/responses/NotFound404';
import { searchRecurrentTasks } from '@services/recurrent-tasks/RecurrentTaskService';
import { DEFAULT_USER } from '@constants/common';

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
        url: '/:recurrentTaskId',
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
        url: '/:recurrentTaskId',
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
        url: '/:recurrentTaskId',
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
        method: 'POST',
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

  private async createRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const newRecurrentTask = new RecurrentTaskModel(request.body);

    await newRecurrentTask.save();

    reply.send(newRecurrentTask);
  }

  private async getRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findById(request.params.recurrentTaskId);

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    reply.send(recurrentTask);
  }

  private async updateRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findOneAndUpdate({ _id: request.params.recurrentTaskId }, request.body, { new: true });

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    reply.send(recurrentTask);
  }

  private async deleteRecurrentTask(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const recurrentTask = await RecurrentTaskModel.findById(request.params.recurrentTaskId);

    if (!recurrentTask) {
      return reply.status(404).send(NotFound404.generate(`Recurrent task with the requested ID '${request.params.recurrentTaskId}' was not found`));
    }

    await recurrentTask.remove();

    reply.send(recurrentTask);
  }

  private async searchRecurrentTasks(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const { fields, offset, limit, sort } = request.query;

    const searchRequest = { fields, offset, limit, sort, body: request.body };

    if (fields) searchRequest.fields = fields.split(',');
    if (offset) searchRequest.offset = Number(offset);
    if (limit) searchRequest.limit = Number(limit);
    if (sort) searchRequest.sort = sort.split(',');

    const recurrentTasks = await searchRecurrentTasks(searchRequest);

    reply.send(recurrentTasks);
  }

  private getRecurrentTasksByUserId(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }
}

export default new RecurrentTaskController().initialize;
