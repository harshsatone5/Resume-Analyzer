declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: Record<string, any>;
    jsPDF?: { unit?: string; format?: string; orientation?: string };
    pagebreak?: { mode?: string | string[]; before?: string; after?: string; avoid?: string };
  }

  interface Html2PdfWorker {
    from(element: HTMLElement | string): Html2PdfWorker;
    set(options: Html2PdfOptions): Html2PdfWorker;
    save(): Promise<void>;
    outputPdf(type?: string): Promise<any>;
    toPdf(): Html2PdfWorker;
    get(type: string): Promise<any>;
  }

  function html2pdf(): Html2PdfWorker;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2PdfWorker;

  export default html2pdf;
}
