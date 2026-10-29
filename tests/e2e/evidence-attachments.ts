import { writeFile } from "node:fs/promises";
import type { TestInfo } from "@playwright/test";

// Persist evidence before attaching it so passing Actions ZIPs contain the file.
export async function attachEvidence(testInfo: TestInfo, name: string, body: string | Buffer, contentType = "application/json") {
  const extension = contentType === "image/png" ? "png" : contentType === "text/plain" ? "txt" : "json";
  const path = testInfo.outputPath(`${name}.${extension}`);
  await writeFile(path, body);
  await testInfo.attach(name, { path, contentType });
  return path;
}
