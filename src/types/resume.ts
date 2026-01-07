// Tipos para o currículo

export interface DadosPessoais {
  nomeCompleto: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  linkedin?: string;
  portfolio?: string;
  foto?: string;
}

export interface Objetivo {
  texto: string;
}

export interface Formacao {
  id: string;
  instituicao: string;
  curso: string;
  nivel: 'ensino_medio' | 'tecnico' | 'graduacao' | 'pos_graduacao' | 'mestrado' | 'doutorado' | 'outro';
  dataInicio: string;
  dataFim?: string;
  emAndamento: boolean;
}

export interface Habilidade {
  id: string;
  nome: string;
  nivel: 'basico' | 'intermediario' | 'avancado';
}

export interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  descricao: string;
  dataInicio: string;
  dataFim?: string;
  atual: boolean;
}

export interface Curriculo {
  dadosPessoais: DadosPessoais;
  objetivo: Objetivo;
  formacoes: Formacao[];
  habilidades: Habilidade[];
  experiencias: Experiencia[];
  modelo?: 'classico' | 'moderno';
}

export const curriculoInicial: Curriculo = {
  dadosPessoais: {
    nomeCompleto: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    linkedin: '',
    portfolio: '',
    foto: '',
  },
  objetivo: {
    texto: '',
  },
  formacoes: [],
  habilidades: [],
  experiencias: [],
  modelo: 'classico',
};
