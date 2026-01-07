import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Svg,
    Path,
    Circle,
    Rect,
    Line as SvgLine,
    Polyline,
} from '@react-pdf/renderer';
import { Curriculo } from '@/types/resume';

// Registrar fontes
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
            fontWeight: 'normal',
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
            fontWeight: 'bold',
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
            fontStyle: 'italic',
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Roboto',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#374151',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'solid',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    contactRow: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 15,
    },
    contactItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    contactItem: {
        fontSize: 9,
        color: '#6b7280',
    },
    section: {
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        paddingBottom: 4,
        borderBottomWidth: 2,
        borderBottomColor: '#6366f1',
        borderBottomStyle: 'solid',
    },
    paragraph: {
        fontSize: 10,
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    itemContainer: {
        marginBottom: 10,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827',
    },
    itemSubtitle: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#6b7280',
    },
    itemDate: {
        fontSize: 9,
        color: '#6b7280',
    },
    itemDescription: {
        fontSize: 10,
        marginTop: 4,
        textAlign: 'justify',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 9,
    },
});

const MailIcon = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="2" y="4" width="20" height="16" rx="2" />
        <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
);

const PhoneIcon = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Svg>
);

const MapPinIcon = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <Circle cx="12" cy="10" r="3" />
    </Svg>
);

const LinkedinIcon = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <Rect x="2" y="9" width="4" height="12" />
        <Circle cx="4" cy="4" r="2" />
    </Svg>
);

const GlobeIcon = () => (
    <Svg width="10" height="10" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="10" />
        <SvgLine x1="2" x2="22" y1="12" y2="12" />
        <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Svg>
);

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
    basico: '#f59e0b',
    intermediario: '#6366f1',
    avancado: '#22c55e',
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

interface ResumePDFDocumentProps {
    curriculo: Curriculo;
}

export default function ResumePDFDocument({ curriculo }: ResumePDFDocumentProps) {
    const { dadosPessoais, objetivo, formacoes, habilidades, experiencias } = curriculo;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                {dadosPessoais.nomeCompleto && (
                    <View style={styles.header}>
                        <Text style={styles.name}>{dadosPessoais.nomeCompleto}</Text>
                        <View style={styles.contactRow}>
                            {dadosPessoais.email && (
                                <View style={styles.contactItemWrapper}>
                                    <MailIcon />
                                    <Text style={styles.contactItem}>
                                        {dadosPessoais.email}
                                    </Text>
                                </View>
                            )}
                            {dadosPessoais.telefone && (
                                <View style={styles.contactItemWrapper}>
                                    <PhoneIcon />
                                    <Text style={styles.contactItem}>
                                        {dadosPessoais.telefone}
                                    </Text>
                                </View>
                            )}
                            {(dadosPessoais.cidade || dadosPessoais.estado) && (
                                <View style={styles.contactItemWrapper}>
                                    <MapPinIcon />
                                    <Text style={styles.contactItem}>
                                        {[dadosPessoais.cidade, dadosPessoais.estado].filter(Boolean).join(' - ')}
                                    </Text>
                                </View>
                            )}
                            {dadosPessoais.linkedin && (
                                <View style={styles.contactItemWrapper}>
                                    <LinkedinIcon />
                                    <Text style={styles.contactItem}>
                                        {dadosPessoais.linkedin}
                                    </Text>
                                </View>
                            )}
                            {dadosPessoais.portfolio && (
                                <View style={styles.contactItemWrapper}>
                                    <GlobeIcon />
                                    <Text style={styles.contactItem}>
                                        {dadosPessoais.portfolio}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}

                {/* Objetivo */}
                {objetivo.texto && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Objetivo</Text>
                        <Text style={styles.paragraph}>{objetivo.texto}</Text>
                    </View>
                )}

                {/* Experiência */}
                {experiencias.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                        {experiencias.map((exp) => (
                            <View key={exp.id} style={styles.itemContainer}>
                                <View style={styles.itemHeader}>
                                    <View>
                                        <Text style={styles.itemTitle}>{exp.cargo}</Text>
                                        <Text style={styles.itemSubtitle}>{exp.empresa}</Text>
                                    </View>
                                    <Text style={styles.itemDate}>
                                        {formatarData(exp.dataInicio)} - {exp.atual ? 'Atual' : formatarData(exp.dataFim || '')}
                                    </Text>
                                </View>
                                {exp.descricao && (
                                    <Text style={styles.itemDescription}>{exp.descricao}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Formação */}
                {formacoes.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
                        {formacoes.map((formacao) => (
                            <View key={formacao.id} style={styles.itemContainer}>
                                <View style={styles.itemHeader}>
                                    <View>
                                        <Text style={styles.itemTitle}>{formacao.curso}</Text>
                                        <Text style={styles.itemSubtitle}>
                                            {formacao.instituicao} ({nivelLabels[formacao.nivel]})
                                        </Text>
                                    </View>
                                    <Text style={styles.itemDate}>
                                        {formatarData(formacao.dataInicio)} - {formacao.emAndamento ? 'Em andamento' : formatarData(formacao.dataFim || '')}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Habilidades */}
                {habilidades.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Habilidades</Text>
                        <View style={styles.skillsContainer}>
                            {habilidades.map((hab) => (
                                <View key={hab.id} style={styles.skillTag}>
                                    <Text style={{ fontSize: 9, color: '#374151' }}>
                                        {hab.nome}
                                    </Text>
                                    <Text style={{ fontSize: 8, color: habilidadeNivelColors[hab.nivel], marginLeft: 4 }}>
                                        • {habilidadeNivelLabels[hab.nivel]}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
}
