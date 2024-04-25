import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ProjectApplicationModule } from './project/application'

import { FileApplicationModule } from './file/application'

import { CodesnippetApplicationModule } from './codesnippet/application'

import { UicomponentApplicationModule } from './uicomponent/application'

import { TutorialApplicationModule } from './tutorial/application'

import { TutorialcomponentApplicationModule } from './tutorialcomponent/application'

import { ProjectcomponentApplicationModule } from './projectcomponent/application'

import { InteractionApplicationModule } from './interaction/application'

import { EducationalresourceApplicationModule } from './educationalresource/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ProjectApplicationModule,

    FileApplicationModule,

    CodesnippetApplicationModule,

    UicomponentApplicationModule,

    TutorialApplicationModule,

    TutorialcomponentApplicationModule,

    ProjectcomponentApplicationModule,

    InteractionApplicationModule,

    EducationalresourceApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
