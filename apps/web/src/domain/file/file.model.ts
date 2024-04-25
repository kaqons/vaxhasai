import { Project } from '../project'

export class File {
  id: string

  fileName?: string

  fileType?: string

  filePathUrl?: string

  projectId: string

  project?: Project

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
