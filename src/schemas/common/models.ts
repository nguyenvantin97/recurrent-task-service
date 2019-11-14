const SimpleUser = {
  description: 'Brief information about a user',
  type: 'object',
  required: [
    'id',
    'name'
  ],
  properties: {
    id: {
      type: 'string',
      example: '73936b96-03c1-4544-a858-a39deb469576'
    },
    name: {
      type: 'string',
      example: 'Huy Ta Quoc'
    },
    email: {
      type: 'string',
      example: 'quochuy.tl.bk@gmail.com'
    }
  }
};

const ListOfUserEmails = {
  description: 'A model representing a list of user emails',
  type: 'array',
  items: {
    type: 'string',
    format: 'email',
    example: 'quochuy.tl.bk@gmail.com'
  }
};

const SimpleDepartment = {
  description: 'Brief information about a department',
  type: 'object',
  required: [
    'id',
    'name'
  ],
  properties: {
    id: {
      type: 'string',
      example: '23936b96-02d4-3322-b848-a39deb469543'
    },
    name: {
      type: 'string',
      example: 'Personnel Deparment'
    }
  }
};

export default {
  SimpleUser,
  ListOfUserEmails,
  SimpleDepartment
};
