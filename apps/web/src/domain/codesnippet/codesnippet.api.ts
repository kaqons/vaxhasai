import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Codesnippet } from './codesnippet.model'

export class CodesnippetApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Codesnippet>,
  ): Promise<Codesnippet[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/codesnippets${buildOptions}`)
  }

  static findOne(
    codesnippetId: string,
    queryOptions?: ApiHelper.QueryOptions<Codesnippet>,
  ): Promise<Codesnippet> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/codesnippets/${codesnippetId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Codesnippet>): Promise<Codesnippet> {
    return HttpService.api.post(`/v1/codesnippets`, values)
  }

  static updateOne(
    codesnippetId: string,
    values: Partial<Codesnippet>,
  ): Promise<Codesnippet> {
    return HttpService.api.patch(`/v1/codesnippets/${codesnippetId}`, values)
  }

  static deleteOne(codesnippetId: string): Promise<void> {
    return HttpService.api.delete(`/v1/codesnippets/${codesnippetId}`)
  }

  static findManyByProjectId(
    projectId: string,
    queryOptions?: ApiHelper.QueryOptions<Codesnippet>,
  ): Promise<Codesnippet[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/projects/project/${projectId}/codesnippets${buildOptions}`,
    )
  }

  static createOneByProjectId(
    projectId: string,
    values: Partial<Codesnippet>,
  ): Promise<Codesnippet> {
    return HttpService.api.post(
      `/v1/projects/project/${projectId}/codesnippets`,
      values,
    )
  }
}
