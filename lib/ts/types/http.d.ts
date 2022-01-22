import type { Either } from 'fp-ts/Either';
import { RequestInit as NodeFetchRequestInit } from 'node-fetch'

export type HttpOptions = {
    request: RequestInit | NodeFetchRequestInit;
}

export type HttpError = {
    status: number;
    message: string;
};

export type PromiseResult<T> = Promise<Either<HttpError, T>>

export as namespace HTTP;
