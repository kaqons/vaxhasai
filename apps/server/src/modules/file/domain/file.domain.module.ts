import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { FileDomainFacade } from './file.domain.facade'
import { File } from './file.model'

@Module({
  imports: [TypeOrmModule.forFeature([File]), DatabaseHelperModule],
  providers: [FileDomainFacade, FileDomainFacade],
  exports: [FileDomainFacade],
})
export class FileDomainModule {}
