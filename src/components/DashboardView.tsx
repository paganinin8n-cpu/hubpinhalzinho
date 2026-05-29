/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Demanda, Solucao, Conexao } from "../types";
import { ArrowRight, Sparkles, AlertCircle, CheckCircle, Handshake, Users, ChevronRight, Zap } from "lucide-react";
import KpiCard from "./KpiCard";

interface DashboardViewProps {
  demandas: Demanda[];
  solucoes: Solucao[];
  conexoes: Conexao[];
  onNavigate: (tab: string) => void;
  onSelectDemand?: (demanda: Demanda) => void;
  onSelectSolution?: (solucao: Solucao) => void;
  onSelectConnection?: (conexao: Conexao) => void;
  onStartSimulationWith?: (demandaId: string, solucaoId: string) => void;
}

export default function DashboardView({
  demandas,
  solucoes,
  conexoes,
  onNavigate,
  onSelectDemand,
  onSelectSolution,
  onSelectConnection,
  onStartSimulationWith
}: DashboardViewProps) {
  // Filter active highlight items as depicted in standard prototype
  const highlightedDemands = demandas.slice(0, 2);
  const highlightedSolutions = solucoes.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Dynamic Welcome Banner reflecting Clédia Thome as the Agent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-natural-dark border border-natural-border/20 text-white rounded-3xl p-6 overflow-hidden shadow-md"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-natural-sage/10 rounded-full blur-3xl pointer-events-none -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-natural-olive/10 rounded-full blur-3xl pointer-events-none translate-y-12" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-natural-sage/20 text-natural-sage border border-natural-sage/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Inteligência Territorial Ativa
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-white">
              Olá, <span className="text-natural-sage font-semibold">Clédia Thome</span>!
            </h1>
            <p className="text-white/80 max-w-2xl text-sm leading-relaxed">
              O ecossistema produtivo de Pinhalzinho está unificado hoje. O HUB Indústria+ detectou novas compatibilidades automáticas entre as demandas industriais e pequenas empresas.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate("oportunidades")}
              className="bg-natural-sage hover:bg-natural-sage/90 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-natural-sage/15 text-sm rounded-xl cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Simular Conexões (IA)
            </button>
            <button
              onClick={() => onNavigate("relatorios")}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 border border-white/15 rounded-xl transition-all text-sm cursor-pointer"
            >
              Relatórios de Indicadores
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main KPI Dashboard Indicators with facilitated accessibility visual styles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          id="kpi-demandas"
          title="Demandas Publicadas"
          value={demandas.length + 120} // Baseline 128 as in slide + current modifications
          change="+12.2%"
          iconName="AlertCircle"
          colorScheme="indigo"
          sparklineData={[112, 115, 119, 118, 122, 124, demandas.length + 120]}
          onClick={() => onNavigate("demandas")}
        />
        <KpiCard
          id="kpi-solucoes"
          title="Soluções Cadastradas"
          value={solucoes.length + 209} // Baseline 214
          change="+15.0%"
          iconName="CheckCircle"
          colorScheme="blue"
          sparklineData={[190, 195, 202, 201, 208, 210, solucoes.length + 209]}
          onClick={() => onNavigate("solucoes")}
        />
        <KpiCard
          id="kpi-conexoes"
          title="Conexões Realizadas"
          value={conexoes.length + 83} // Baseline 86
          change="+16.2%"
          iconName="Handshake"
          colorScheme="green"
          sparklineData={[70, 74, 78, 80, 82, 85, conexoes.length + 83]}
          onClick={() => onNavigate("conexoes")}
        />
        <KpiCard
          id="kpi-empresas"
          title="Empresas Participantes"
          value={356} // Baseline 356
          change="+13.3%"
          iconName="Users"
          colorScheme="amber"
          sparklineData={[310, 320, 328, 335, 342, 350, 356]}
          onClick={() => onNavigate("parceiros")}
        />
      </div>

      {/* Highlights Columns mimicking precisely the layout of Slide 15 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Demandas em Destaque Panel */}
        <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-natural-border/30">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-natural-clay rounded-full" />
                <h2 className="text-lg font-display font-bold text-natural-heading">
                  Demandas em destaque
                </h2>
              </div>
              <button
                onClick={() => onNavigate("demandas")}
                className="text-xs font-semibold text-natural-clay hover:text-natural-clay/85 flex items-center gap-1 transition-all cursor-pointer"
              >
                Ver todas ({demandas.length + 120})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {highlightedDemands.map((dem) => (
                <div
                  key={dem.id}
                  onClick={() => onSelectDemand?.(dem)}
                  className="p-4 rounded-xl border border-natural-border/50 bg-natural-sand/10 hover:bg-natural-sand/35 transition-colors cursor-pointer space-y-3 group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-semibold text-natural-clay bg-natural-clay/10 px-2 py-0.5 rounded-full border border-natural-clay/15">
                      {dem.setor}
                    </span>
                    <span className="text-[11px] text-natural-olive/70 font-mono">
                      {dem.publicadoEm}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-natural-heading group-hover:text-natural-clay transition-colors line-clamp-1">
                      Necessidade: {dem.titulo}
                    </h3>
                    <p className="text-xs text-natural-olive font-mono mt-0.5">
                      Empresa solicitante: {dem.empresa}
                    </p>
                    <p className="text-xs text-natural-dark/95 line-clamp-2 mt-2 leading-relaxed">
                      {dem.descricao}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-natural-olive pt-1 border-t border-natural-border/40 font-medium">
                    <span>Vol: <strong className="text-natural-dark">{dem.volume}</strong></span>
                    <span>Loc: <strong className="text-natural-dark">{dem.localizacao}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soluções em Destaque Panel */}
        <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-natural-border/30">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 bg-natural-sage rounded-full" />
                <h2 className="text-lg font-display font-bold text-natural-heading">
                  Soluções em destaque
                </h2>
              </div>
              <button
                onClick={() => onNavigate("solucoes")}
                className="text-xs font-semibold text-natural-sage hover:text-natural-sage/85 flex items-center gap-1 transition-all cursor-pointer"
              >
                Ver todas ({solucoes.length + 209})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {highlightedSolutions.map((sol) => (
                <div
                  key={sol.id}
                  onClick={() => onSelectSolution?.(sol)}
                  className="p-4 rounded-xl border border-natural-border/50 bg-natural-sand/10 hover:bg-natural-sand/35 transition-colors cursor-pointer space-y-3 group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-semibold text-natural-sage bg-natural-sage/10 px-2 py-0.5 rounded-full border border-natural-sage/15">
                      {sol.setor}
                    </span>
                    <span className="text-[11px] text-natural-olive/70 font-mono">
                      {sol.publicadoEm}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-natural-heading group-hover:text-natural-sage transition-colors line-clamp-1">
                      Empresa: {sol.empresa}
                    </h3>
                    <p className="text-xs text-natural-olive font-mono mt-0.5">
                      Solução: {sol.titulo}
                    </p>
                    <p className="text-xs text-natural-dark/95 line-clamp-2 mt-2 leading-relaxed">
                      {sol.descricao}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-natural-olive pt-1 border-t border-natural-border/40 font-medium">
                    <span>Capacidade: <strong className="text-natural-dark">{sol.capacidade}</strong></span>
                    <span>Loc: <strong className="text-natural-dark">{sol.localizacao}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Oportunidades de Conexão panel mimicking Slide 15 directly */}
      <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-xs">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-natural-border/30">
          <div className="flex items-center gap-2">
            <Handshake className="text-natural-sage w-5 h-5 animate-pulse" />
            <h2 className="text-lg font-display font-bold text-natural-heading">
              Oportunidades de conexão recomendadas (Match)
            </h2>
          </div>
          <button
            onClick={() => onNavigate("oportunidades")}
            className="text-xs font-semibold text-natural-sage hover:text-natural-sage/90 flex items-center gap-1 transition-all cursor-pointer"
          >
            Análise Avançada
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight Match row exactly like depicted "Zagonel S.A. | Demanda Componentes Elétricos" <---> "95% Match" <---> "MEI EletroTech | Montagem" */}
        <div className="border border-natural-border bg-natural-sand/20 rounded-2xl p-5 hover:bg-natural-sand/40 transition-colors duration-150">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Side: Solicitante (Zagonel S.A.) */}
            <div className="flex-1 w-full space-y-1 text-center lg:text-left">
              <span className="text-[10px] font-bold text-natural-clay tracking-wider uppercase font-mono">
                Demanda em Aberto
              </span>
              <h3 className="font-bold text-natural-heading text-base">
                Zagonel S.A.
              </h3>
              <p className="text-sm text-natural-dark/95">
                Demanda: Componentes elétricos / Montagem eletrônica sob medida
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
                <span className="text-xs bg-natural-clay/10 text-natural-clay font-medium px-2 py-0.5 rounded-full border border-natural-clay/20">
                  Usinagem / Componentes
                </span>
                <span className="text-xs text-natural-olive font-mono">Vol: 1000 kits</span>
              </div>
            </div>

            {/* Middle: Connection Node Matching indicator in high contrast */}
            <div className="flex flex-col items-center shrink-0 space-y-2">
              <div className="relative flex items-center justify-center">
                {/* Visual linking lines with animation */}
                <div className="absolute top-1/2 -translate-y-1/2 w-48 h-[2px] bg-gradient-to-r from-natural-border via-natural-sage to-natural-border blur-xs hidden md:block" />
                
                <div className="relative z-10 bg-natural-sage text-white font-display font-extrabold text-lg px-4 py-2 rounded-full shadow-lg shadow-natural-sage/20 border-2 border-white flex flex-col items-center justify-center min-w-[72px] h-[72px]">
                  <span className="text-xs font-bold leading-3 text-white/80">MATCH</span>
                  <span className="text-lg font-black leading-5">95%</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-natural-sage bg-natural-sage/10 border border-natural-sage/25 px-2.5 py-0.5 rounded-full">
                Pronto para Conectar
              </span>
            </div>

            {/* Right Side: Provedor (MEI EletroTech) */}
            <div className="flex-1 w-full space-y-1 text-center lg:text-right">
              <span className="text-[10px] font-bold text-natural-sage tracking-wider uppercase font-mono">
                Solução Disponível
              </span>
              <h3 className="font-bold text-natural-heading text-base">
                MEI EletroTech
              </h3>
              <p className="text-sm text-natural-dark/95">
                Solução: Montagem de componentes elétricos e fiação especializada
              </p>
              <div className="flex items-center justify-center lg:justify-end gap-2 pt-1">
                <span className="text-xs bg-natural-sage/10 text-natural-sage font-medium px-2 py-0.5 rounded-full border border-natural-sage/20">
                  Capacidade: 2.500 placas/mês
                </span>
                <span className="text-xs text-natural-olive font-mono">Microempreendedor Local</span>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="mt-5 border-t border-natural-border/60 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-xs text-natural-olive text-center sm:text-left font-medium">
              O HUB mitigou o achismo: esta conexão pode reduzir o frete de suprimentos na cadeia em <strong className="text-natural-sage font-bold">92%</strong> comprando localmente.
            </span>
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  if (onStartSimulationWith) {
                    onStartSimulationWith("dem-5", "sol-2");
                  } else {
                    onNavigate("oportunidades");
                  }
                }}
                className="bg-natural-sage hover:bg-natural-sage/90 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-sm rounded-xl cursor-pointer"
              >
                Ver Detalhes & Conectar
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic List showing secondary automated matches */}
        <div className="mt-4 space-y-3">
          <div className="p-4 rounded-xl border border-natural-border/50 bg-natural-sand/10 flex items-center justify-between text-xs sm:text-sm text-natural-dark hover:bg-natural-sand/35 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-bold shrink-0 text-natural-heading">Móveis Pinhalzinho</span>
              <span className="text-natural-olive/60 font-mono text-[10px] shrink-0">◀(89% Match)▶</span>
              <span className="truncate text-natural-olive">Madeireira Pinhal S/A (Painéis de reflorestamento)</span>
            </div>
            <button
              onClick={() => onNavigate("oportunidades")}
              className="text-xs font-semibold text-natural-sage hover:text-natural-sage/85 flex items-center shrink-0 gap-0.5 cursor-pointer"
            >
              Simular <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-natural-border/50 bg-natural-sand/10 flex items-center justify-between text-xs sm:text-sm text-natural-dark hover:bg-natural-sand/35 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-bold shrink-0 text-natural-heading">Laticínios Tirol</span>
              <span className="text-slate-400 font-mono text-[10px] shrink-0">◀(82% Match)▶</span>
              <span className="truncate text-slate-600">EcoPac (Embalagens ecologicamente biodegradáveis)</span>
            </div>
            <button
              onClick={() => onNavigate("oportunidades")}
              className="text-xs font-semibold text-natural-sage hover:text-natural-sage/85 flex items-center shrink-0 gap-0.5 cursor-pointer"
            >
              Simular <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
