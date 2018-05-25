export const navigation = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    children: [
      {
        id: 'sample',
        title: 'Sample',
        translate: 'NAV.SAMPLE.TITLE',
        type: 'item',
        icon: 'email',
        url: '/sample',
        badge: {
          title: 25,
          translate: 'NAV.SAMPLE.BADGE',
          bg: '#F44336',
          fg: '#FFFFFF'
        }
      },
      {
        id: 'truck data',
        title: 'Truck data',
        translate: 'NAV.GRID.TITLE',
        type: 'item',
        icon: 'grid_on',
        url: '/truckData'
      }
    ]
  }
];
