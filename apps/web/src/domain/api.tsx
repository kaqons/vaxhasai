import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ProjectApi } from './project/project.api'

import { FileApi } from './file/file.api'

import { CodesnippetApi } from './codesnippet/codesnippet.api'

import { UicomponentApi } from './uicomponent/uicomponent.api'

import { TutorialApi } from './tutorial/tutorial.api'

import { TutorialcomponentApi } from './tutorialcomponent/tutorialcomponent.api'

import { ProjectcomponentApi } from './projectcomponent/projectcomponent.api'

import { InteractionApi } from './interaction/interaction.api'

import { EducationalresourceApi } from './educationalresource/educationalresource.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Project extends ProjectApi {}

  export class File extends FileApi {}

  export class Codesnippet extends CodesnippetApi {}

  export class Uicomponent extends UicomponentApi {}

  export class Tutorial extends TutorialApi {}

  export class Tutorialcomponent extends TutorialcomponentApi {}

  export class Projectcomponent extends ProjectcomponentApi {}

  export class Interaction extends InteractionApi {}

  export class Educationalresource extends EducationalresourceApi {}
}
