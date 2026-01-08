'use client';

import { useRef } from 'react';

import { User, Mail, Phone, MapPin, Linkedin, Globe, Upload } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function DadosPessoaisSection() {
    const { curriculo, atualizarDadosPessoais } = useResume();
    const { dadosPessoais } = curriculo;
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <SectionWrapper
            title="Dados Pessoais"
            icon={<User className="w-5 h-5 text-primary" />}
            defaultOpen={true}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="input-group sm:col-span-2">
                    <label className="input-label block mb-2">Foto de Perfil (Opcional)</label>
                    <div className="flex items-center gap-4">
                        {dadosPessoais.foto ? (
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={dadosPessoais.foto} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => atualizarDadosPessoais({ foto: undefined })}
                                    className="absolute inset-0 bg-black/50 text-white opacity-0 hover:opacity-100 flex items-center justify-center text-xs transition-opacity"
                                >
                                    Remover
                                </button>
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                <User className="w-8 h-8" />
                            </div>
                        )}
                        <div className="flex-1">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 2 * 1024 * 1024) {
                                            alert('A imagem deve ter no máximo 2MB');
                                            return;
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            atualizarDadosPessoais({ foto: reader.result as string });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center justify-center gap-2 w-auto px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <Upload className="w-5 h-5" />
                                Escolher Foto de Perfil
                            </button>
                            <p className="text-xs text-muted mt-1">Recomendado: .jpg ou .png, máx 2MB.</p>
                        </div>
                    </div>
                </div>

                <div className="input-group sm:col-span-2">
                    <label htmlFor="nomeCompleto" className="input-label">
                        Nome Completo *
                    </label>
                    <input
                        id="nomeCompleto"
                        type="text"
                        className="input-field"
                        placeholder="Ex: Maria Silva"
                        value={dadosPessoais.nomeCompleto}
                        onChange={(e) => atualizarDadosPessoais({ nomeCompleto: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email" className="input-label flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        E-mail *
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="input-field"
                        placeholder="Ex: maria@email.com"
                        value={dadosPessoais.email}
                        onChange={(e) => atualizarDadosPessoais({ email: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="telefone" className="input-label flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        Telefone *
                    </label>
                    <input
                        id="telefone"
                        type="tel"
                        className="input-field"
                        placeholder="Ex: (11) 99999-9999"
                        value={dadosPessoais.telefone}
                        onChange={(e) => atualizarDadosPessoais({ telefone: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="cidade" className="input-label flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Cidade
                    </label>
                    <input
                        id="cidade"
                        type="text"
                        className="input-field"
                        placeholder="Ex: São Paulo"
                        value={dadosPessoais.cidade}
                        onChange={(e) => atualizarDadosPessoais({ cidade: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="estado" className="input-label">
                        Estado
                    </label>
                    <select
                        id="estado"
                        className="input-field select-field"
                        value={dadosPessoais.estado}
                        onChange={(e) => atualizarDadosPessoais({ estado: e.target.value })}
                    >
                        <option value="">Selecione...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>

                <div className="input-group">
                    <label htmlFor="linkedin" className="input-label flex items-center gap-1">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn (opcional)
                    </label>
                    <input
                        id="linkedin"
                        type="url"
                        className="input-field"
                        placeholder="Ex: linkedin.com/in/maria"
                        value={dadosPessoais.linkedin || ''}
                        onChange={(e) => atualizarDadosPessoais({ linkedin: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="portfolio" className="input-label flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Portfólio/Site (opcional)
                    </label>
                    <input
                        id="portfolio"
                        type="url"
                        className="input-field"
                        placeholder="Ex: meusite.com.br"
                        value={dadosPessoais.portfolio || ''}
                        onChange={(e) => atualizarDadosPessoais({ portfolio: e.target.value })}
                    />
                </div>
            </div>

            <p className="text-sm text-muted mt-4">
                * Campos obrigatórios. Seus dados são salvos automaticamente no navegador.
            </p>
        </SectionWrapper>
    );
}
