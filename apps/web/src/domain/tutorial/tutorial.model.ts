import { Tutorialcomponent } from '../tutorialcomponent'

export class Tutorial {
  id: string

  title?: string

  content?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  tutorialcomponents?: Tutorialcomponent[]
}
