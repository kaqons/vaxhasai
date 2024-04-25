import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EducationalresourceDomainModule } from '../domain'
import { EducationalresourceController } from './educationalresource.controller'

@Module({
  imports: [AuthenticationDomainModule, EducationalresourceDomainModule],
  controllers: [EducationalresourceController],
  providers: [],
})
export class EducationalresourceApplicationModule {}
