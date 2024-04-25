import { Project } from '../project'

import { Uicomponent } from '../uicomponent'

export class Projectcomponent {
  id: string

  projectId: string

  project?: Project

  componentId: string

  component?: Uicomponent

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
