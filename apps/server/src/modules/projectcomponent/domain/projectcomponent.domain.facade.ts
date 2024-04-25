import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Projectcomponent } from './projectcomponent.model'

import { Project } from '../../project/domain'

import { Uicomponent } from '../../uicomponent/domain'

@Injectable()
export class ProjectcomponentDomainFacade {
  constructor(
    @InjectRepository(Projectcomponent)
    private repository: Repository<Projectcomponent>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Projectcomponent>): Promise<Projectcomponent> {
    return this.repository.save(values)
  }

  async update(
    item: Projectcomponent,
    values: Partial<Projectcomponent>,
  ): Promise<Projectcomponent> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Projectcomponent): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Projectcomponent> = {},
  ): Promise<Projectcomponent[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Projectcomponent> = {},
  ): Promise<Projectcomponent> {
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
    queryOptions: RequestHelper.QueryOptions<Projectcomponent> = {},
  ): Promise<Projectcomponent[]> {
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

  async findManyByComponent(
    item: Uicomponent,
    queryOptions: RequestHelper.QueryOptions<Projectcomponent> = {},
  ): Promise<Projectcomponent[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('component')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        componentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
