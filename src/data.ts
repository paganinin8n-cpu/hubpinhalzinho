/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Demanda, Solucao, Conexao, Parceiro } from "./types";

export const INITIAL_DEMANDAS: Demanda[] = [
  {
    id: "dem-1",
    titulo: "Serviço de Usinagem CNC de Alta Precisão",
    empresa: "Zagonel S.A.",
    setor: "Metalmecânico",
    descricao: "Precisamos de serviços terceirizados de usinagem CNC em aço inox e alumínio com altíssima precisão e tolerância dimensional estrita para lotes mensais recorrentes de componentes elétricos/iluminação.",
    volume: "500 peças / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Usinagem", "CNC", "Aço Inox", "Alumínio"],
    publicadoEm: "Há 2 dias",
    status: "Em Conexão"
  },
  {
    id: "dem-2",
    titulo: "Embalagens Sustentáveis para Derivados Lácteos",
    empresa: "Laticínio Tirol S.A. (Unidade Pinhalzinho)",
    setor: "Laticínio / Alimentos",
    descricao: "Demanda por fornecedores locais de embalagens recicláveis ou biodegradáveis resistentes à umidade e refrigeração, adequadas para queijos e iogurtes.",
    volume: "50.000 unidades / quinzena",
    localizacao: "Pinhalzinho - SC",
    tags: ["Embalagem", "Sustentabilidade", "Laticínios", "Alimentos"],
    publicadoEm: "Há 5 dias",
    status: "Ativo"
  },
  {
    id: "dem-3",
    titulo: "Automatização de Esteira Seletora de Paletes",
    empresa: "Aurora Alimentos (Frigorífico Pinhalzinho)",
    setor: "Laticínio / Alimentos",
    descricao: "Integração de sensores ópticos e esteira pneumática para triagem automatizada de paletes de expedição.",
    volume: "1 projeto de automação",
    localizacao: "Pinhalzinho - SC",
    tags: ["Automação", "Pneumática", "Sensores", "Logística"],
    publicadoEm: "Há 3 dias",
    status: "Ativo"
  },
  {
    id: "dem-4",
    titulo: "Fornecimento de Painéis Compensados de Eucalipto",
    empresa: "Móveis Pinhalzinho Ltda.",
    setor: "Moveleiro",
    descricao: "Necessidade de compensados navais multilaminados de eucalipto seco em estufa, espessuras de 15mm e 18mm com certificação de origem florestal.",
    volume: "15 toneladas / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Madeira", "Moveleiro", "Compensado", "Eucalipto"],
    publicadoEm: "Há 1 dia",
    status: "Ativo"
  },
  {
    id: "dem-5",
    titulo: "Componentes Eletrônicos Sob Medida",
    empresa: "Zagonel S.A.",
    setor: "Metalmecânico",
    descricao: "Demanda urgente no setor de fiação e montagem de componentes elétricos e placas de circuitos controladores de temperatura.",
    volume: "1.000 kits / lote",
    localizacao: "Pinhalzinho - SC",
    tags: ["Circuitos", "Placas", "Montagem", "Iluminação"],
    publicadoEm: "Há 4 horas",
    status: "Ativo"
  },
  {
    id: "dem-6",
    titulo: "Manutenção Preditiva com Análise Termográfica",
    empresa: "Madeireira Pinhal S/A",
    setor: "Madeireiro",
    descricao: "Necessidade de varreduras termográficas periódicas nos painéis elétricos principais, barramentos e motores do pátio de serraria para mitigação de riscos de incêndio.",
    volume: "Bimestral",
    localizacao: "Pinhalzinho - SC",
    tags: ["Termografia", "Elétrica", "Segurança", "Manutenção"],
    publicadoEm: "Há 1 semana",
    status: "Atendida"
  }
];

export const INITIAL_SOLUCOES: Solucao[] = [
  {
    id: "sol-1",
    titulo: "Usinagem de Precisão CNC de Pequeno a Grande Porte",
    empresa: "Metal Solutions",
    setor: "Metalmecânico",
    descricao: "Oferecemos serviços de usinagem com fresas de 3 e 5 eixos, tornos CNC automáticos, corte a laser de alta definição. Especialistas em componentes mecânicos de alta complexidade nos setores metalmecanico e aeronáutico.",
    capacidade: "Até 1.000 peças / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Usinagem", "Metalurgia", "CNC", "Torno"],
    publicadoEm: "Há 1 hora",
    status: "Disponível"
  },
  {
    id: "sol-2",
    titulo: "Montagem de Componentes Elétricos e Placas Eletrônicas",
    empresa: "MEI EletroTech",
    setor: "Metalmecânico",
    descricao: "Serviço especializado na montagem de chicotes elétricos, soldagem manual SMD/PTH de placas eletrônicas, montagem estrutural e embalagem técnica de kits elétricos.",
    capacidade: "Até 2.500 placas / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Montagem", "Eletrotécnica", "MEI", "Componentes"],
    publicadoEm: "Há 2 dias",
    status: "Disponível"
  },
  {
    id: "sol-3",
    titulo: "Desenvolvimento de Softwares de Automação e IoT Industrial",
    empresa: "DevSul Sistemas Inteligentes",
    setor: "Tecnologia / TI",
    descricao: "Sistemas Web e Apps integrados a PLCs e microcontroladores. Desenvolvemos dashboards para telemetria em tempo real, monitoramento de máquinas, sensores de temperatura, umidade e consumo elétrico corporativo.",
    capacidade: "Sob projeto / 3 times ativos",
    localizacao: "Pinhalzinho - SC",
    tags: ["Software", "IoT", "Dashboard", "Automação"],
    publicadoEm: "Há 3 dias",
    status: "Disponível"
  },
  {
    id: "sol-4",
    titulo: "Embalagens Ecológicas de Papelão Corrugado",
    empresa: "EcoPac Pinhalzinho",
    setor: "Serviços",
    descricao: "Fabricação de caixas de papelão ondulado, bobinas de proteção e berços moldados à base de celulose reciclada de alta resistência mecânica para o setor de embalagens industriais.",
    capacidade: "100.000 caixas / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Papelão", "Embalagens", "Ecológico", "Celulose"],
    publicadoEm: "Há 1 semana",
    status: "Disponível"
  },
  {
    id: "sol-5",
    titulo: "Serraria e Secagem de Madeiras Nobres e Reflorestamento",
    empresa: "Madeireira Pinhal S/A",
    setor: "Madeireiro",
    descricao: "Secagem técnica programada por computador de tábuas de eucalipto, pinus e madeiras de reflorestamento sob normas de sustentabilidade do FSC.",
    capacidade: "200m³ / mês",
    localizacao: "Pinhalzinho - SC",
    tags: ["Madeira", "Serraria", "Secagem", "FSC"],
    publicadoEm: "Há 4 dias",
    status: "Disponível"
  }
];

