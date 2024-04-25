import { User } from '../user'

export class Interaction {
  id: string

  input?: string

  response?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
