'use client';

import { Target, Lightbulb } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import SectionWrapper from '@/components/ui/SectionWrapper';

const sugestoesObjetivo = [
    'Busco uma oportunidade para desenvolver minhas habilidades e contribuir com o crescimento da empresa.',
    'Desejo aplicar meus conhecimentos em um ambiente dinâmico que valorize o aprendizado contínuo.',
    'Procuro minha primeira experiência profissional para aplicar os conhecimentos adquiridos durante minha formação.',
    'Busco uma posição que me permita crescer profissionalmente enquanto contribuo com resultados significativos.',
];

export default function ObjetivoSection() {
    const { curriculo, atualizarObjetivo } = useResume();
    const { objetivo } = curriculo;

    const aplicarSugestao = (sugestao: string) => {
        atualizarObjetivo(sugestao);
    };

    return (
        <SectionWrapper
            title="Objetivo Profissional"
            icon={<Target className="w-5 h-5 text-primary" />}
            defaultOpen={true}
        >
            <div className="space-y-4">
                <div className="input-group">
                    <label htmlFor="objetivo" className="input-label">
                        Descreva seu objetivo profissional
                    </label>
                    <textarea
                        id="objetivo"
                        name="objetivo"
                        className="input-field textarea-field"
                        placeholder="Ex: Busco uma oportunidade para desenvolver minhas habilidades..."
                        rows={4}
                        value={objetivo.texto}
                        onChange={(e) => atualizarObjetivo(e.target.value)}
                    />
                    <p className="text-sm text-muted">
                        {objetivo.texto.length}/500 caracteres
                    </p>
                </div>

                <div className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">Sugestões para quem está começando:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sugestoesObjetivo.map((sugestao, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => aplicarSugestao(sugestao)}
                                className="text-left text-sm bg-card hover:bg-card-hover border border-border rounded-lg px-3 py-2 transition-colors"
                            >
                                {sugestao.slice(0, 60)}...
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
