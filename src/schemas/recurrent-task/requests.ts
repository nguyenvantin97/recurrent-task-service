import _ from 'lodash';
import RecurrentTaskSchemaModels from './models';
import CommonSchemaModels from '@schemas/common/models';


const CreateRecurrentTaskRequestBody = _.cloneDeep(RecurrentTaskSchemaModels.RecurrentTask);

CreateRecurrentTaskRequestBody.description = 'The request body when creating a new recurrent task';
CreateRecurrentTaskRequestBody.required = ['name', 'description'];
delete CreateRecurrentTaskRequestBody.properties._id;

const UpdateRecurrentTaskRequestBody = _.cloneDeep(CreateRecurrentTaskRequestBody);

UpdateRecurrentTaskRequestBody.description = 'The request body when updating an existing recurrent task';
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
    departments: CommonSchemaModels.ListOfDepartmentNames,
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
