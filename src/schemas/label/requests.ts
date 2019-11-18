import _ from 'lodash';
import LabelSchemaModels from './models';

const CreateLabelRequestBody = _.cloneDeep(LabelSchemaModels.Label);

CreateLabelRequestBody.description = 'The request body when creating a new label';
CreateLabelRequestBody.required = ['name', 'color'];
delete CreateLabelRequestBody.properties._id;

const UpdateLabelRequestBody = _.cloneDeep(CreateLabelRequestBody);

UpdateLabelRequestBody.description = 'The request body when updating an existing label';
delete UpdateLabelRequestBody.required;

const SearchLabelRequestBody = {
  description: 'The request body to search for labels',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Major'
    },
    color: {
      type: 'string',
      example: '#ff0000'
    }
  }
};

export default {
  CreateLabelRequestBody,
  UpdateLabelRequestBody,
  SearchLabelRequestBody
};
