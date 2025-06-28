import { TimelineEntity } from '../../src/models';

export const politicsEntities: TimelineEntity[] = [
  {
    id: 'julius-caesar',
    title: 'Julius Caesar',
    startDate: '100-07-12 BCE',
    endDate: '44-03-15 BCE',
    type: 'Lifetime',
    children: [
      {
        id: 'assassination-of-julius-caesar',
        title: 'Assassination of Julius Caesar',
        startDate: '44-03-15 BCE',
        type: 'Milestone',
        children: [],
        tags: [],
        importance: 5
      }
    ],
    tags: ['politics', 'ancient rome'],
    importance: 5
  },
  {
    id: 'berlin-wall',
    title: 'Berlin Wall',
    startDate: '1961-08-13',
    endDate: '1989-11-09',
    type: 'Period',
    children: [
      {
        id: 'fall-of-berlin-wall',
        title: 'Fall of the Berlin Wall',
        startDate: '1989-11-09',
        type: 'Milestone',
        children: [],
        tags: [],
        importance: 5
      }
    ],
    tags: ['politics', 'modern', 'europe'],
    importance: 4
  },
  {
    id: 'magna-carta',
    title: 'Magna Carta',
    startDate: '1215-06-15',
    type: 'Milestone',
    children: [],
    tags: ['politics', 'medieval', 'europe'],
    importance: 5
  },
  {
    id: 'bretton-woods',
    title: 'Bretton Woods Conference',
    startDate: '1944-07-01',
    endDate: '1944-07-22',
    type: 'Period',
    children: [],
    tags: ['economics', 'politics', 'modern'],
    importance: 4
  },
  {
    id: 'partition-of-india',
    title: 'Partition of India',
    startDate: '1947-08-15',
    type: 'Milestone',
    children: [],
    tags: ['politics', 'modern', 'asia'],
    importance: 4
  },
  {
    id: 'medici-bank',
    title: 'Founding of the Medici Bank',
    startDate: '1397',
    type: 'Milestone',
    children: [],
    tags: ['economics', 'renaissance', 'europe', 'italy'],
    importance: 4
  },
  {
    id: 'lorenzo-medici',
    title: 'Lorenzo de\' Medici (il Magnifico)',
    startDate: '1449-01-01',
    endDate: '1492-04-08',
    type: 'Lifetime',
    children: [],
    tags: ['politics', 'renaissance', 'europe', 'italy', 'art'],
    importance: 4
  },
  {
    id: 'henry-viii',
    title: 'Henry VIII',
    startDate: '1491-06-28',
    endDate: '1547-01-28',
    type: 'Lifetime',
    children: [
      {
        id: 'english-reformation',
        title: 'English Reformation',
        startDate: '1534',
        type: 'Milestone',
        children: [],
        tags: [],
        importance: 5
      }
    ],
    tags: ['politics', 'monarchy', 'renaissance', 'europe', 'england', 'religion'],
    importance: 5
  }
];
