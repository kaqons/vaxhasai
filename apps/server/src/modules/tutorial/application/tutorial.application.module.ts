import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TutorialDomainModule } from '../domain'
import { TutorialController } from './tutorial.controller'

@Module({
  imports: [AuthenticationDomainModule, TutorialDomainModule],
  controllers: [TutorialController],
  providers: [],
})
export class TutorialApplicationModule {}
