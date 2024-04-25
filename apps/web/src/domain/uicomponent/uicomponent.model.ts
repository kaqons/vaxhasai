import { Tutorialcomponent } from '../tutorialcomponent'

import { Projectcomponent } from '../projectcomponent'

export class Uicomponent {
  id: string

  name?: string

  codeSnippet?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  tutorialcomponentsAsComponent?: Tutorialcomponent[]

  projectcomponentsAsComponent?: Projectcomponent[]
}
