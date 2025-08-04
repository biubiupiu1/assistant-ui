import { AssistantCloud } from "@assistant-ui/react";
import { useChatRuntime, UseChatRuntimeOptions } from "./useChatRuntime";

type UseCloudRuntimeOptions = UseChatRuntimeOptions & {
  cloud: AssistantCloud;
};

/**
 * @deprecated This is under active development and not yet ready for prod use.
 */
export const useCloudRuntime = (options: UseCloudRuntimeOptions) => {
  return useChatRuntime(options);
};
