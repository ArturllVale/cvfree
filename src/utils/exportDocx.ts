import {
    Document,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    BorderStyle,
    TableRow,
    TableCell,
    Table,
    WidthType,
    Packer,
} from 'docx';
import { Curriculo } from '@/types/resume';

const nivelLabels: Record<string, string> = {
    ensino_medio: 'Ensino Médio',
    tecnico: 'Técnico',
    graduacao: 'Graduação',
    pos_graduacao: 'Pós-Graduação',
    mestrado: 'Mestrado',
    doutorado: 'Doutorado',
    outro: 'Outro',
};

const habilidadeNivelLabels: Record<string, string> = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

const habilidadeNivelColors: Record<string, string> = {
    basico: 'f59e0b',
    intermediario: '6366f1',
    avancado: '22c55e',
};

function formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes] = data.split('-');
    const meses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
    ];
    return `${meses[parseInt(mes, 10) - 1]}/${ano}`;
}

function criarSecaoTitulo(titulo: string): Paragraph {
    return new Paragraph({
        children: [
            new TextRun({
                text: titulo.toUpperCase(),
                bold: true,
                size: 24,
                color: '374151',
            }),
        ],
        spacing: { before: 300, after: 100 },
        border: {
            bottom: {
                color: '6366f1',
                space: 1,
                style: BorderStyle.SINGLE,
                size: 12,
            },
        },
    });
}

export async function gerarDocx(curriculo: Curriculo): Promise<Blob> {
    const { dadosPessoais, objetivo, formacoes, habilidades, experiencias } = curriculo;

    const children: Paragraph[] = [];

    // Nome
    if (dadosPessoais.nomeCompleto) {
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: dadosPessoais.nomeCompleto,
                        bold: true,
                        size: 44,
                        color: '111827',
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 300 },
            })
        );

        // Contato
        const contactItems = [
            dadosPessoais.email,
            dadosPessoais.telefone,
            [dadosPessoais.cidade, dadosPessoais.estado].filter(Boolean).join(' - '),
            dadosPessoais.linkedin,
            dadosPessoais.portfolio,
        ].filter(Boolean);

        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: contactItems.join(' | '),
                        size: 18,
                        color: '6b7280',
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                border: {
                    bottom: {
                        color: 'e5e7eb',
                        space: 1,
                        style: BorderStyle.SINGLE,
                        size: 12,
                    },
                },
            })
        );
    }

    // Objetivo
    if (objetivo.texto) {
        children.push(criarSecaoTitulo('Objetivo'));
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: objetivo.texto,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.JUSTIFIED,
            })
        );
    }

    // Experiência
    if (experiencias.length > 0) {
        children.push(criarSecaoTitulo('Experiência Profissional'));
        experiencias.forEach((exp) => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: exp.cargo,
                            bold: true,
                            size: 22,
                        }),
                        new TextRun({
                            text: ` - ${exp.empresa}`,
                            italics: true,
                            size: 20,
                            color: '6b7280',
                        }),
                    ],
                    spacing: { before: 150 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${formatarData(exp.dataInicio)} - ${exp.atual ? 'Atual' : formatarData(exp.dataFim || '')}`,
                            size: 18,
                            color: '6b7280',
                        }),
                    ],
                })
            );
            if (exp.descricao) {
                children.push(
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: exp.descricao,
                                size: 20,
                            }),
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: { after: 100 },
                    })
                );
            }
        });
    }

    // Formação
    if (formacoes.length > 0) {
        children.push(criarSecaoTitulo('Formação Acadêmica'));
        formacoes.forEach((formacao) => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: formacao.curso,
                            bold: true,
                            size: 22,
                        }),
                    ],
                    spacing: { before: 150 },
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${formacao.instituicao} (${nivelLabels[formacao.nivel]})`,
                            italics: true,
                            size: 20,
                            color: '6b7280',
                        }),
                    ],
                })
            );
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `${formatarData(formacao.dataInicio)} - ${formacao.emAndamento ? 'Em andamento' : formatarData(formacao.dataFim || '')}`,
                            size: 18,
                            color: '6b7280',
                        }),
                    ],
                    spacing: { after: 100 },
                })
            );
        });
    }

    // Habilidades
    if (habilidades.length > 0) {
        children.push(criarSecaoTitulo('Habilidades'));

        const habilidadesRuns: TextRun[] = [];
        habilidades.forEach((hab, index) => {
            // Nome da habilidade
            habilidadesRuns.push(
                new TextRun({
                    text: hab.nome,
                    size: 20,
                })
            );

            // Nível da habilidade (colorido)
            habilidadesRuns.push(
                new TextRun({
                    text: ` • ${habilidadeNivelLabels[hab.nivel]}`,
                    size: 18,
                    color: habilidadeNivelColors[hab.nivel],
                    bold: true,
                })
            );

            // Separador entre habilidades
            if (index < habilidades.length - 1) {
                habilidadesRuns.push(
                    new TextRun({
                        text: ' • ',
                        size: 20,
                    })
                );
            }
        });

        children.push(
            new Paragraph({
                children: habilidadesRuns,
            })
        );
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
}
