import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TutorialcomponentDomainModule } from '../domain'
import { TutorialcomponentController } from './tutorialcomponent.controller'

import { TutorialDomainModule } from '../../../modules/tutorial/domain'

import { TutorialcomponentByTutorialController } from './tutorialcomponentByTutorial.controller'

import { UicomponentDomainModule } from '../../../modules/uicomponent/domain'

import { TutorialcomponentByUicomponentController } from './tutorialcomponentByUicomponent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TutorialcomponentDomainModule,

    TutorialDomainModule,

    UicomponentDomainModule,
  ],
  controllers: [
    TutorialcomponentController,

    TutorialcomponentByTutorialController,

    TutorialcomponentByUicomponentController,
  ],
  providers: [],
})
export class TutorialcomponentApplicationModule {}
