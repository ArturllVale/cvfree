'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Curriculo, curriculoInicial, Formacao, Habilidade, Experiencia } from '@/types/resume';

interface ResumeContextType {
    curriculo: Curriculo;
    setCurriculo: (curriculo: Curriculo) => void;
    atualizarDadosPessoais: (dados: Partial<Curriculo['dadosPessoais']>) => void;
    atualizarObjetivo: (texto: string) => void;
    adicionarFormacao: (formacao: Omit<Formacao, 'id'>) => void;
    removerFormacao: (id: string) => void;
    atualizarFormacao: (id: string, formacao: Partial<Formacao>) => void;
    adicionarHabilidade: (habilidade: Omit<Habilidade, 'id'>) => void;
    removerHabilidade: (id: string) => void;
    atualizarHabilidade: (id: string, habilidade: Partial<Habilidade>) => void;
    adicionarExperiencia: (experiencia: Omit<Experiencia, 'id'>) => void;
    removerExperiencia: (id: string) => void;
    atualizarExperiencia: (id: string, experiencia: Partial<Experiencia>) => void;
    resetarCurriculo: () => void;
    carregarCurriculo: (dados: Curriculo) => void;
    atualizarModelo: (modelo: 'classico' | 'moderno') => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const gerarId = () => Math.random().toString(36).substring(2, 9);

const STORAGE_KEY = 'cvfree_curriculo';

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [curriculo, setCurriculoState] = useState<Curriculo>(curriculoInicial);
    const [isLoaded, setIsLoaded] = useState(false);

    // Carregar do localStorage ao iniciar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setCurriculoState(parsed);
                } catch (e) {
                    console.error('Erro ao carregar currículo salvo:', e);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    // Salvar no localStorage quando mudar
    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculo));
        }
    }, [curriculo, isLoaded]);

    const setCurriculo = useCallback((novoCurriculo: Curriculo) => {
        setCurriculoState(novoCurriculo);
    }, []);

    const atualizarDadosPessoais = useCallback((dados: Partial<Curriculo['dadosPessoais']>) => {
        setCurriculoState(prev => ({
            ...prev,
            dadosPessoais: { ...prev.dadosPessoais, ...dados },
        }));
    }, []);

    const atualizarObjetivo = useCallback((texto: string) => {
        setCurriculoState(prev => ({
            ...prev,
            objetivo: { texto },
        }));
    }, []);

    const adicionarFormacao = useCallback((formacao: Omit<Formacao, 'id'>) => {
        setCurriculoState(prev => ({
            ...prev,
            formacoes: [...prev.formacoes, { ...formacao, id: gerarId() }],
        }));
    }, []);

    const removerFormacao = useCallback((id: string) => {
        setCurriculoState(prev => ({
            ...prev,
            formacoes: prev.formacoes.filter(f => f.id !== id),
        }));
    }, []);

    const atualizarFormacao = useCallback((id: string, formacao: Partial<Formacao>) => {
        setCurriculoState(prev => ({
            ...prev,
            formacoes: prev.formacoes.map(f => f.id === id ? { ...f, ...formacao } : f),
        }));
    }, []);

    const adicionarHabilidade = useCallback((habilidade: Omit<Habilidade, 'id'>) => {
        setCurriculoState(prev => ({
            ...prev,
            habilidades: [...prev.habilidades, { ...habilidade, id: gerarId() }],
        }));
    }, []);

    const removerHabilidade = useCallback((id: string) => {
        setCurriculoState(prev => ({
            ...prev,
            habilidades: prev.habilidades.filter(h => h.id !== id),
        }));
    }, []);

    const atualizarHabilidade = useCallback((id: string, habilidade: Partial<Habilidade>) => {
        setCurriculoState(prev => ({
            ...prev,
            habilidades: prev.habilidades.map(h => h.id === id ? { ...h, ...habilidade } : h),
        }));
    }, []);

    const adicionarExperiencia = useCallback((experiencia: Omit<Experiencia, 'id'>) => {
        setCurriculoState(prev => ({
            ...prev,
            experiencias: [...prev.experiencias, { ...experiencia, id: gerarId() }],
        }));
    }, []);

    const removerExperiencia = useCallback((id: string) => {
        setCurriculoState(prev => ({
            ...prev,
            experiencias: prev.experiencias.filter(e => e.id !== id),
        }));
    }, []);

    const atualizarExperiencia = useCallback((id: string, experiencia: Partial<Experiencia>) => {
        setCurriculoState(prev => ({
            ...prev,
            experiencias: prev.experiencias.map(e => e.id === id ? { ...e, ...experiencia } : e),
        }));
    }, []);

    const resetarCurriculo = useCallback(() => {
        setCurriculoState(curriculoInicial);
    }, []);

    const carregarCurriculo = useCallback((dados: Curriculo) => {
        setCurriculoState(dados);
    }, []);

    const atualizarModelo = useCallback((modelo: 'classico' | 'moderno') => {
        setCurriculoState(prev => ({
            ...prev,
            modelo,
        }));
    }, []);

    return (
        <ResumeContext.Provider
            value={{
                curriculo,
                setCurriculo,
                atualizarDadosPessoais,
                atualizarObjetivo,
                adicionarFormacao,
                removerFormacao,
                atualizarFormacao,
                adicionarHabilidade,
                removerHabilidade,
                atualizarHabilidade,
                adicionarExperiencia,
                removerExperiencia,
                atualizarExperiencia,
                resetarCurriculo,
                carregarCurriculo,
                atualizarModelo,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume deve ser usado dentro de um ResumeProvider');
    }
    return context;
}
