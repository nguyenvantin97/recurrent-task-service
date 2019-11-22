import RecurrentTaskModel from '../../RecurrentTask';
import recurrentTaskData from './recurrentTaskData';

const RecurrentTaskSeeding = async () => {
  console.log('Seeding recurrent tasks...');

  await RecurrentTaskModel.deleteMany({});

  await Promise.all(recurrentTaskData.map(recurrentTask => (new RecurrentTaskModel(recurrentTask)).save()));

  console.log('Recurrent task seeding completed.');
};

export default RecurrentTaskSeeding;
