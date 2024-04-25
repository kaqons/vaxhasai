import { Project } from '../project'

export class Codesnippet {
  id: string

  codeContent?: string

  projectId: string

  project?: Project

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
