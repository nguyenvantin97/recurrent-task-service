import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';
import LabelModel from '@models/Label';

class LabelController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      /**
       * @swagger
       * /api/labels:
       *   post:
       *     tags:
       *     - "labels"
       *     description: "Creates a new label"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     parameters:
       *     - in: "body"
       *       name: "body"
       *       description: "The information about the new label"
       *       required: true
       *       schema:
       *         $ref: "#/definitions/CreateLabelRequestBody"
       *     responses:
       *       200:
       *         description: "Successfully created a new label"
       *         schema:
       *           $ref: "#/definitions/Label"
       *       400:
       *         description: "Field(s) missing or invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       */
      {
        method: 'POST',
        url: '/',
        handler: this.createLabel
      },
      /**
       * @swagger
       * /api/labels/:labelID:
       *   get:
       *     tags:
       *     - "labels"
       *     description: "Gets detailed information about a specific label"
       *     produces:
       *     - "application/json"
       *     responses:
       *       200:
       *         schema:
       *           $ref: "#/definitions/Label"
       *       403:
       *         description: "Cannot get label information due to insufficient permission"
       *         schema:
       *           $ref: "#/definitions/ForbiddenAccess403Response"
       *       404:
       *         description: "Label was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'GET',
        url: '/:labelID',
        handler: this.getLabel
      },
      /**
       * @swagger
       * /api/labels/:labelID:
       *   put:
       *     tags:
       *     - "labels"
       *     description: "Updates an existing label"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     parameters:
       *     - in: "body"
       *       name: "body"
       *       description: "The fields need to be updated"
       *       required: true
       *       schema:
       *         $ref: "#/definitions/UpdateLabelRequestBody"
       *     responses:
       *       200:
       *         description: "Successfully updated label"
       *         schema:
       *           $ref: "#/definitions/Label"
       *       304:
       *         description: "The label was not modified"
       *         schema:
       *           $ref: "#/definitions/NotModified304Response"
       *       400:
       *         description: "Field(s) invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       *       404:
       *         description: "Label was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'PUT',
        url: '/:labelID',
        handler: this.updateLabel
      },
      /**
       * @swagger
       * /api/labels/:labelID:
       *   delete:
       *     tags:
       *     - "labels"
       *     description: "Deletes an existing label"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     responses:
       *       200:
       *         description: "Successfully deleted label"
       *       404:
       *         description: "Label was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'DELETE',
        url: '/:labelID',
        handler: this.deleteLabel
      },
      /**
       * @swagger
       * /api/labels/search:
       *   get:
       *     tags:
       *     - "labels"
       *     description: "Search for labels"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     parameters:
       *     - in: "body"
       *       name: "body"
       *       description: "The fields to base the search upon"
       *       required: true
       *       schema:
       *         $ref: "#/definitions/SearchLabelRequestBody"
       *     - in: "query"
       *       name: "offset"
       *       type: "integer"
       *       default: 0
       *       minimum: 0
       *     - in: "query"
       *       name: "limit"
       *       type: "integer"
       *       default: 40
       *       minimum: 0
       *     responses:
       *       200:
       *         description: "Successfully updated label"
       *         schema:
       *           type: "array"
       *           items:
       *             $ref: "#/definitions/Label"
       *       400:
       *         description: "Field(s) invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       */
      {
        method: 'GET',
        url: '/search',
        handler: this.searchLabels
      }
    ];
  }

  private async createLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const { name, color } = request.body;

    if (!name || !color) {
      return reply.status(400).send({
        code: 400,
        error: 'Bad Request',
        message: 'Either the \'name\' field or the \'color\' field is missing'
      });
    }

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

    if (!label) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Label with the requested ID was not found'
      });
    }

    reply.send({
      id: label._id,
      name: label.name,
      color: label.color
    });
  }

  private async updateLabel(request: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<any> {
    const label = await LabelModel.findById(request.params.labelID);

    if (!label) {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Label with the requested ID was not found'
      });
    }

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