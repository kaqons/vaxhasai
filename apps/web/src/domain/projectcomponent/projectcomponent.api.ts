import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Projectcomponent } from './projectcomponent.model'

export class ProjectcomponentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Projectcomponent>,
  ): Promise<Projectcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/projectcomponents${buildOptions}`)
  }

  static findOne(
    projectcomponentId: string,
    queryOptions?: ApiHelper.QueryOptions<Projectcomponent>,
  ): Promise<Projectcomponent> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/projectcomponents/${projectcomponentId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Projectcomponent>,
  ): Promise<Projectcomponent> {
    return HttpService.api.post(`/v1/projectcomponents`, values)
  }

  static updateOne(
    projectcomponentId: string,
    values: Partial<Projectcomponent>,
  ): Promise<Projectcomponent> {
    return HttpService.api.patch(
      `/v1/projectcomponents/${projectcomponentId}`,
      values,
    )
  }

  static deleteOne(projectcomponentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/projectcomponents/${projectcomponentId}`)
  }

  static findManyByProjectId(
    projectId: string,
    queryOptions?: ApiHelper.QueryOptions<Projectcomponent>,
  ): Promise<Projectcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/projects/project/${projectId}/projectcomponents${buildOptions}`,
    )
  }

  static createOneByProjectId(
    projectId: string,
    values: Partial<Projectcomponent>,
  ): Promise<Projectcomponent> {
    return HttpService.api.post(
      `/v1/projects/project/${projectId}/projectcomponents`,
      values,
    )
  }

  static findManyByComponentId(
    componentId: string,
    queryOptions?: ApiHelper.QueryOptions<Projectcomponent>,
  ): Promise<Projectcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/uicomponents/component/${componentId}/projectcomponents${buildOptions}`,
    )
  }

  static createOneByComponentId(
    componentId: string,
    values: Partial<Projectcomponent>,
  ): Promise<Projectcomponent> {
    return HttpService.api.post(
      `/v1/uicomponents/component/${componentId}/projectcomponents`,
      values,
    )
  }
}
