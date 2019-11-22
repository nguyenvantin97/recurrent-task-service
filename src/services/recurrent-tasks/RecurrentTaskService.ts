import { RecurrentTaskModel } from '@models/RecurrentTask';
import { SEARCH_DEFAULT } from '@constants/common';

// TODO: Turn this into a class with a static method
async function searchRecurrentTasks({ offset, limit, fields, sort, body }): Promise<any> {
  const searchFields = ['name', 'description', 'status', 'type', 'comment'];

  const { creators, doers, departments, reviewers, status } = body;

  const $and = [];

  if (body.query) $and.push({ $or: searchFields.map(field => ({ [field]: new RegExp(body.query, 'gi') })) });

  if (Array.isArray(creators)) $and.push({ 'creator.email': { $in: creators } });

  if (Array.isArray(doers)) $and.push({
    $or: [
      { 'doer.email': { $in: doers } },
      { coDoers: { $elemMatch: { email: { $in: doers } } } }
    ]
  });

  if (Array.isArray(departments)) {
    $and.push({
      $or: [
        {
          'department.name': {
            $in: departments
          }
        },
        {
          coDepartments: {
            $elemMatch: {
              name: {
                $in: departments
              }
            }
          }
        }
      ]
    });
  }

  if (Array.isArray(reviewers)) $and.push({ 'reviewer.email': { $in: reviewers } });

  if (Array.isArray(status)) $and.push({ status: { $in: status } });

  const mongoQuery: any = {};

  if ($and.length) mongoQuery.$and = $and;

  const recurrentTasks = await RecurrentTaskModel
    .find(mongoQuery)
    .sort(sort ? JSON.parse(`{${sort.map(element => {
        const field = element.substring(0, element.lastIndexOf('_'));
        const value = element.substring(element.lastIndexOf('_') + 1) === 'asc' ? 1 : -1;
        return `"${field}":${value}`;
      }).join(',')}}`) : { _id: 1 })
    .skip(offset || SEARCH_DEFAULT.OFFSET)
    .limit(limit || SEARCH_DEFAULT.LIMIT)
    .select(fields ? JSON.parse(`{${fields.map(element => `"${element}":1`).join(',')}}`) : {})
    .lean();

  return recurrentTasks;
}

export { searchRecurrentTasks };
