import axios, { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";
import { right, left } from "fp-ts/Either";
import fetch, { RequestInit as NodeFetchRequestInit, Headers as NodeFetchHeaders } from "node-fetch";

type Engine = "fetch" | "axios";
const API_URL = process.env.API_URL || "http://localhost:3000";

export class HttpClient {
    private _baseUrl;
    private _url;
    private _options: HTTP.HttpOptions;
    private _engine: Engine;

    constructor(
        engine: Engine = "fetch",
        baseUrl: string = API_URL as string,
        options: HTTP.HttpOptions = { request: {} }
    ) {
        this._engine = engine;
        this._baseUrl = baseUrl;
        this._url = this._baseUrl;
        this._options = options;
    }

    private getResponseType(headers: Headers | NodeFetchHeaders): "json" | "text" {
        if (headers.get("Content-Type")?.includes("application/json")) {
            return "json";
        }
        return "text";
    }

    private buildQuery(query: any) {
        const _query = new URLSearchParams(query);
        const url = new URL(this._url);
        url.search += _query;
        return url.href;
    }

    private async requestWithFetch<T>(): HTTP.PromiseResult<T> {
        const res = await fetch(this._url, this._options.request as NodeFetchRequestInit);
        const data = await res[this.getResponseType(res.headers)]();
        if (res.ok) {
            return right(data);
        }
        return left({ status: res.status, message: res.statusText });
    }

    private mapToAxiosConfig(requestInit: RequestInit): AxiosRequestConfig {
        return {
            method: requestInit.method as Method,
            url: this._url,
            headers: requestInit.headers as AxiosRequestHeaders,
        };
    }

    private async requestWithAxios<T>(): HTTP.PromiseResult<T> {
        try {
            const res = await axios.request(
                this.mapToAxiosConfig(this._options.request as RequestInit)
            );
            return right(res.data);
        } catch (e: any) {
            if (e.response) {
                return left({
                    status: e.response.status,
                    message: e.response.data,
                });
            }
            return left({
                status: e.status,
                message: e.message,
            });
        }
    }

    request<T>(): HTTP.PromiseResult<T> {
        if (this._engine === "fetch") {
            return this.requestWithFetch<T>();
        } else if (this._engine === "axios") {
            return this.requestWithAxios<T>();
        }
        throw new TypeError("use fetch or axios engine");
    }

    url(url?: string): HttpClient {
        if (url?.startsWith("http")) {
            this._url = url;
        } else {
            this._url = this._baseUrl + url;
        }
        return this;
    }

    addOptions(requestOptions: RequestInit): HttpClient {
        this._options.request = { ...this._options.request, ...requestOptions } as RequestInit;
        return this;
    }

    post<T>(body?: BodyInit): HTTP.PromiseResult<T> {
        this._options.request = {
            ...this._options.request,
            body,
            method: "post",
        } as RequestInit;
        return this.request<T>();
    }

    read<T>(query?: any): HTTP.PromiseResult<T> {
        this._url = this.buildQuery(query);
        this._options.request = { ...this._options.request, method: "get" };
        return this.request<T>();
    }
}
