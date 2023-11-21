import { OrderType } from 'types'

import { SortCourseBy, SortFieldCourse } from '../types'

export interface ISortCourseByData {
  key: SortCourseBy
  text: string
  value: {
    order: OrderType
    sortField: SortFieldCourse
  }
}

export const SortCourseByData: ISortCourseByData[] = [
  {
    key: SortCourseBy.PUBLISHED_DATE_ASC,
    text: 'Mới nhất',
    value: {
      order: OrderType.ASC,
      sortField: SortFieldCourse.PUBLISHED_DATE,
    },
  },
  {
    key: SortCourseBy.PUBLISHED_DATE_DESC,
    text: 'Cũ nhất',
    value: {
      order: OrderType.DESC,
      sortField: SortFieldCourse.PUBLISHED_DATE,
    },
  },
  {
    key: SortCourseBy.PRICE_ASC,
    text: 'Giá từ thấp tới cao',
    value: {
      order: OrderType.ASC,
      sortField: SortFieldCourse.PRICE,
    },
  },
  {
    key: SortCourseBy.PRICE_DESC,
    text: 'Giá từ cao tới thấp',
    value: {
      order: OrderType.DESC,
      sortField: SortFieldCourse.PRICE,
    },
  },
]
