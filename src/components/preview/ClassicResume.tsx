import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import { Curriculo } from '@/types/resume';
import { formatarData } from '@/lib/utils';

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

interface ResumeProps {
    data: Curriculo;
}

export default function ClassicResume({ data }: ResumeProps) {
    const { dadosPessoais, objetivo, formacoes, habilidades, experiencias } = data;

    return (
        <div className="w-full overflow-x-auto print:overflow-visible">
            <div
                id="resume-preview-content"
                className="resume-preview w-[210mm] min-h-[296mm] bg-white text-black p-[2mm] shadow-[0_25px_50px_-12px_#00000040] mx-auto flex flex-col gap-6 print:shadow-none print:m-0 print:w-full print:h-auto box-border overflow-hidden"
            >
                {/* Cabeçalho com dados pessoais */}
                {dadosPessoais.nomeCompleto && (
                    <header className="flex flex-col items-center border-b-2 border-[#1f2937] pb-6">
                        {dadosPessoais.foto && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={dadosPessoais.foto}
                                alt={dadosPessoais.nomeCompleto}
                                className="w-32 h-32 rounded-full object-cover border-4 border-[#f3f4f6] shadow-[0_4px_6px_-1px_#0000001a] mb-4"
                            />
                        )}

                        <h1 className="text-4xl font-bold text-[#111827] mb-3 uppercase tracking-wide text-center">
                            {dadosPessoais.nomeCompleto}
                        </h1>

                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#4b5563] mt-2">
                            {dadosPessoais.email && (
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 shrink-0 mr-2 mt-[6px]" />
                                    <span>{dadosPessoais.email}</span>
                                </div>
                            )}

                            {dadosPessoais.telefone && (
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 shrink-0 mr-2 mt-[2px]" />
                                    <span>{dadosPessoais.telefone}</span>
                                </div>
                            )}

                            {(dadosPessoais.cidade || dadosPessoais.estado) && (
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 shrink-0 mr-2 mt-[2px]" />
                                    <span>
                                        {[dadosPessoais.cidade, dadosPessoais.estado].filter(Boolean).join(" - ")}
                                    </span>
                                </div>
                            )}

                            {dadosPessoais.linkedin && (
                                <div className="flex items-center">
                                    <Linkedin className="w-4 h-4 shrink-0 mr-2 mt-[2px]" />
                                    <span>{dadosPessoais.linkedin}</span>
                                </div>
                            )}

                            {dadosPessoais.portfolio && (
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 shrink-0 mr-2 mt-[2px]" />
                                    <span>{dadosPessoais.portfolio}</span>
                                </div>
                            )}
                        </div>
                    </header>
                )}

                <div className="flex-1 space-y-6">
                    {/* Objetivo */}
                    {objetivo.texto && (
                        <section>
                            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider border-l-4 border-[#111827] pl-4 mb-4 py-4">
                                Objetivo
                            </h2>
                            <p className="text-[#374151] leading-relaxed text-justify">
                                {objetivo.texto}
                            </p>
                        </section>
                    )}

                    {/* Experiência Profissional */}
                    {experiencias.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider border-l-4 border-[#111827] pl-4 mb-5">
                                Experiência Profissional
                            </h2>
                            <div className="space-y-4">
                                {experiencias.map((exp) => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-[#e5e7eb]">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#9ca3af]" />
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-bold text-[#4f46e5] text-[18px]">{exp.cargo}</span>
                                            <span className="text-sm font-medium text-[#6b7280] whitespace-nowrap">
                                                {formatarData(exp.dataInicio)} – {exp.atual ? 'Atualmente' : formatarData(exp.dataFim || '')}
                                            </span>
                                        </div>
                                        <div className="text-[#374151] font-medium mb-1">{exp.empresa}</div>
                                        {exp.descricao && (
                                            <p className="text-[#4b5563] text-sm leading-relaxed whitespace-pre-line">
                                                {exp.descricao}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Formação Acadêmica */}
                    {formacoes.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider border-l-4 border-[#111827] pl-4 mb-5">
                                Formação Acadêmica
                            </h2>
                            <div className="space-y-3">
                                {formacoes.map((formacao) => (
                                    <div key={formacao.id} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-[#1f2937]">{formacao.curso}</h3>
                                            <p className="text-[#4b5563]">
                                                {formacao.instituicao}
                                                <span className="text-[#9ca3af] mx-2">|</span>
                                                <span className="text-sm text-[#6b7280]">{nivelLabels[formacao.nivel]}</span>
                                            </p>
                                        </div>
                                        <span className="text-sm text-[#6b7280] whitespace-nowrap mt-1">
                                            {formatarData(formacao.dataInicio)} – {formacao.emAndamento ? 'Cursando' : formatarData(formacao.dataFim || '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Habilidades */}
                    {habilidades.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-[#111827] uppercase tracking-wider border-l-4 border-[#111827] pl-4 mb-5">
                                Habilidades
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {habilidades.map((hab) => (
                                    <div
                                        key={hab.id}
                                        className="flex items-center rounded bg-[#f3f4f6] border border-[#e5e7eb] px-3 py-1.5"
                                    >
                                        <span className="font-medium text-[#1f2937]">{hab.nome}</span>
                                        <div className="h-4 w-px bg-[#d1d5db] mx-2" />
                                        <span
                                            className="text-xs font-semibold uppercase tracking-tight"
                                            style={{
                                                color: hab.nivel === 'basico' ? '#d97706' :
                                                    hab.nivel === 'intermediario' ? '#4f46e5' :
                                                        '#16a34a'
                                            }}
                                        >
                                            {habilidadeNivelLabels[hab.nivel]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
