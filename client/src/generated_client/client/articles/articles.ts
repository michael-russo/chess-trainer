/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * My API
 * OpenAPI spec version: 1.0.0
 */
import { useQuery } from '@tanstack/react-query';
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import type { GetArticlesParams, GetArticlesResponse } from '../../models';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const getArticles = (
  params?: GetArticlesParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<GetArticlesResponse>> => {
  return axios.get(`/articles`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getGetArticlesQueryKey = (params?: GetArticlesParams) =>
  [`/articles`, ...(params ? [params] : [])] as const;

export const getGetArticlesQueryOptions = <
  TData = Awaited<ReturnType<typeof getArticles>>,
  TError = AxiosError<unknown>
>(
  params?: GetArticlesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getArticles>>, TError, TData>;
    axios?: AxiosRequestConfig;
  }
): UseQueryOptions<Awaited<ReturnType<typeof getArticles>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetArticlesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getArticles>>> = ({ signal }) =>
    getArticles(params, { ...(signal ? { signal } : {}), ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions };
};

export type GetArticlesQueryResult = NonNullable<Awaited<ReturnType<typeof getArticles>>>;
export type GetArticlesQueryError = AxiosError<unknown>;

export const useGetArticles = <
  TData = Awaited<ReturnType<typeof getArticles>>,
  TError = AxiosError<unknown>
>(
  params?: GetArticlesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getArticles>>, TError, TData>;
    axios?: AxiosRequestConfig;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetArticlesQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};