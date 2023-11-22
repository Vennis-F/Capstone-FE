import { CreatePostBodyRequest, UpdatePostBodyRequest } from '.'

export type CreatePostFormInput = CreatePostBodyRequest

export type UpdatePostFormInput = Omit<UpdatePostBodyRequest, 'postId'>
