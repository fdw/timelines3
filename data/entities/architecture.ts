import { TimelineEntity } from '../../src/models/TimelineEntity'
import { importEntitiesWithDayjs } from '../../src/utils/dateImporter'

// Raw entities with string dates
const rawArchitectureEntities = [
  {
    id: 'le-corbusier',
    title: 'Le Corbusier',
    startDate: '1887-10-06',
    endDate: '1965-08-27',
    type: 'Lifetime',
    children: [],
    tags: ['architecture'],
    importance: 5,
  },
  {
    id: 'frank-lloyd-wright',
    title: 'Frank Lloyd Wright',
    startDate: '1867-06-08',
    endDate: '1959-04-09',
    type: 'Lifetime',
    children: [],
    tags: ['architecture'],
    importance: 5,
  },
  {
    id: 'frank-gehry',
    title: 'Frank Gehry',
    startDate: '1929-02-28',
    endDate: undefined, // 'now' in original data
    type: 'Lifetime',
    children: [],
    tags: ['architecture'],
    importance: 4,
  },
  {
    id: 'antoni-gaudi',
    title: 'Antoni Gaudí',
    startDate: '1852-06-25',
    endDate: '1926-06-10',
    type: 'Lifetime',
    children: [
      {
        id: 'sagrada-familia-construction-start',
        title: 'Start of the construction of the Sagrada Família',
        startDate: '1882-03-19',
        type: 'Milestone',
        children: [],
        tags: [],
        importance: 4,
      },
    ],
    tags: ['architecture'],
    importance: 5,
  },
  {
    id: 'ludwig-mies-van-der-rohe',
    title: 'Ludwig Mies van der Rohe',
    startDate: '1886-03-27',
    endDate: '1969-08-17',
    type: 'Lifetime',
    children: [],
    tags: ['architecture', 'design'],
    importance: 4,
  },
  {
    id: 'zaha-hadid',
    title: 'Zaha Hadid',
    startDate: '1950-10-31',
    endDate: '2016-03-31',
    type: 'Lifetime',
    children: [],
    tags: ['architecture'],
    importance: 4,
  },
  {
    id: 'walter-gropius',
    title: 'Walter Gropius',
    startDate: '1883-05-18',
    endDate: '1969-07-05',
    type: 'Lifetime',
    children: [],
    tags: ['architecture', 'design'],
    importance: 4,
  },
  {
    id: 'filippo-brunelleschi',
    title: 'Filippo Brunelleschi',
    startDate: '1377',
    endDate: '1446-04-15',
    type: 'Lifetime',
    children: [],
    tags: ['architecture'],
    importance: 4,
  },
]

// Export entities with dayjs dates
export const architectureEntities: TimelineEntity[] = importEntitiesWithDayjs(rawArchitectureEntities)
