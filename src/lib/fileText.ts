export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf") || file.type === "application/pdf") {
    return extractFromPdf(file);
  }

  if (
    name.endsWith(".docx") ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return extractFromDocx(file);
  }

  if (
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    file.type === "text/plain" ||
    file.type === "text/markdown"
  ) {
    return file.text();
  }

  throw new Error(
    "Unsupported file type. Upload a PDF, DOCX, TXT, or MD resume."
  );
}

async function extractFromPdf(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const buffer = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buffer }).promise;

  const pageTexts: string[] = [];
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();

    let lastY: number | null = null;
    let lastLineEndX: number | null = null;
    let line = "";
    const lines: string[] = [];
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const x = item.transform[4];
      const y = item.transform[5];
      const width = "width" in item ? item.width : 0;

      if (lastY !== null && Math.abs(y - lastY) > 2) {
        lines.push(line);
        line = "";
        lastLineEndX = null;
      } else if (lastLineEndX !== null && x - lastLineEndX > 1) {
        line += " ";
      }

      line += item.str;
      lastY = y;
      lastLineEndX = x + width;
    }
    if (line) lines.push(line);
    pageTexts.push(lines.join("\n"));
  }

  return pageTexts.join("\n\n");
}

async function extractFromDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}
