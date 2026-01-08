'use client';

import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { useState, memo } from 'react';
import { Experiencia } from '@/types/resume';

interface ExperienceItemProps {
    experiencia: Experiencia;
    atualizarExperiencia: (id: string, experiencia: Partial<Experiencia>) => void;
    removerExperiencia: (id: string) => void;
}

// Memoized component to prevent re-rendering all experience items when one is updated.
// Reduces re-renders from O(N) to O(1) per keystroke.
const ExperienceItem = memo(function ExperienceItem({ experiencia, atualizarExperiencia, removerExperiencia }: ExperienceItemProps) {
    return (
        <div className="bg-secondary rounded-lg p-4 animate-slide-in">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            className="input-field text-sm"
                            placeholder="Empresa"
                            value={experiencia.empresa}
                            onChange={(e) =>
                                atualizarExperiencia(experiencia.id, { empresa: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            className="input-field text-sm"
                            placeholder="Cargo"
                            value={experiencia.cargo}
                            onChange={(e) =>
                                atualizarExperiencia(experiencia.id, { cargo: e.target.value })
                            }
                        />
                    </div>
                    <textarea
                        className="input-field textarea-field text-sm w-full"
                        placeholder="Descreva suas principais atividades e conquistas..."
                        rows={3}
                        value={experiencia.descricao}
                        onChange={(e) =>
                            atualizarExperiencia(experiencia.id, { descricao: e.target.value })
                        }
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <input
                            type="month"
                            className="input-field text-sm"
                            value={experiencia.dataInicio}
                            onChange={(e) =>
                                atualizarExperiencia(experiencia.id, { dataInicio: e.target.value })
                            }
                        />
                        <input
                            type="month"
                            className="input-field text-sm"
                            disabled={experiencia.atual}
                            value={experiencia.dataFim || ''}
                            onChange={(e) =>
                                atualizarExperiencia(experiencia.id, { dataFim: e.target.value })
                            }
                        />
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={experiencia.atual}
                                onChange={(e) =>
                                    atualizarExperiencia(experiencia.id, {
                                        atual: e.target.checked,
                                        dataFim: e.target.checked ? undefined : experiencia.dataFim,
                                    })
                                }
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            Emprego atual
                        </label>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => removerExperiencia(experiencia.id)}
                    className="btn btn-icon btn-ghost text-danger"
                    aria-label="Remover experiência"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
});

export default function ExperienciaSection() {
    const { curriculo, adicionarExperiencia, removerExperiencia, atualizarExperiencia } = useResume();
    const { experiencias } = curriculo;

    const [novaExperiencia, setNovaExperiencia] = useState<Omit<Experiencia, 'id'>>({
        empresa: '',
        cargo: '',
        descricao: '',
        dataInicio: '',
        dataFim: '',
        atual: false,
    });

    const handleAdicionar = () => {
        if (novaExperiencia.empresa && novaExperiencia.cargo) {
            adicionarExperiencia(novaExperiencia);
            setNovaExperiencia({
                empresa: '',
                cargo: '',
                descricao: '',
                dataInicio: '',
                dataFim: '',
                atual: false,
            });
        }
    };

    return (
        <SectionWrapper
            title="Experiência Profissional"
            icon={<Briefcase className="w-5 h-5 text-primary" />}
            defaultOpen={true}
            badge={experiencias.length > 0 ? `${experiencias.length}` : undefined}
        >
            <div className="space-y-4">
                {/* Info para quem não tem experiência */}
                {experiencias.length === 0 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
                        <p className="font-medium text-accent mb-1">💡 Primeira experiência?</p>
                        <p className="text-muted">
                            Se você ainda não tem experiência formal, pode incluir estágios, trabalhos voluntários,
                            projetos acadêmicos ou atividades extracurriculares relevantes.
                        </p>
                    </div>
                )}

                {/* Lista de experiências */}
                {experiencias.length > 0 && (
                    <div className="space-y-3">
                        {experiencias.map((experiencia) => (
                            <ExperienceItem
                                key={experiencia.id}
                                experiencia={experiencia}
                                atualizarExperiencia={atualizarExperiencia}
                                removerExperiencia={removerExperiencia}
                            />
                        ))}
                    </div>
                )}

                {/* Adicionar nova experiência */}
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-3">Adicionar Experiência</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Nome da empresa"
                            value={novaExperiencia.empresa}
                            onChange={(e) =>
                                setNovaExperiencia((prev) => ({ ...prev, empresa: e.target.value }))
                            }
                        />
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Cargo ocupado"
                            value={novaExperiencia.cargo}
                            onChange={(e) =>
                                setNovaExperiencia((prev) => ({ ...prev, cargo: e.target.value }))
                            }
                        />
                    </div>
                    <textarea
                        className="input-field textarea-field mb-3 w-full"
                        placeholder="Descreva suas principais atividades e conquistas..."
                        rows={3}
                        value={novaExperiencia.descricao}
                        onChange={(e) =>
                            setNovaExperiencia((prev) => ({ ...prev, descricao: e.target.value }))
                        }
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                        <input
                            type="month"
                            className="input-field"
                            placeholder="Início"
                            value={novaExperiencia.dataInicio}
                            onChange={(e) =>
                                setNovaExperiencia((prev) => ({ ...prev, dataInicio: e.target.value }))
                            }
                        />
                        <input
                            type="month"
                            className="input-field"
                            placeholder="Fim"
                            disabled={novaExperiencia.atual}
                            value={novaExperiencia.dataFim || ''}
                            onChange={(e) =>
                                setNovaExperiencia((prev) => ({ ...prev, dataFim: e.target.value }))
                            }
                        />
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={novaExperiencia.atual}
                                onChange={(e) =>
                                    setNovaExperiencia((prev) => ({
                                        ...prev,
                                        atual: e.target.checked,
                                        dataFim: e.target.checked ? undefined : prev.dataFim,
                                    }))
                                }
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            Emprego atual
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={handleAdicionar}
                        disabled={!novaExperiencia.empresa || !novaExperiencia.cargo}
                        className="btn btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar Experiência
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
}
