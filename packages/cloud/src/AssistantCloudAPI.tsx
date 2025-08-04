import type { AssistantCloudAuthTokensCreateResponse } from "./AssistantCloudAuthTokens";
import type {
  PdfToImagesRequestBody,
  PdfToImagesResponse,
  GeneratePresignedUploadUrlRequestBody,
  GeneratePresignedUploadUrlResponse,
} from "./AssistantCloudFiles";
import type {
  AssistantCloudThreadMessageListResponse,
  AssistantCloudThreadMessageCreateBody,
  AssistantCloudMessageCreateResponse,
} from "./AssistantCloudThreadMessages";
import type {
  AssistantCloudThreadsListQuery,
  AssistantCloudThreadsListResponse,
  AssistantCloudThreadsCreateBody,
  AssistantCloudThreadsCreateResponse,
  AssistantCloudThreadsUpdateBody,
} from "./AssistantCloudThreads";
import type { AssistantCloudRunsStreamBody } from "./AssistantCloudRuns";

export type MakeRequestOptions = {
  method?: "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
  body?: object;
};

export type MakeRequest = (
  endpoint: string,
  options?: MakeRequestOptions,
) => Promise<any>;

export type MakeRawRequest = (
  endpoint: string,
  options?: MakeRequestOptions,
) => Promise<Response>;

export type MakeRequestAPI = {
  "/auth/tokens": {
    method: "POST";
    response: AssistantCloudAuthTokensCreateResponse;
  };
  "/files/pdf-to-images": {
    method: "POST";
    body: PdfToImagesRequestBody;
    response: PdfToImagesResponse;
  };
  "/files/attachments/generate-presigned-upload-url": {
    method: "POST";
    body: GeneratePresignedUploadUrlRequestBody;
    response: GeneratePresignedUploadUrlResponse;
  };
  "/threads#list": {
    query?: AssistantCloudThreadsListQuery;
    response: AssistantCloudThreadsListResponse;
  };
  "/threads#create": {
    body: AssistantCloudThreadsCreateBody;
    response: AssistantCloudThreadsCreateResponse;
  };
  [k1: `/threads/${string}#update`]: {
    body: AssistantCloudThreadsUpdateBody;
    response: void;
  };
  [k2: `/threads/${string}#delete`]: {
    response: void;
  };
  [k3: `/threads/${string}/messages#list`]: {
    response: AssistantCloudThreadMessageListResponse;
  };
  [k4: `/threads/${string}/messages#create`]: {
    body: AssistantCloudThreadMessageCreateBody;
    response: AssistantCloudMessageCreateResponse;
  };
};

export type MakeRawRequestAPI = {
  "/runs/stream": {
    method: "POST";
    body: AssistantCloudRunsStreamBody;
    response: Response;
  };
};

export type AssistantCloudConfig = {
  makeRequest: MakeRequest;
  makeRawRequest?: MakeRawRequest;
  getAssistantOptions?: (assistantId: string) => {
    api: string;
    headers?: () => Promise<Record<string, string>>;
    body?: object;
  };
};

export class AssistantCloudAPI {
  private readonly makeRequestImpl: MakeRequest;
  private readonly makeRawRequestImpl: MakeRawRequest | undefined;
  private readonly getAssistantOptionsImpl:
    | ((assistantId: string) => {
        api: string;
        headers?: () => Promise<Record<string, string>>;
        body?: object;
      })
    | undefined;

  constructor(config: AssistantCloudConfig) {
    this.makeRequestImpl = config.makeRequest;
    this.makeRawRequestImpl = config.makeRawRequest;
    this.getAssistantOptionsImpl = config.getAssistantOptions;
  }

  public async makeRequest(
    endpoint: string,
    options: MakeRequestOptions = {},
  ) {
    return this.makeRequestImpl(endpoint, options);
  }

  public async makeRawRequest(
    endpoint: string,
    options: MakeRequestOptions = {},
  ) {
    if (!this.makeRawRequestImpl)
      throw new Error("makeRawRequest is not configured");
    return this.makeRawRequestImpl(endpoint, options);
  }

  public getAssistantOptions(assistantId: string) {
    if (!this.getAssistantOptionsImpl)
      throw new Error("getAssistantOptions is not configured");
    return this.getAssistantOptionsImpl(assistantId);
  }
}
