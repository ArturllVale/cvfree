'use client';

import { FileDown, Upload, Trash2, FileText, Menu, X, Moon, Sun } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import { useTheme } from '@/context/ThemeContext';
import { Curriculo } from '@/types/resume';
import { useRef, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const { curriculo, carregarCurriculo, resetarCurriculo } = useResume();
    const { theme, toggleTheme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleDownloadJson = () => {
        const blob = new Blob([JSON.stringify(curriculo, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meu-curriculo.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleUploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string) as Curriculo;
                    carregarCurriculo(data);
                    alert('Currículo carregado com sucesso!');
                } catch {
                    alert('Erro ao carregar arquivo. Verifique se é um JSON válido.');
                }
            };
            reader.readAsText(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleReset = () => {
        if (confirm('Tem certeza que deseja limpar todos os dados do currículo?')) {
            resetarCurriculo();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <FileText className="w-7 h-7 text-primary" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            CVFree
                        </span>
                    </Link>

                    {/* Desktop Actions */}
                    <nav className="hidden md:flex items-center gap-2">
                        <button
                            onClick={handleDownloadJson}
                            className="btn btn-secondary"
                            aria-label="Baixar configurações em JSON"
                        >
                            <FileDown className="w-4 h-4" />
                            Baixar .json
                        </button>

                        <label className="btn btn-secondary cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Carregar .json
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json"
                                onChange={handleUploadJson}
                                className="hidden"
                                aria-label="Carregar configurações de arquivo JSON"
                            />
                        </label>

                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost"
                            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                        >
                            {theme === 'light' ? (
                                <Moon className="w-4 h-4" />
                            ) : (
                                <Sun className="w-4 h-4" />
                            )}
                        </button>

                        <button
                            onClick={handleReset}
                            className="btn btn-ghost text-danger"
                            aria-label="Limpar currículo"
                        >
                            <Trash2 className="w-4 h-4" />
                            Limpar
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="mobile-menu-button md:hidden btn btn-ghost btn-icon"
                        aria-label="Menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-fade-in bg-card shadow-lg rounded-b-lg">
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    handleDownloadJson();
                                    setMenuOpen(false);
                                }}
                                className="btn btn-secondary w-full justify-start"
                            >
                                <FileDown className="w-4 h-4" />
                                Baixar Configurações (.json)
                            </button>

                            <label className="btn btn-secondary w-full justify-start cursor-pointer">
                                <Upload className="w-4 h-4" />
                                Carregar Configurações
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={(e) => {
                                        handleUploadJson(e);
                                        setMenuOpen(false);
                                    }}
                                    className="hidden"
                                />
                            </label>

                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setMenuOpen(false);
                                }}
                                className="btn btn-secondary w-full justify-start"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <Moon className="w-4 h-4" />
                                        Tema Escuro
                                    </>
                                ) : (
                                    <>
                                        <Sun className="w-4 h-4" />
                                        Tema Claro
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    handleReset();
                                    setMenuOpen(false);
                                }}
                                className="btn btn-ghost text-danger w-full justify-start"
                            >
                                <Trash2 className="w-4 h-4" />
                                Limpar Currículo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
