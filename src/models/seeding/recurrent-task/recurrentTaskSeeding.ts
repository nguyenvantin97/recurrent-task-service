import RecurrentTaskModel from '../../RecurrentTask';
import recurrentTaskData from './recurrentTaskData';

const RecurrentTaskSeeding = async () => {
  RecurrentTaskModel.deleteMany({}).then(() => {
    recurrentTaskData.map(async recurrentTask => {
      const newRecurrentTask = new RecurrentTaskModel(recurrentTask);
      await newRecurrentTask.save();
    });
    console.log('Seeding recurrent task completed!');
  });
};

export default RecurrentTaskSeeding;
