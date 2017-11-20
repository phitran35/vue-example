export default {
  items: [
    {
      name: 'Survey',
      url: '/surveys',
      icon: 'expanded-default-icon',
      children: [
        {name: 'Create New', url: '/surveys/new'},
        {name: 'Pending Review', url: '/surveys/pending'},
        {name: 'Survey Library', url: '/surveys/'},
        {name: 'Question Library', url: '/surveys/questions'},
        {name: 'Survey Map', url: '/surveys/map'}
      ]
    }
  ]
};
