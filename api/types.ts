export interface ApiRequest {
    headers: Record<string, string | string[] | undefined>;
    query: Record<string, string | string[] | undefined>;
}

export interface ApiResponse {
    status(code: number): ApiResponse;
    send(body: string): void;
    redirect(url: string): void;
    setHeader(name: string, value: string): void;
}

export type ApiHandler = (req: ApiRequest, res: ApiResponse) => Promise<void> | void;
