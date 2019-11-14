enum TAGS {
  HELLO = 'hello',
  LABELS = 'labels',
  RECURRENT_TASKS = 'recurrent-tasks'
}

const tags = [
  {
    name: TAGS.HELLO,
    description: 'Ways to say hello to the world'
  },
  {
    name: TAGS.LABELS,
    description: 'Operations (CRUD) on recurrent task labels'
  },
  {
    name: TAGS.RECURRENT_TASKS,
    description: 'Operations (CRUD) on recurrent tasks'
  }
];

export { TAGS, tags };

export default tags;
