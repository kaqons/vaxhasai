import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProjectcomponentDomainModule } from '../domain'
import { ProjectcomponentController } from './projectcomponent.controller'

import { ProjectDomainModule } from '../../../modules/project/domain'

import { ProjectcomponentByProjectController } from './projectcomponentByProject.controller'

import { UicomponentDomainModule } from '../../../modules/uicomponent/domain'

import { ProjectcomponentByUicomponentController } from './projectcomponentByUicomponent.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ProjectcomponentDomainModule,

    ProjectDomainModule,

    UicomponentDomainModule,
  ],
  controllers: [
    ProjectcomponentController,

    ProjectcomponentByProjectController,

    ProjectcomponentByUicomponentController,
  ],
  providers: [],
})
export class ProjectcomponentApplicationModule {}
