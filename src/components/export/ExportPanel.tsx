'use client';

import { FileDown } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

export default function ExportPanel() {
    const { curriculo } = useResume();

    const nomeArquivo = curriculo.dadosPessoais.nomeCompleto
        ? `curriculo-${curriculo.dadosPessoais.nomeCompleto.toLowerCase().replace(/\s+/g, '-')}`
        : 'meu-curriculo';

    const handlePrint = () => {
        const element = document.getElementById('resume-preview-content');
        if (!element) {
            alert('Erro: Componente de currículo não encontrado.');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Erro ao abrir nova janela. Verifique o bloqueador de popups.');
            return;
        }

        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));

        printWindow.document.write('<html><head><title>Currículo - ' + (curriculo.dadosPessoais.nomeCompleto || 'Completo') + '</title>');
        styles.forEach(style => {
            printWindow.document.write(style.outerHTML);
        });
        printWindow.document.write(`
            <style>
                body { background: white; margin: 0; padding: 0; }
                #resume-preview-content { 
                    margin: 0 !important; 
                    box-shadow: none !important; 
                    width: 100% !important;
                    min-height: 100vh !important;
                }
                @media print {
                    @page { margin: 0; size: auto; }
                    body { 
                        background: white; 
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact; 
                    }
                    #resume-preview-content { 
                        box-shadow: none;
                        -webkit-print-color-adjust: exact; 
                        print-color-adjust: exact;
                    }
                }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(element.outerHTML);
        printWindow.document.write('<script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); }</script>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
    };

    const temDados = curriculo.dadosPessoais.nomeCompleto;

    return (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileDown className="w-4 h-4 text-primary" />
                Exportar Currículo
            </h3>

            <div className="grid grid-cols-1 gap-3">
                <button
                    onClick={handlePrint}
                    disabled={!temDados}
                    className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FileDown className="w-4 h-4" />
                    Salvar PDF / Imprimir
                </button>
            </div>

            {!temDados && (
                <p className="text-xs text-muted mt-2">
                    Preencha ao menos seu nome para exportar.
                </p>
            )}
        </div>
    );
}


