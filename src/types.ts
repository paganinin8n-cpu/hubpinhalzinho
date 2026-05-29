/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Sector = "Metalmecânico" | "Moveleiro" | "Madeireiro" | "Laticínio / Alimentos" | "Tecnologia / TI" | "Serviços";

export interface Demanda {
  id: string;
  titulo: string;
  empresa: string;
  setor: Sector;
  descricao: string;
  volume: string;
  localizacao: string;
  tags: string[];
  publicadoEm: string;
  status: "Ativo" | "Em Conexão" | "Atendida";
}

export interface Solucao {
  id: string;
  titulo: string;
  empresa: string;
  setor: Sector;
  descricao: string;
  capacidade: string;
  localizacao: string;
  tags: string[];
  publicadoEm: string;
  status: "Disponível" | "Em Conexão" | "Ocupado";
}

export interface Conexao {
  id: string;
  demandaId: string;
  solucaoId: string;
  demandaTitulo: string;
  demandaEmpresa: string;
  solucaoTitulo: string;
  solucaoEmpresa: string;
  matchScore: number;
  dataConexao: string;
  status: "Match Simulado" | "Em Negociação" | "Acordo Firmado" | "Cancelado";
  feedback?: string;
}

export interface Parceiro {
  id: string;
  nome: string;
  tipo: "Indústria" | "Universidade" | "Poder Público" | "Empreendedor" | "MEI";
  email: string;
  telefone: string;
  responsavel: string;
}
