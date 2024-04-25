import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UicomponentDomainModule } from '../domain'
import { UicomponentController } from './uicomponent.controller'

@Module({
  imports: [AuthenticationDomainModule, UicomponentDomainModule],
  controllers: [UicomponentController],
  providers: [],
})
export class UicomponentApplicationModule {}
