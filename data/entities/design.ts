import { TimelineEntity } from '../../src/models'
import { importEntitiesWithDayjs } from '../../src/utils/dateImporter'

// Raw entities with string dates
const rawDesignEntities = [
  {
    id: 'dieter-rams',
    title: 'Dieter Rams',
    startDate: '1932-05-20',
    endDate: undefined, // 'now' in original data
    type: 'Lifetime',
    children: [],
    tags: ['design'],
    importance: 4,
  },
  {
    id: 'coco-chanel',
    title: 'Coco Chanel',
    startDate: '1883-08-19',
    endDate: '1971-01-10',
    type: 'Lifetime',
    children: [],
    tags: ['design', 'fashion'],
    importance: 4,
  },
]

// Export entities with dayjs dates
export const designEntities: TimelineEntity[] = importEntitiesWithDayjs(rawDesignEntities)
