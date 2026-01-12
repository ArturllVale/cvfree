'use client';

import { Wrench, Plus, X } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { useState } from 'react';
import { Habilidade } from '@/types/resume';
import { cn } from '@/lib/utils';

const nivelLabels: Record<Habilidade['nivel'], string> = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

const sugestoesHabilidades = [
    'Comunicação',
    'Trabalho em equipe',
    'Organização',
    'Proatividade',
    'Informática básica',
    'Microsoft Office',
    'Atendimento ao cliente',
    'Resolução de problemas',
    'Flexibilidade',
    'Pontualidade',
    'Teams',
    'IA',
    'Automações',
    'Sistemas',
    'Git',
    'Word',
    'Power Point',
    'Excel ',
    'Gestão de Projetos',
    'Inglês',
];

export default function HabilidadesSection() {
    const { curriculo, adicionarHabilidade, removerHabilidade, atualizarHabilidade } = useResume();
    const { habilidades } = curriculo;

    const [novaHabilidade, setNovaHabilidade] = useState<Omit<Habilidade, 'id'>>({
        nome: '',
        nivel: 'intermediario',
    });

    const handleAdicionar = () => {
        if (novaHabilidade.nome.trim()) {
            adicionarHabilidade(novaHabilidade);
            setNovaHabilidade({ nome: '', nivel: 'intermediario' });
        }
    };

    const handleAdicionarSugestao = (sugestao: string) => {
        if (!habilidades.find((h) => h.nome.toLowerCase() === sugestao.toLowerCase())) {
            adicionarHabilidade({ nome: sugestao, nivel: 'intermediario' });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdicionar();
        }
    };

    return (
        <SectionWrapper
            title="Habilidades"
            icon={<Wrench className="w-5 h-5 text-primary" />}
            defaultOpen={true}
            badge={habilidades.length > 0 ? `${habilidades.length}` : undefined}
        >
            <div className="space-y-4">
                {/* Lista de habilidades */}
                {habilidades.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {habilidades.map((habilidade) => (
                            <div
                                key={habilidade.id}
                                className="group flex items-center gap-2 bg-secondary/80 border border-border rounded-full pl-4 pr-2 py-2 animate-slide-in"
                            >
                                <span className="text-sm font-medium">{habilidade.nome}</span>
                                <select
                                    name={`nivel-${habilidade.id}`}
                                    className={cn(
                                        'text-xs px-2 py-1 rounded-md bg-background/50 border-none focus:ring-1 focus:ring-primary cursor-pointer font-medium',
                                        habilidade.nivel === 'basico' && 'text-warning',
                                        habilidade.nivel === 'intermediario' && 'text-primary',
                                        habilidade.nivel === 'avancado' && 'text-success'
                                    )}
                                    value={habilidade.nivel}
                                    aria-label={`Nível da habilidade ${habilidade.nome}`}
                                    onChange={(e) =>
                                        atualizarHabilidade(habilidade.id, {
                                            nivel: e.target.value as Habilidade['nivel'],
                                        })
                                    }
                                >
                                    <option value="basico">{nivelLabels.basico}</option>
                                    <option value="intermediario">{nivelLabels.intermediario}</option>
                                    <option value="avancado">{nivelLabels.avancado}</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => removerHabilidade(habilidade.id)}
                                    className="p-1 rounded-full hover:bg-card-hover text-muted hover:text-danger transition-colors"
                                    aria-label={`Remover ${habilidade.nome}`}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Adicionar nova habilidade */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        name="new_skill_name"
                        className="input-field flex-1"
                        placeholder="Digite uma habilidade..."
                        value={novaHabilidade.nome}
                        onChange={(e) =>
                            setNovaHabilidade((prev) => ({ ...prev, nome: e.target.value }))
                        }
                        onKeyPress={handleKeyPress}
                    />
                    <select
                        name="new_skill_level"
                        className="input-field select-field w-full sm:w-40"
                        value={novaHabilidade.nivel}
                        aria-label="Nível da nova habilidade"
                        onChange={(e) =>
                            setNovaHabilidade((prev) => ({
                                ...prev,
                                nivel: e.target.value as Habilidade['nivel'],
                            }))
                        }
                    >
                        <option value="basico">{nivelLabels.basico}</option>
                        <option value="intermediario">{nivelLabels.intermediario}</option>
                        <option value="avancado">{nivelLabels.avancado}</option>
                    </select>
                    <button
                        type="button"
                        onClick={handleAdicionar}
                        disabled={!novaHabilidade.nome.trim()}
                        className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar
                    </button>
                </div>

                {/* Sugestões */}
                <div className="pt-2">
                    <p className="text-sm text-muted mb-2">Sugestões rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                        {sugestoesHabilidades
                            .filter(
                                (s) => !habilidades.find((h) => h.nome.toLowerCase() === s.toLowerCase())
                            )
                            .map((sugestao) => (
                                <button
                                    key={sugestao}
                                    type="button"
                                    onClick={() => handleAdicionarSugestao(sugestao)}
                                    className="text-sm bg-secondary hover:bg-primary border border-border hover:border-primary rounded-full px-3 py-1.5 transition-all font-medium shadow-sm hover:shadow-md"
                                >
                                    + {sugestao}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
