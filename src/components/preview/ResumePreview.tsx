'use client';

import { useResume } from '@/context/ResumeContext';
import ModernResume from './ModernResume';
import ClassicResume from './ClassicResume';

export default function ResumePreview() {
    const { curriculo } = useResume();
    const { dadosPessoais, objetivo, formacoes, habilidades, experiencias } = curriculo;

    const temConteudo =
        dadosPessoais.nomeCompleto ||
        objetivo.texto ||
        formacoes.length > 0 ||
        habilidades.length > 0 ||
        experiencias.length > 0;

    if (!temConteudo) {
        return (
            <div className="resume-preview flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Seu currículo aparecerá aqui
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                    Comece preenchendo seus dados pessoais no formulário ao lado
                </p>
            </div>
        );
    }

    const isModern = curriculo.modelo === 'moderno';

    if (isModern) {
        return <ModernResume data={curriculo} />;
    }

    return <ClassicResume data={curriculo} />;
}
