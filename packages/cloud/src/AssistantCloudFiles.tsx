import { AssistantCloudAPI } from "./AssistantCloudAPI";

export type PdfToImagesRequestBody = {
  file_blob?: string | undefined;
  file_url?: string | undefined;
};

export type PdfToImagesResponse = {
  success: boolean;
  urls: string[];
  message: string;
};

export type GeneratePresignedUploadUrlRequestBody = {
  filename: string;
};

export type GeneratePresignedUploadUrlResponse = {
  success: boolean;
  signedUrl: string;
  expiresAt: string;
  publicUrl: string;
};

export class AssistantCloudFiles {
  constructor(private cloud: AssistantCloudAPI) {}

  public async pdfToImages(
    body: PdfToImagesRequestBody,
  ): Promise<PdfToImagesResponse> {
    return this.cloud.makeRequest("/files/pdf-to-images", {
      method: "POST",
      body,
    });
  }

  public async generatePresignedUploadUrl(
    body: GeneratePresignedUploadUrlRequestBody,
  ): Promise<GeneratePresignedUploadUrlResponse> {
    return this.cloud.makeRequest(
      "/files/attachments/generate-presigned-upload-url",
      {
        method: "POST",
        body,
      },
    );
  }
}
