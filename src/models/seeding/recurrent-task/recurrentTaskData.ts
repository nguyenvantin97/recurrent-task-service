import simpleDepartmentData from './simpleDepartmentData';
import simpleUserData from './simpleUserData';
import labelData from '../label/labelData';
import RecurrentTaskType from '../../enums/RecurrentTaskType';
import RecurrentTaskStatus from '../../enums/RecurrentTaskStatus';

const RANDOM_LENGTH = 40;

const randomNumber = max => Math.round(Math.random() * max);

const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomArrayNumberRecursively = (number, arrayData) => {
  if (!number) return arrayData;
  const eliminateIndex = randomNumber(arrayData.length - 1);
  const newArrayData = arrayData.filter(data => data.name !== arrayData[eliminateIndex].name);
  return randomArrayNumberRecursively(number - 1, newArrayData);
};

const randomEnumProperty = obj => {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

const recurrentTaskData = Array.from({ length: RANDOM_LENGTH }, () => {

  const taskIndex = randomNumber(1000);

  const name = `Task ${taskIndex}`;

  const description = `Let finish your task ${taskIndex}`;

  const creator = simpleUserData[randomNumber(simpleUserData.length - 1)];

  const type = randomEnumProperty(RecurrentTaskType);

  let doer;
  let coDoers = [];
  let reviewer;
  let department;
  let coDepartments = [];

  if (type === RecurrentTaskType.INDIVIDUAL) {
    doer = simpleUserData[randomNumber(simpleUserData.length - 1)];

    const userArrayEliminatedDoer = simpleUserData.filter(
      element => element.id !== doer.id
    );
    coDoers = randomArrayNumberRecursively(
      randomNumber(simpleUserData.length - 2),
      userArrayEliminatedDoer
    );

    do {
      reviewer = simpleUserData[randomNumber(simpleUserData.length - 1)];
    } while (reviewer.id === doer.id)
  }
  else if (type === RecurrentTaskType.DEPARTMENT) {
    department =
      simpleDepartmentData[randomNumber(simpleDepartmentData.length - 1)];

    const departmentArrayEliminatedPreviousDepartment = simpleDepartmentData.filter(
      element => element.id !== department.id
    );
    coDepartments = randomArrayNumberRecursively(
      randomNumber(simpleDepartmentData.length - 2),
      departmentArrayEliminatedPreviousDepartment
    );

    reviewer = simpleUserData[randomNumber(simpleUserData.length - 1)];
  }

  const labelIds = randomArrayNumberRecursively(
    randomNumber(labelData.length - 1),
    labelData
  ).map(label => label._id);

  const percentComplete = randomNumber(100);

  const start = randomDate(new Date(2019, 15, 11), new Date());

  const finish = randomDate(new Date(2019, 15, 11), new Date());

  const due = randomDate(new Date(2019, 15, 11), new Date());

  const comment = 'What is that ?';

  const status = randomEnumProperty(RecurrentTaskStatus);

  return {
    name,
    description,
    creator,
    doer,
    coDoers,
    reviewer,
    department,
    coDepartments,
    labelIds,
    start,
    finish,
    due,
    comment,
    type,
    percentComplete,
    status
  };
});

export default recurrentTaskData;
