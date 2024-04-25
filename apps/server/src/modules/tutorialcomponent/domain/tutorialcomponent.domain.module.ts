import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TutorialcomponentDomainFacade } from './tutorialcomponent.domain.facade'
import { Tutorialcomponent } from './tutorialcomponent.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tutorialcomponent]),
    DatabaseHelperModule,
  ],
  providers: [TutorialcomponentDomainFacade, TutorialcomponentDomainFacade],
  exports: [TutorialcomponentDomainFacade],
})
export class TutorialcomponentDomainModule {}
