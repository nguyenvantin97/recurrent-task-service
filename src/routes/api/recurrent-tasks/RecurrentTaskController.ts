import { RouteOptions, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import BaseController from '@routes/BaseController';

class RecurrentTaskController extends BaseController {
  public getRoutes(): RouteOptions[] {
    return [
      /**
       * @swagger
       * /api/recurrent-tasks:
       *   post:
       *     tags:
       *     - "recurrent-tasks"
       *     description: "Creates a new recurrent task"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     parameters:
       *     - in: "body"
       *       name: "body"
       *       description: "The information about the new recurrent task"
       *       required: true
       *       schema:
       *         $ref: "#/definitions/CreateRecurrentTaskRequestBody"
       *     responses:
       *       200:
       *         description: "Successfully created a new recurrent task"
       *         schema:
       *           $ref: "#/definitions/RecurrentTask"
       *       400:
       *         description: "Field(s) missing or invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       */
      {
        method: 'POST',
        url: '/',
        handler: this.createRecurrentTask
      },
      /**
       * @swagger
       * /api/recurrent-tasks/:recurrentTaskID:
       *   get:
       *     tags:
       *     - "recurrent-tasks"
       *     description: "Gets detailed information about a specific recurrent task"
       *     produces:
       *     - "application/json"
       *     responses:
       *       200:
       *         schema:
       *           $ref: "#/definitions/RecurrentTask"
       *       403:
       *         description: "Cannot get recurrent task information due to insufficient permission"
       *         schema:
       *           $ref: "#/definitions/ForbiddenAccess403Response"
       *       404:
       *         description: "Recurrent task was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'GET',
        url: '/:recurrentTaskID',
        handler: this.getRecurrentTask
      },
      /**
       * @swagger
       * /api/recurrent-tasks/:recurrentTaskID:
       *   put:
       *     tags:
       *     - "recurrent-tasks"
       *     description: "Updates an existing recurrent task"
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
       *         $ref: "#/definitions/UpdateRecurrentTaskRequestBody"
       *     responses:
       *       200:
       *         description: "Successfully updated recurrent task"
       *         schema:
       *           $ref: "#/definitions/RecurrentTask"
       *       304:
       *         description: "The recurrent task was not modified"
       *         schema:
       *           $ref: "#/definitions/NotModified304Response"
       *       400:
       *         description: "Field(s) invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       *       404:
       *         description: "Recurrent task was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'PUT',
        url: '/:recurrentTaskID',
        handler: this.updateRecurrentTask
      },
      /**
       * @swagger
       * /api/recurrent-tasks/:recurrentTaskID:
       *   delete:
       *     tags:
       *     - "recurrent-tasks"
       *     description: "Deletes an existing recurrent task"
       *     consumes:
       *     - "application/json"
       *     produces:
       *     - "application/json"
       *     responses:
       *       200:
       *         description: "Successfully deleted recurrent task"
       *       404:
       *         description: "Recurrent task was not found"
       *         schema:
       *           $ref: "#/definitions/ResourceNotFound404Response"
       */
      {
        method: 'DELETE',
        url: '/:recurrentTaskID',
        handler: this.deleteRecurrentTask
      },
      /**
       * @swagger
       * /api/recurrent-tasks/search:
       *   get:
       *     tags:
       *     - "recurrent-tasks"
       *     description: "Search for recurrent tasks"
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
       *         $ref: "#/definitions/SearchRecurrentTaskRequestBody"
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
       *         description: "Successfully updated recurrent task"
       *         schema:
       *           type: "array"
       *           items:
       *             $ref: "#/definitions/RecurrentTask"
       *       400:
       *         description: "Field(s) invalid"
       *         schema:
       *           $ref: "#/definitions/BadRequest400Response"
       */
      {
        method: 'GET',
        url: '/search',
        handler: this.searchRecurrentTasks
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
}

export default new RecurrentTaskController().initialize;