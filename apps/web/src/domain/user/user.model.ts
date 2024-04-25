import { Notification } from '../notification'

import { Project } from '../project'

import { Interaction } from '../interaction'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  projects?: Project[]

  interactions?: Interaction[]
}
