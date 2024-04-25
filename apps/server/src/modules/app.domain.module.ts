import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ProjectDomainModule } from './project/domain'

import { FileDomainModule } from './file/domain'

import { CodesnippetDomainModule } from './codesnippet/domain'

import { UicomponentDomainModule } from './uicomponent/domain'

import { TutorialDomainModule } from './tutorial/domain'

import { TutorialcomponentDomainModule } from './tutorialcomponent/domain'

import { ProjectcomponentDomainModule } from './projectcomponent/domain'

import { InteractionDomainModule } from './interaction/domain'

import { EducationalresourceDomainModule } from './educationalresource/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ProjectDomainModule,

    FileDomainModule,

    CodesnippetDomainModule,

    UicomponentDomainModule,

    TutorialDomainModule,

    TutorialcomponentDomainModule,

    ProjectcomponentDomainModule,

    InteractionDomainModule,

    EducationalresourceDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
