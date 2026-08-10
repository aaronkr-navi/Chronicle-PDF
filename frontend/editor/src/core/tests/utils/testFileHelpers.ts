/**
 * Test utilities for creating ChronicleFile objects in tests
 */

import { ChronicleFile, createChronicleFile } from "@app/types/fileContext";

/**
 * Create a ChronicleFile object for testing purposes
 */
export function createTestChronicleFile(
  name: string,
  content: string = "test content",
  type: string = "application/pdf",
): ChronicleFile {
  const file = new File([content], name, { type });
  return createChronicleFile(file);
}

/**
 * Create multiple ChronicleFile objects for testing
 */
export function createTestFilesWithId(
  files: Array<{ name: string; content?: string; type?: string }>,
): ChronicleFile[] {
  return files.map(
    ({ name, content = "test content", type = "application/pdf" }) =>
      createTestChronicleFile(name, content, type),
  );
}
