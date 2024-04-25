import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { FileDomainModule } from '../domain'
import { FileController } from './file.controller'

import { ProjectDomainModule } from '../../../modules/project/domain'

import { FileByProjectController } from './fileByProject.controller'

@Module({
  imports: [AuthenticationDomainModule, FileDomainModule, ProjectDomainModule],
  controllers: [FileController, FileByProjectController],
  providers: [],
})
export class FileApplicationModule {}
