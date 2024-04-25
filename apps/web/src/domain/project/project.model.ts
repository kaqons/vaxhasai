import { User } from '../user'

import { File } from '../file'

import { Codesnippet } from '../codesnippet'

import { Projectcomponent } from '../projectcomponent'

export class Project {
  id: string

  name?: string

  description?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  files?: File[]

  codesnippets?: Codesnippet[]

  projectcomponents?: Projectcomponent[]
}
