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
  method?: "GET" | "POST" | "PUT" | "DELETE";
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
  "/threads":
    | {
        method: "GET";
        query?: AssistantCloudThreadsListQuery;
        response: AssistantCloudThreadsListResponse;
      }
    | {
        method: "POST";
        body: AssistantCloudThreadsCreateBody;
        response: AssistantCloudThreadsCreateResponse;
      };
  "/runs/stream": {
    method: "POST";
    body: AssistantCloudRunsStreamBody;
    response: Response;
  };
} & {
  [K in `/threads/${string}`]: K extends `/threads/${string}/messages`
    ?
        | {
            method: "GET";
            response: AssistantCloudThreadMessageListResponse;
          }
        | {
            method: "POST";
            body: AssistantCloudThreadMessageCreateBody;
            response: AssistantCloudMessageCreateResponse;
          }
    :
        | {
            method: "PUT";
            body: AssistantCloudThreadsUpdateBody;
            response: void;
          }
        | {
            method: "DELETE";
            response: void;
          };
};

export type AssistantCloudConfig = {
  makeRequest: MakeRequest;
  makeRawRequest?: MakeRawRequest;
};

export class AssistantCloudAPI {
  private readonly makeRequestImpl: MakeRequest;
  private readonly makeRawRequestImpl: MakeRawRequest | undefined;

  constructor(config: AssistantCloudConfig) {
    this.makeRequestImpl = config.makeRequest;
    this.makeRawRequestImpl = config.makeRawRequest;
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
}
