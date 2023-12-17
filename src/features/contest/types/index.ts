import { PageOptions } from 'types'

export type Contest = {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  insertedDate: string
  prize: string
  startedDate: string
  expiredDate: string
  active: boolean
  status: ContestStatus
  staffName: string
  totalCustomerDrawing: number
  isVisible: boolean
}

export type CreateContestBodyRequest = {
  title: string
  description: string
  prize: string
  startedDate: string
  expiredDate: string
  isVisible: boolean
}

export type UpdateContestBodyRequest = {
  title: string
  description: string
  prize: string
  startedDate: string
  expiredDate: string
  isVisible: boolean
}

export enum ContestStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
}

export type FindContestsFilterBodyRequest = {
  status?: ContestStatus
  pageOptions: PageOptions
}

export function mapStatusToVietnamese(status: ContestStatus): string {
  switch (status) {
    case ContestStatus.PENDING:
      return 'chưa diễn ra'
    case ContestStatus.ACTIVE:
      return 'đang diễn ra'
    case ContestStatus.EXPIRED:
      return 'đã kết thúc'
    default:
      return 'Trạng thái không xác định'
  }
}

export function mapStatusToVietnameseColor(status: ContestStatus) {
  switch (status) {
    case ContestStatus.PENDING:
      return {
        vietnam: 'chưa diễn ra',
        color: '#3498db', // Màu xanh dương
      }
    case ContestStatus.ACTIVE:
      return {
        vietnam: 'đang diễn ra',
        color: '#2ecc71', // Màu xanh lá cây
      }
    case ContestStatus.EXPIRED:
      return {
        vietnam: 'đã kết thúc',
        color: '#e74c3c', // Màu đỏ
      }
    default:
      return {
        vietnam: 'Trạng thái không xác định',
        color: '#95a5a6', // Màu xám
      }
  }
}

export type DefinePromotionForWinnerBodyRequest = {
  discountPercentFirst: number
  effectiveDateFirst: string
  expiredDateFirst: string

  discountPercentSecond: number
  effectiveDateSecond: string
  expiredDateSecond: string

  discountPercentThird: number
  effectiveDateThird: string
  expiredDateThird: string
}

export type ViewWinner = {
  id: string
  position: number
  active: boolean
  winnerName: string
  insertedDate: Date
  imageUrl: string
  title: string
  description: string
}
