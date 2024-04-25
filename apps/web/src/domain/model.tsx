import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Project as ProjectModel } from './project/project.model'

import { File as FileModel } from './file/file.model'

import { Codesnippet as CodesnippetModel } from './codesnippet/codesnippet.model'

import { Uicomponent as UicomponentModel } from './uicomponent/uicomponent.model'

import { Tutorial as TutorialModel } from './tutorial/tutorial.model'

import { Tutorialcomponent as TutorialcomponentModel } from './tutorialcomponent/tutorialcomponent.model'

import { Projectcomponent as ProjectcomponentModel } from './projectcomponent/projectcomponent.model'

import { Interaction as InteractionModel } from './interaction/interaction.model'

import { Educationalresource as EducationalresourceModel } from './educationalresource/educationalresource.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Project extends ProjectModel {}

  export class File extends FileModel {}

  export class Codesnippet extends CodesnippetModel {}

  export class Uicomponent extends UicomponentModel {}

  export class Tutorial extends TutorialModel {}

  export class Tutorialcomponent extends TutorialcomponentModel {}

  export class Projectcomponent extends ProjectcomponentModel {}

  export class Interaction extends InteractionModel {}

  export class Educationalresource extends EducationalresourceModel {}
}
