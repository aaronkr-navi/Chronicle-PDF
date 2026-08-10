/**
 * Type safety declarations to prevent file.name/UUID confusion
 */

import { FileId, ChronicleFile } from "@app/types/fileContext";

declare global {
  namespace FileIdSafety {
    // Mark functions that should never accept file.name as parameters
    type SafeFileIdFunction<T extends (...args: any[]) => any> = T extends (
      ...args: infer P
    ) => infer _R
      ? P extends readonly [string, ...any[]]
        ? never // Reject string parameters in first position for FileId functions
        : T
      : T;

    // Mark functions that should only accept ChronicleFile, not regular File
    type ChronicleFileOnlyFunction<T extends (...args: any[]) => any> =
      T extends (...args: infer P) => infer _R
        ? P extends readonly [File, ...any[]]
          ? never // Reject File parameters in first position for ChronicleFile functions
          : T
        : T;

    // Utility type to enforce ChronicleFile usage
    type RequireChronicleFile<T> = T extends File ? ChronicleFile : T;
  }

  // Extend Window interface for debugging
  interface Window {
    __FILE_ID_DEBUG?: boolean;
  }
}

// Augment FileContext types to prevent bypassing ChronicleFile
declare module "../contexts/FileContext" {
  export interface StrictFileContextActions {
    pinFile: (file: ChronicleFile) => void; // Must be ChronicleFile
    unpinFile: (file: ChronicleFile) => void; // Must be ChronicleFile
    addFiles: (
      files: File[],
      options?: { insertAfterPageId?: string },
    ) => Promise<ChronicleFile[]>; // Returns ChronicleFile
    consumeFiles: (
      inputFileIds: FileId[],
      outputFiles: File[],
    ) => Promise<ChronicleFile[]>; // Returns ChronicleFile
  }

  export interface StrictFileContextSelectors {
    getFile: (id: FileId) => ChronicleFile | undefined; // Returns ChronicleFile
    getFiles: (ids?: FileId[]) => ChronicleFile[]; // Returns ChronicleFile[]
    isFilePinned: (file: ChronicleFile) => boolean; // Must be ChronicleFile
  }
}

export {};