export const INITIAL_CONEXOES: Conexao[] = [
  {
    id: "con-1",
    demandaId: "dem-1",
    solucaoId: "sol-1",
    demandaTitulo: "Serviço de Usinagem CNC de Alta Precisão",
    demandaEmpresa: "Zagonel S.A.",
    solucaoTitulo: "Usinagem de Precisão CNC de Pequeno a Grande Porte",
    solucaoEmpresa: "Metal Solutions",
    matchScore: 98,
    dataConexao: "2026-05-27",
    status: "Em Negociação",
    feedback: "Em análise técnica final do protótipo mecânico que a Metal Solutions enviou à Zagonel S.A."
  },
  {
    id: "con-2",
    demandaId: "dem-5",
    solucaoId: "sol-2",
    demandaTitulo: "Componentes Eletrônicos Sob Medida",
    demandaEmpresa: "Zagonel S.A.",
    solucaoTitulo: "Montagem de Componentes Elétricos e Placas Eletrônicas",
    solucaoEmpresa: "MEI EletroTech",
    matchScore: 95,
    dataConexao: "2026-05-28",
    status: "Acordo Firmado",
    feedback: "Firmado contrato para montagem técnica de 2.000 chicotes auxiliares para chuveiros térmicos. Contrato assistido por Clédia Thome (Hub Indústria+)."
  },
  {
    id: "con-3",
    demandaId: "dem-3",
    solucaoId: "sol-3",
    demandaTitulo: "Automatização de Esteira Seletora de Paletes",
    demandaEmpresa: "Aurora Alimentos (Frigorífico Pinhalzinho)",
    solucaoTitulo: "Desenvolvimento de Softwares de Automação e IoT Industrial",
    solucaoEmpresa: "DevSul Sistemas Inteligentes",
    matchScore: 89,
    dataConexao: "2026-05-25",
    status: "Match Simulado",
    feedback: "O sistema gerou a oportunidade com base nos requisitos da esteira seletora e no portfólio de IoT industrial."
  }
];

export const INITIAL_PARCEIROS: Parceiro[] = [
  {
    id: "par-1",
    nome: "Zagonel S.A.",
    tipo: "Indústria",
    email: "engenharia@zagonel.com.br",
    telefone: "(49) 3366-1000",
    responsavel: "Eng. Marcos Zagonel"
  },
  {
    id: "par-2",
    nome: "Metal Solutions",
    tipo: "Indústria",
    email: "contato@metalsolutions.ind.br",
    telefone: "(49) 3366-2244",
    responsavel: "Roberto Mendes"
  },
  {
    id: "par-3",
    nome: "MEI EletroTech",
    tipo: "MEI",
    email: "eletrotech.mei@gmail.com",
    telefone: "(49) 99111-2222",
    responsavel: "Luiz Henrique (Eletrotécnico)"
  },
  {
    id: "par-4",
    nome: "UNOESC (Campus Pinhalzinho)",
    tipo: "Universidade",
    email: "diretoria.pinhalzinho@unoesc.edu.br",
    telefone: "(49) 3366-3300",
    responsavel: "Profª. Sandra Deon"
  },
  {
    id: "par-5",
    nome: "Senai Pinhalzinho",
    tipo: "Universidade",
    email: "coordenacao.pinhalzinho@fiesc.com.br",
    telefone: "(49) 3366-4000",
    responsavel: "Carlos Alberto"
  },
  {
    id: "par-6",
    nome: "Prefeitura de Pinhalzinho - Secretaria de Desenvolvimento",
    tipo: "Poder Público",
    email: "desenvolvimento@pinhalzinho.sc.gov.br",
    telefone: "(49) 3366-6005",
    responsavel: "Secretário de Desenvolvimento Econômico"
  }
];

export const GENERAL_METRICS = {
  demandasPublicadas: {
    total: 128,
    crescimento: 14,
    percentual: "+12.2% este mês"
  },
  solucoesCadastradas: {
    total: 214,
    crescimento: 28,
    percentual: "+15.0% este mês"
  },
  conexoesRealizadas: {
    total: 86,
    crescimento: 12,
    percentual: "+16.2% este mês"
  },
  empresasParticipantes: {
    total: 356,
    crescimento: 42,
    percentual: "+13.3% este mês"
  }
};
