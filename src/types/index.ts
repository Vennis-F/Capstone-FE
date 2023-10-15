import { SxProps, Theme } from '@mui/material'

export type StyleSxProps = Record<string, SxProps<Theme>>
export type FormInputOptions = [string, any][] // eslint-disable-line
export enum UserRole {
  CUSTOMER = 'Customer',
  ADMIN = 'Admin',
  STAFF = 'Staff',
  LEARNER = 'Learner',
}
export type ResponseError = {
  response: { data: { message: string } }
}
export enum OrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type PageOptions = {
  take: number
  page: number
  order: OrderType
}
export type PageMetaResponse = {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
