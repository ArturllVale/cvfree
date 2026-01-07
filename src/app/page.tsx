'use client';

import { useState } from 'react';
import { Eye, Edit3 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import DadosPessoaisSection from '@/components/editor/DadosPessoaisSection';
import ObjetivoSection from '@/components/editor/ObjetivoSection';
import FormacaoSection from '@/components/editor/FormacaoSection';
import HabilidadesSection from '@/components/editor/HabilidadesSection';
import ExperienciaSection from '@/components/editor/ExperienciaSection';
import ResumePreview from '@/components/preview/ResumePreview';
import ExportPanel from '@/components/export/ExportPanel';
import ModelSelector from '@/components/editor/ModelSelector';
import { cn } from '@/lib/utils';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex mb-4 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setActiveTab('editor')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
              activeTab === 'editor'
                ? 'bg-card shadow-sm text-foreground'
                : 'text-muted hover:text-foreground'
            )}
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
              activeTab === 'preview'
                ? 'bg-card shadow-sm text-foreground'
                : 'text-muted hover:text-foreground'
            )}
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </button>
        </div>

        {/* Desktop: Side by Side | Mobile: Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div
            className={cn(
              'space-y-4',
              activeTab !== 'editor' && 'hidden lg:block'
            )}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Preencha seu Currículo
              </h2>
            </div>

            <ModelSelector />
            <DadosPessoaisSection />
            <ObjetivoSection />
            <ExperienciaSection />
            <FormacaoSection />
            <HabilidadesSection />

            {/* Mobile Export Panel */}
            <div className="lg:hidden">
              <ExportPanel />
            </div>
          </div>

          {/* Preview Panel */}
          <div
            className={cn(
              'lg:sticky lg:top-20 lg:h-fit',
              activeTab !== 'preview' && 'hidden lg:block'
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold hidden lg:block">
                Pré-visualização
              </h2>
            </div>

            {/* Desktop Export Panel */}
            <div className="hidden lg:block">
              <ExportPanel />
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-inner overflow-auto max-h-[calc(100vh-200px)]">
              <ResumePreview />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted">
          <p>
            Gerador de Currículos Profissionais | 100% Gratuito
          </p>
        </div>
      </footer>
    </div>
  );
}
