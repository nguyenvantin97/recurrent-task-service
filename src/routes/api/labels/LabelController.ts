import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
import LabelModel from '@models/Label';
import LabelSchemaModels from '@schemas/label/models';
import LabelSchemaRequests from '@schemas/label/requests';
import CommonSchemaRequests from '@schemas/common/requests';
import CommonSchemaResponses from '@schemas/common/responses';
import { TAGS } from '@schemas/common/tags';

class LabelController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      {
        method: 'POST',
        url: '/',
        handler: this.createLabel,
        schema: {
          tags: [TAGS.LABELS],
          description: 'Creates a new label',
          body: LabelSchemaRequests.CreateLabelRequestBody,
          response: {
            200: LabelSchemaModels.Label,
            400: CommonSchemaResponses.BadRequest400Response
          }
        }
      },
      {
        method: 'GET',
        url: '/:labelID',
        handler: this.getLabel,
        schema: {
          tags: [TAGS.LABELS],
          description: 'Gets detailed information about a specific label',
          response: {
            200: LabelSchemaModels.Label,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'PUT',
        url: '/:labelID',
        handler: this.updateLabel,
        schema: {
          tags: [TAGS.LABELS],
          description: 'Updates an existing label',
          body: LabelSchemaRequests.UpdateLabelRequestBody,
          response: {
            200: LabelSchemaModels.Label,
            304: CommonSchemaResponses.NotModified304Response,
            400: CommonSchemaResponses.BadRequest400Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'DELETE',
        url: '/:labelID',
        handler: this.deleteLabel,
        schema: {
          tags: [TAGS.LABELS],
          description: 'Deletes an existing label',
          response: {
            200: LabelSchemaModels.Label,
            401: CommonSchemaResponses.Unauthorized401Response,
            403: CommonSchemaResponses.ForbiddenAccess403Response,
            404: CommonSchemaResponses.ResourceNotFound404Response
          }
        }
      },
      {
        method: 'GET',
        url: '/search',
        handler: this.searchLabels,
        schema: {
          tags: [TAGS.LABELS],
          description: 'Searches for labels',
          querystring: CommonSchemaRequests.PaginationQueryParams,
          body: LabelSchemaRequests.SearchLabelRequestBody,
          response: {
            200: {
              type: 'array',
              items: LabelSchemaModels.Label
            },
            400: CommonSchemaResponses.BadRequest400Response,
            401: CommonSchemaResponses.Unauthorized401Response
          }
        }
      }
    ];
  }

  private async createLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const { name, color } = request.body;

    const newLabel = new LabelModel({ name, color });

    await newLabel.save();

    reply.send({
      id: newLabel._id,
      name: newLabel.name,
      color: newLabel.color
    });
  }

  private async getLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const label = await LabelModel.findById(request.params.labelID);

    reply.send({
      id: label._id,
      name: label.name,
      color: label.color
    });
  }

  private async updateLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const label = await LabelModel.findById(request.params.labelID);

    const { name, color } = request.body;

    let isLabelUpdated = false;

    if (name && name !== label.name) {
      label.name = name;
      isLabelUpdated = true;
    }

    if (color && color !== label.color) {
      label.color = color;
      isLabelUpdated = true;
    }

    if (!isLabelUpdated) {
      return reply.status(304).send({
        statusCode: 304,
        message: 'The requested label was not modified'
      });
    }

    await label.save();

    reply.send({
      id: label._id,
      name: label.name,
      color: label.color
    });
  }

  private async deleteLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const label = await LabelModel.findById(request.params.labelID);

    if (!label) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Label with the requested ID was not found'
      });
    }

    await LabelModel.findOneAndDelete({ _id: request.params.labelID });

    reply.status(200).send();
  }

  private searchLabels(request: FastifyRequest, reply: FastifyReply<ServerResponse>): void {
    reply.send({ message: 'It has not been implemented yet.' });
  }
}

export default new LabelController().initialize;