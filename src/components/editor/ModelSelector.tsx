'use client';

import { Check, LayoutTemplate } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { cn } from '@/lib/utils';

const MODELOS = [
    { id: 'classico', nome: 'Clássico', cor: 'bg-white' },
    { id: 'moderno', nome: 'Moderno', cor: 'bg-slate-50' },
] as const;

export default function ModelSelector() {
    const { curriculo, atualizarModelo } = useResume();

    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-primary" />
                Modelo do Currículo
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {MODELOS.map((modelo) => (
                    <button
                        key={modelo.id}
                        onClick={() => atualizarModelo(modelo.id)}
                        className={cn(
                            "relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:bg-accent/50",
                            curriculo.modelo === modelo.id
                                ? "border-primary bg-primary/5"
                                : "border-transparent bg-secondary"
                        )}
                    >
                        <div className={cn("w-full h-16 rounded mb-2 border border-gray-300 shadow-sm", modelo.cor)}>
                            {/* Mini representation */}
                            {modelo.id === 'classico' ? (
                                <div className="p-1 space-y-1">
                                    <div className="w-1/2 h-1.5 bg-gray-400 mx-auto rounded" />
                                    <div className="w-full h-8 bg-gray-200 rounded border border-gray-300" />
                                </div>
                            ) : (
                                <div className="flex h-full">
                                    <div className="w-1/3 bg-slate-400 h-full rounded-l" />
                                    <div className="w-2/3 p-1 space-y-1">
                                        <div className="w-3/4 h-1.5 bg-gray-400 rounded" />
                                        <div className="w-full h-1.5 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium">{modelo.nome}</span>
                        {curriculo.modelo === modelo.id && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
