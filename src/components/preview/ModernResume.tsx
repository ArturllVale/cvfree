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

// Removed habilidadeNivelLabels since it's not used in ModernResume (it uses progress bars)
// Wait, looking at the code, ModernResume does use loops for habilidades but the code for labels was:
// In the sidebar:
// width: hab.nivel === 'basico' ? '33%' : ...
// It does NOT use the text labels in the modern sidebar, only progress bars.
// Let's verify line 131 in original file. Yes.

interface ResumeProps {
    data: Curriculo;
}

export default function ModernResume({ data }: ResumeProps) {
    const { dadosPessoais, objetivo, formacoes, habilidades, experiencias } = data;

    return (
        <div className="w-full overflow-x-auto print:overflow-visible">
            <div
                id="resume-preview-content"
                className="resume-preview w-[210mm] aspect-[210/297] min-h-[297mm] bg-white text-black shadow-[0_25px_50px_-12px_#00000040] mx-auto flex print:shadow-none print:m-0 print:w-full print:min-h-screen overflow-hidden"
            >
                {/* Sidebar Esquerda */}
                <aside className="w-[35%] bg-[#1e293b] text-white p-6 flex flex-col gap-6">
                    {/* Foto e Nome */}
                    <div className="flex flex-col items-center text-center">
                        {dadosPessoais.foto && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={dadosPessoais.foto}
                                alt={dadosPessoais.nomeCompleto}
                                className="w-32 h-32 rounded-full object-cover border-4 border-[#475569] mb-4"
                            />
                        )}
                        <h1 className="font-bold uppercase tracking-wide mb-1 text-white print:text-white print:opacity-100">
                            {dadosPessoais.nomeCompleto}
                        </h1>
                    </div>

                    {/* Contato */}
                    <div className="space-y-3 text-sm print:text-white">
                        <h3 className="font-bold border-b border-[#475569] pb-1 mb-2 uppercase tracking-wider text-xs text-[#94a3b8] print:text-gray-300 print:border-gray-500">Contato</h3>
                        {dadosPessoais.email && (
                            <div className="flex items-start break-all">
                                <Mail className="w-4 h-4 shrink-0 mr-3 mt-[3px]" />
                                <span className="text-white print:text-white">{dadosPessoais.email}</span>
                            </div>
                        )}
                        {dadosPessoais.telefone && (
                            <div className="flex items-start">
                                <Phone className="w-4 h-4 shrink-0 mr-3 mt-[3px]" />
                                <span className="text-white print:text-white">{dadosPessoais.telefone}</span>
                            </div>
                        )}
                        {(dadosPessoais.cidade || dadosPessoais.estado) && (
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 shrink-0 mr-3 mt-[3px]" />
                                <span className="text-white print:text-white">{[dadosPessoais.cidade, dadosPessoais.estado].filter(Boolean).join(' - ')}</span>
                            </div>
                        )}
                        {dadosPessoais.linkedin && (
                            <div className="flex items-start break-all">
                                <Linkedin className="w-4 h-4 shrink-0 mr-3 mt-[3px]" />
                                <span className="text-white print:text-white">{dadosPessoais.linkedin.replace(/^https?:\/\//, '')}</span>
                            </div>
                        )}
                        {dadosPessoais.portfolio && (
                            <div className="flex items-start break-all">
                                <Globe className="w-4 h-4 shrink-0 mr-3 mt-[3px]" />
                                <span className="text-white print:text-white">{dadosPessoais.portfolio.replace(/^https?:\/\//, '')}</span>
                            </div>
                        )}
                    </div>

                    {/* Habilidades Sidebar */}
                    {habilidades.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-bold border-b border-[#475569] pb-1 mb-2 uppercase tracking-wider text-xs text-[#94a3b8]">Habilidades</h3>
                            <div className="flex flex-col gap-2">
                                {habilidades.map((hab) => (
                                    <div key={hab.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{hab.nome}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#334155] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white/80"
                                                style={{
                                                    width: hab.nivel === 'basico' ? '33%' : hab.nivel === 'intermediario' ? '66%' : '100%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                {/* Conteúdo Principal */}
                <main className="flex-1 p-4 flex flex-col gap-6">
                    {/* Objetivo */}
                    {objetivo.texto && (
                        <section>
                            <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-3 flex items-center">
                                <span className="w-8 h-1 bg-[#1e293b] block mr-2"></span>
                                Objetivo
                            </h2>
                            <p className="text-gray-700 text-justify leading-relaxed">
                                {objetivo.texto}
                            </p>
                        </section>
                    )}

                    {/* Experiência */}
                    {experiencias.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-4 flex items-center">
                                <span className="w-8 h-1 bg-[#1e293b] block mr-2"></span>
                                Experiência
                            </h2>
                            <div className="space-y-6">
                                {experiencias.map((exp) => (
                                    <div key={exp.id}>
                                        <h3 className="font-bold text-lg text-[#0f172a]">{exp.cargo}</h3>
                                        <div className="flex justify-between items-center text-[#475569] mb-2 font-medium">
                                            <span>{exp.empresa}</span>
                                            <span className="text-sm bg-[#f1f5f9] px-2 py-0.5 rounded">
                                                {formatarData(exp.dataInicio)} – {exp.atual ? 'Atual' : formatarData(exp.dataFim || '')}
                                            </span>
                                        </div>
                                        {exp.descricao && (
                                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line border-l-2 border-[#e2e8f0] pl-3">
                                                {exp.descricao}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Formação */}
                    {formacoes.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-widest mb-4 flex items-center">
                                <span className="w-8 h-1 bg-[#1e293b] block mr-2"></span>
                                Educação
                            </h2>
                            <div className="space-y-4">
                                {formacoes.map((formacao) => (
                                    <div key={formacao.id} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-[#0f172a]">{formacao.curso}</h3>
                                            <p className="text-[#475569]">{formacao.instituicao}</p>
                                            <span className="text-xs text-[#64748b] uppercase font-semibold tracking-wider">{nivelLabels[formacao.nivel]}</span>
                                        </div>
                                        <span className="text-sm font-medium text-[#64748b] whitespace-nowrap bg-[#f8fafc] px-2 py-1 rounded">
                                            {formatarData(formacao.dataInicio)} – {formacao.emAndamento ? 'Cursando' : formatarData(formacao.dataFim || '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
