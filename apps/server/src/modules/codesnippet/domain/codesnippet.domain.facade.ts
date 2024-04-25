import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Codesnippet } from './codesnippet.model'

import { Project } from '../../project/domain'

@Injectable()
export class CodesnippetDomainFacade {
  constructor(
    @InjectRepository(Codesnippet)
    private repository: Repository<Codesnippet>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Codesnippet>): Promise<Codesnippet> {
    return this.repository.save(values)
  }

  async update(
    item: Codesnippet,
    values: Partial<Codesnippet>,
  ): Promise<Codesnippet> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Codesnippet): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Codesnippet> = {},
  ): Promise<Codesnippet[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Codesnippet> = {},
  ): Promise<Codesnippet> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByProject(
    item: Project,
    queryOptions: RequestHelper.QueryOptions<Codesnippet> = {},
  ): Promise<Codesnippet[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('project')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        projectId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
