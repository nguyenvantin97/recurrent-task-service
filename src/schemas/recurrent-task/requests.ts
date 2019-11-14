import RecurrentTaskSchemaModels from './models';
import CommonSchemaModels from '@schemas/common/models';

const CreateRecurrentTaskRequestBody = {
  ...RecurrentTaskSchemaModels.RecurrentTask,
  description: 'The request body when creating a new recurrent task',
  required: [
    'name',
    'description'
  ]
};

delete CreateRecurrentTaskRequestBody.properties._id;

const UpdateRecurrentTaskRequestBody = {
  ...CreateRecurrentTaskRequestBody,
  description: 'The request body when updating an existing recurrent task',
};

delete UpdateRecurrentTaskRequestBody.required;

const SearchRecurrentTaskRequestBody = {
  description: 'The request body to search for recurrent tasks',
  type: 'object',
  properties: {
    query: {
      type: 'string',
      example: 'drugs'
    },
    creators: CommonSchemaModels.ListOfUserEmails,
    doers: CommonSchemaModels.ListOfUserEmails,
    reviewers: CommonSchemaModels.ListOfUserEmails,
    status: {
      type: 'array',
      items: RecurrentTaskSchemaModels.RecurrentTaskStatus
    }
  }
};

const GetRecurrentTasksByUserIdQueryParams = {
  type: 'object',
  required: [
    'userId'
  ],
  properties: {
    userId: {
      type: 'string',
      example: '73936b96-03c1-4544-a858-a39deb469576'
    },
  }
};

export default {
  CreateRecurrentTaskRequestBody,
  UpdateRecurrentTaskRequestBody,
  SearchRecurrentTaskRequestBody,
  GetRecurrentTasksByUserIdQueryParams
};
