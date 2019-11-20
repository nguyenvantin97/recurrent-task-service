import LabelModel from '../../Label';
import labelData from './labelData';

const labelSeeding = async () => {
  LabelModel.deleteMany({}).then(() => {
    labelData.map(async label => {
      await label.save();
    });
    console.log('Seeding label completed!');
  });
};

export default labelSeeding;
