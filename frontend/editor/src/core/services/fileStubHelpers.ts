import { ChronicleFile, ChronicleFileStub } from "@app/types/fileContext";
import {
  createChildStub,
  generateProcessedFileMetadata,
} from "@app/contexts/file/fileActions";
import { createChronicleFile } from "@app/types/fileContext";
import { ToolId } from "@app/types/toolId";

/**
 * Create ChronicleFiles and ChronicleFileStubs from exported files
 * Used when saving page editor changes to create version history
 */
export async function createChronicleFilesAndStubs(
  files: File[],
  parentStub: ChronicleFileStub,
  toolId: ToolId,
): Promise<{ ChronicleFiles: ChronicleFile[]; stubs: ChronicleFileStub[] }> {
  const ChronicleFiles: ChronicleFile[] = [];
  const stubs: ChronicleFileStub[] = [];

  for (const file of files) {
    const processedFileMetadata = await generateProcessedFileMetadata(file);
    const childStub = createChildStub(
      parentStub,
      { toolId, timestamp: Date.now() },
      file,
      processedFileMetadata?.thumbnailUrl,
      processedFileMetadata,
    );

    const ChronicleFile = createChronicleFile(file, childStub.id);
    ChronicleFiles.push(ChronicleFile);
    stubs.push(childStub);
  }

  return { ChronicleFiles, stubs };
}
