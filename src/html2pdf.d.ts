// src/types/html2pdf.d.ts
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale?: number; useCORS?: boolean; logging?: boolean } & Record<string, unknown>;
    jsPDF?: { unit?: string; format?: string; orientation?: string } & Record<string, unknown>;
  }

  interface Html2PdfWorker {
    from(element: HTMLElement | string): Html2PdfWorker;
    set(options: Html2PdfOptions): Html2PdfWorker;
    save(): Promise<void>;
  }

  export default function html2pdf(element?: HTMLElement | string, options?: Html2PdfOptions): Html2PdfWorker;
}