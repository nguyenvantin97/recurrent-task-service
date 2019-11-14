import CommonSchemaModels from '@schemas/common/models';

const RecurrentTaskStatus = {
  description: 'The current status of a task',
  type: 'string',
  enum: [
    'pending',
    'doing',
    'finished',
    'overdue',
    'cancelled'
  ]
};

const RecurrentTask = {
  description: 'A recurrent task',
  type: 'object',
  required: [
    '_id',
    'name',
    'description'
  ],
  properties: {
    _id: {
      type: 'string',
      example: '507f191e810c19729de860ea'
    },
    name: {
      type: 'string',
      example: 'Checking drugs\' quality every day'
    },
    description: {
      type: 'string',
      example: 'Every day, employees need to make sure the quality of all drug products are good.'
    },
    doers: {
      type: 'array',
      items: CommonSchemaModels.SimpleUser
    },
    reviewer: CommonSchemaModels.SimpleUser,
    creator: CommonSchemaModels.SimpleUser,
    labelIds: {
      type: 'array',
      items: {
        type: 'string',
        example: '507f1f77bcf86cd799439011'
      }
    },
    start: {
      type: 'string',
      format: 'date-time',
      description: 'Date in UTC when the task starts'
    },
    finish: {
      type: 'string',
      format: 'date-time',
      description: 'Date in UTC when the task is finished'
    },
    due: {
      type: 'string',
      format: 'date-time',
      description: 'Date in UTC when the task is due'
    },
    status: RecurrentTaskStatus
  }
};

export default {
  RecurrentTaskStatus,
  RecurrentTask
};
