declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | number[];
        filename?: string;
        image?: { type: string; quality: number };
        enableLinks?: boolean;
        html2canvas?: unknown;
        jsPDF?: unknown;
    }

    interface Html2PdfWorker {
        from(element: HTMLElement): Html2PdfWorker;
        set(options: Html2PdfOptions): Html2PdfWorker;
        save(): void;
        outputImg(type?: string): Promise<string>;
        outputPdf(type?: string): Promise<string>;
    }

    function html2pdf(): Html2PdfWorker;
    export default html2pdf;
}
