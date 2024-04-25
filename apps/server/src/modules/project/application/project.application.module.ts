import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProjectDomainModule } from '../domain'
import { ProjectController } from './project.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ProjectByUserController } from './projectByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ProjectDomainModule, UserDomainModule],
  controllers: [ProjectController, ProjectByUserController],
  providers: [],
})
export class ProjectApplicationModule {}
