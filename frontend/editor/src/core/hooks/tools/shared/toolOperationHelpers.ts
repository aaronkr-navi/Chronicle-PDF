import {
  ChronicleFile,
  FileId,
  ChronicleFileStub,
  createChronicleFile,
  ProcessedFileMetadata,
  createNewChronicleFileStub,
} from "@app/types/fileContext";

/**
 * Builds parallel inputFileIds and inputChronicleFileStubs arrays from the valid input files.
 * Falls back to a fresh stub when the file is not found in the current context state
 * (e.g. it was removed between operation start and this point).
 */
export function buildInputTracking(
  validFiles: ChronicleFile[],
  selectors: {
    getChronicleFileStub: (id: FileId) => ChronicleFileStub | undefined;
  },
): { inputFileIds: FileId[]; inputChronicleFileStubs: ChronicleFileStub[] } {
  const inputFileIds: FileId[] = [];
  const inputChronicleFileStubs: ChronicleFileStub[] = [];
  for (const file of validFiles) {
    const fileId = file.fileId;
    const record = selectors.getChronicleFileStub(fileId);
    if (record) {
      inputFileIds.push(fileId);
      inputChronicleFileStubs.push(record);
    } else {
      console.debug(`No file stub found for file: ${file.name}`);
      inputFileIds.push(fileId);
      inputChronicleFileStubs.push(createNewChronicleFileStub(file, fileId));
    }
  }
  return { inputFileIds, inputChronicleFileStubs };
}

/**
 * Creates parallel outputChronicleFileStubs and outputChronicleFiles arrays from processed files.
 * The stubFactory determines how each stub is constructed (child version vs fresh root).
 */
export function buildOutputPairs(
  processedFiles: File[],
  thumbnails: string[],
  metadataArray: Array<ProcessedFileMetadata | undefined>,
  stubFactory: (
    file: File,
    thumbnail: string,
    metadata: ProcessedFileMetadata | undefined,
    index: number,
  ) => ChronicleFileStub,
): {
  outputChronicleFileStubs: ChronicleFileStub[];
  outputChronicleFiles: ChronicleFile[];
} {
  const outputChronicleFileStubs = processedFiles.map((file, index) =>
    stubFactory(file, thumbnails[index], metadataArray[index], index),
  );
  const outputChronicleFiles = processedFiles.map((file, index) =>
    createChronicleFile(file, outputChronicleFileStubs[index].id),
  );
  return { outputChronicleFileStubs, outputChronicleFiles };
}
