import LabelModel from '../../Label';
import labelData from './labelData';

const labelSeeding = async () => {
  console.log('Seeding labels...');

  await LabelModel.deleteMany({});

  await Promise.all(labelData.map(label => label.save()));

  console.log('Label seeding completed.');
};

export default labelSeeding;
