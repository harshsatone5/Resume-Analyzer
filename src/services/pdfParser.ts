import * as pdfjsLib from 'pdfjs-dist';

// Set worker source to CDN matching pdfjs-dist version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ExtractedPDFResult {
  text: string;
  pageCount: number;
}

export async function extractTextFromPDF(file: File): Promise<ExtractedPDFResult> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const pageCount = pdf.numPages;

  let fullText = '';

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    // Group text items by line height to preserve paragraphs and bullet points
    let lastY: number | null = null;
    let pageText = '';

    for (const item of textContent.items as any[]) {
      if ('str' in item) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
          pageText += '\n';
        }
        pageText += item.str + ' ';
        lastY = item.transform[5];
      }
    }

    fullText += pageText + '\n\n';
  }

  return {
    text: fullText.trim(),
    pageCount
  };
}
