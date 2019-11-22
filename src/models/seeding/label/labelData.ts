import LabelModel from '../../Label';

const label = [
  {
    name: 'Backend',
    color: '#000000'
  },
  {
    name: 'Frontend',
    color: '#FF0000'
  },
  {
    name: 'Bug',
    color: '#FFF333'
  },
  {
    name: 'Task',
    color: '#DDDDDD'
  },
  {
    name: 'Maintenance',
    color: '#DDD000'
  }
];

const labelData = label.reduce((accumulator, label) => {
  const labelModel = new LabelModel(label);
  return [...accumulator, labelModel];
}, []);

export default labelData;
