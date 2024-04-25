import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Tutorialcomponent } from './tutorialcomponent.model'

import { Tutorial } from '../../tutorial/domain'

import { Uicomponent } from '../../uicomponent/domain'

@Injectable()
export class TutorialcomponentDomainFacade {
  constructor(
    @InjectRepository(Tutorialcomponent)
    private repository: Repository<Tutorialcomponent>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Tutorialcomponent>): Promise<Tutorialcomponent> {
    return this.repository.save(values)
  }

  async update(
    item: Tutorialcomponent,
    values: Partial<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Tutorialcomponent): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Tutorialcomponent> = {},
  ): Promise<Tutorialcomponent[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Tutorialcomponent> = {},
  ): Promise<Tutorialcomponent> {
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

  async findManyByTutorial(
    item: Tutorial,
    queryOptions: RequestHelper.QueryOptions<Tutorialcomponent> = {},
  ): Promise<Tutorialcomponent[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('tutorial')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        tutorialId: item.id,
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
    queryOptions: RequestHelper.QueryOptions<Tutorialcomponent> = {},
  ): Promise<Tutorialcomponent[]> {
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
