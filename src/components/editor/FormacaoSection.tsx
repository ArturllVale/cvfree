'use client';

import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { useState } from 'react';
import { Formacao } from '@/types/resume';

const niveisFormacao = [
    { value: 'ensino_medio', label: 'Ensino Médio' },
    { value: 'tecnico', label: 'Técnico' },
    { value: 'graduacao', label: 'Graduação' },
    { value: 'pos_graduacao', label: 'Pós-Graduação' },
    { value: 'mestrado', label: 'Mestrado' },
    { value: 'doutorado', label: 'Doutorado' },
    { value: 'outro', label: 'Outro' },
] as const;

export default function FormacaoSection() {
    const { curriculo, adicionarFormacao, removerFormacao, atualizarFormacao } = useResume();
    const { formacoes } = curriculo;

    const [novaFormacao, setNovaFormacao] = useState<Omit<Formacao, 'id'>>({
        instituicao: '',
        curso: '',
        nivel: 'graduacao',
        dataInicio: '',
        dataFim: '',
        emAndamento: false,
    });

    const handleAdicionar = () => {
        if (novaFormacao.instituicao && novaFormacao.curso) {
            adicionarFormacao(novaFormacao);
            setNovaFormacao({
                instituicao: '',
                curso: '',
                nivel: 'graduacao',
                dataInicio: '',
                dataFim: '',
                emAndamento: false,
            });
        }
    };

    return (
        <SectionWrapper
            title="Formação Acadêmica"
            icon={<GraduationCap className="w-5 h-5 text-primary" />}
            defaultOpen={true}
            badge={formacoes.length > 0 ? `${formacoes.length}` : undefined}
        >
            <div className="space-y-4">
                {/* Lista de formações */}
                {formacoes.length > 0 && (
                    <div className="space-y-3">
                        {formacoes.map((formacao) => (
                            <div
                                key={formacao.id}
                                className="bg-secondary rounded-lg p-4 animate-slide-in"
                            >
                                <div className="flex items-start justify-between flex-col gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                name={`instituicao-${formacao.id}`}
                                                className="input-field text-sm"
                                                placeholder="Instituição"
                                                value={formacao.instituicao}
                                                onChange={(e) =>
                                                    atualizarFormacao(formacao.id, { instituicao: e.target.value })
                                                }
                                            />
                                            <input
                                                type="text"
                                                name={`curso-${formacao.id}`}
                                                className="input-field text-sm"
                                                placeholder="Curso"
                                                value={formacao.curso}
                                                onChange={(e) =>
                                                    atualizarFormacao(formacao.id, { curso: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <select
                                                name={`nivel-${formacao.id}`}
                                                className="input-field select-field text-sm"
                                                value={formacao.nivel}
                                                aria-label="Nível da formação"
                                                onChange={(e) =>
                                                    atualizarFormacao(formacao.id, {
                                                        nivel: e.target.value as Formacao['nivel'],
                                                    })
                                                }
                                            >
                                                {niveisFormacao.map((nivel) => (
                                                    <option key={nivel.value} value={nivel.value}>
                                                        {nivel.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="month"
                                                name={`dataInicio-${formacao.id}`}
                                                className="input-field text-sm"
                                                value={formacao.dataInicio}
                                                onChange={(e) =>
                                                    atualizarFormacao(formacao.id, { dataInicio: e.target.value })
                                                }
                                            />
                                            <input
                                                type="month"
                                                name={`dataFim-${formacao.id}`}
                                                className="input-field text-sm"
                                                disabled={formacao.emAndamento}
                                                value={formacao.dataFim || ''}
                                                onChange={(e) =>
                                                    atualizarFormacao(formacao.id, { dataFim: e.target.value })
                                                }
                                            />
                                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name={`emAndamento-${formacao.id}`}
                                                    checked={formacao.emAndamento}
                                                    onChange={(e) =>
                                                        atualizarFormacao(formacao.id, {
                                                            emAndamento: e.target.checked,
                                                            dataFim: e.target.checked ? undefined : formacao.dataFim,
                                                        })
                                                    }
                                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                                />
                                                Em andamento
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removerFormacao(formacao.id)}
                                        className="btn btn-icon btn-ghost text-danger"
                                        aria-label="Remover formação"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Adicionar nova formação */}
                <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-3">Adicionar Formação</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                            type="text"
                            name="new_instituicao"
                            className="input-field"
                            placeholder="Instituição de ensino"
                            value={novaFormacao.instituicao}
                            onChange={(e) =>
                                setNovaFormacao((prev) => ({ ...prev, instituicao: e.target.value }))
                            }
                        />
                        <input
                            type="text"
                            name="new_curso"
                            className="input-field"
                            placeholder="Nome do curso"
                            value={novaFormacao.curso}
                            onChange={(e) =>
                                setNovaFormacao((prev) => ({ ...prev, curso: e.target.value }))
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        <select
                            name="new_nivel"
                            className="input-field select-field"
                            value={novaFormacao.nivel}
                            aria-label="Nível da nova formação"
                            onChange={(e) =>
                                setNovaFormacao((prev) => ({
                                    ...prev,
                                    nivel: e.target.value as Formacao['nivel'],
                                }))
                            }
                        >
                            {niveisFormacao.map((nivel) => (
                                <option key={nivel.value} value={nivel.value}>
                                    {nivel.label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="month"
                            name="new_dataInicio"
                            className="input-field"
                            placeholder="Início"
                            value={novaFormacao.dataInicio}
                            onChange={(e) =>
                                setNovaFormacao((prev) => ({ ...prev, dataInicio: e.target.value }))
                            }
                        />
                        <input
                            type="month"
                            name="new_dataFim"
                            className="input-field"
                            placeholder="Fim"
                            disabled={novaFormacao.emAndamento}
                            value={novaFormacao.dataFim || ''}
                            onChange={(e) =>
                                setNovaFormacao((prev) => ({ ...prev, dataFim: e.target.value }))
                            }
                        />
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                name="new_emAndamento"
                                checked={novaFormacao.emAndamento}
                                onChange={(e) =>
                                    setNovaFormacao((prev) => ({
                                        ...prev,
                                        emAndamento: e.target.checked,
                                        dataFim: e.target.checked ? undefined : prev.dataFim,
                                    }))
                                }
                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            Em andamento
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={handleAdicionar}
                        disabled={!novaFormacao.instituicao || !novaFormacao.curso}
                        className="btn btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar Formação
                    </button>
                </div>
            </div>
        </SectionWrapper>
    );
}
