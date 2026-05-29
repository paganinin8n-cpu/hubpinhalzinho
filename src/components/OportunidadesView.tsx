/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Demanda, Solucao } from "../types";
import { Zap, Handshake, ArrowRight, CheckCircle2, AlertCircle, FileText, Sparkles, Network, ArrowLeftRight } from "lucide-react";

interface OportunidadesViewProps {
  demandas: Demanda[];
  solucoes: Solucao[];
  onConnect: (demandaId: string, solucaoId: string, score: number) => void;
  preSelectedDemandId?: string;
  preSelectedSolutionId?: string;
}

export default function OportunidadesView({
  demandas,
  solucoes,
  onConnect,
  preSelectedDemandId,
  preSelectedSolutionId
}: OportunidadesViewProps) {
  const [selectedDemandId, setSelectedDemandId] = useState<string>("");
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [matchReasoning, setMatchReasoning] = useState<string[]>([]);
  const [showError, setShowError] = useState("");

  useEffect(() => {
    if (preSelectedDemandId) {
      setSelectedDemandId(preSelectedDemandId);
    } else if (demandas.length > 0 && !selectedDemandId) {
      setSelectedDemandId(demandas[0].id);
    }
  }, [preSelectedDemandId, demandas]);

  useEffect(() => {
    if (preSelectedSolutionId) {
      setSelectedSolutionId(preSelectedSolutionId);
    }
  }, [preSelectedSolutionId]);

  const activeDemand = demandas.find((d) => d.id === selectedDemandId);
  const activeSolution = solucoes.find((s) => s.id === selectedSolutionId);

  // Intelligent Simulated Matching logic
  const handleCalculateMatch = () => {
    if (!selectedDemandId || !selectedSolutionId) {
      setShowError("Selecione uma demanda e uma solução para simular.");
      return;
    }
    setShowError("");
    setIsSimulating(true);
    setSimulationComplete(false);

    setTimeout(() => {
      if (!activeDemand || !activeSolution) return;

      // Score components
      let score = 50; // baseline

      const reasonList: string[] = [];

      // 1. Sector Match
      if (activeDemand.setor === activeSolution.setor) {
        score += 25;
        reasonList.push(`Pertencem ao mesmo setor industrial (${activeDemand.setor}), otimizando processos técnicos.`);
      } else {
        score -= 10;
        reasonList.push(`Setores divergentes (${activeDemand.setor} vs ${activeSolution.setor}). Requer adaptação regulatória.`);
      }

      // 2. Tags Match
      const commonTags = activeDemand.tags.filter((t) =>
        activeSolution.tags.some((st) => st.toLowerCase() === t.toLowerCase())
      );

      if (commonTags.length > 0) {
        score += commonTags.length * 10;
        reasonList.push(`Competências equivalentes encontradas nas metatags compartilhadas: #${commonTags.join(", #")}.`);
      } else {
        reasonList.push("Não foram encontradas etiquetas idênticas de competência direta, necessitando intermediação manual.");
      }

      // 3. Location advantage
      if (activeDemand.localizacao === activeSolution.localizacao) {
        score += 10;
        reasonList.push(`Ambas operam em Pinhalzinho, SC. Logística simplificada com frete zero/reduzido.`);
      }

      // Limit scope to 99% maximum
      const finalScore = Math.min(Math.max(score, 15), 99);

      setMatchScore(finalScore);
      setMatchReasoning(reasonList);
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 1500); // simulation duration
  };

  const handleEstablishConnection = () => {
    if (!selectedDemandId || !selectedSolutionId || matchScore === null) return;
    onConnect(selectedDemandId, selectedSolutionId, matchScore);
    setSimulationComplete(false);
    setMatchScore(null);
    setSelectedSolutionId("");
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-natural-heading">
          Simulador de Compatibilidade Industrial (IA)
        </h1>
        <p className="text-sm text-natural-olive">
          Aplique o modelo inovador do HUB para conectar fornecedores e indústrias de forma científica e baseada em dados reais.
        </p>
      </div>

      {showError && (
        <div className="border border-red-200 bg-red-50 text-red-800 p-4 rounded-xl flex items-center gap-2 text-sm leading-none">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{showError}</span>
        </div>
      )}

      {/* Main matching simulator workstation layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left selector worksheet: choose demand and solution */}
        <div className="lg:col-span-8 bg-white border border-natural-border rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-natural-border/30">
            <Network className="text-natural-sage w-5 h-5" />
            <h2 className="text-lg font-display font-semibold text-natural-heading">Configuração de Simulação</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Choose Demand */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-natural-dark mb-1 uppercase tracking-widest">
                Passo 1: Selecione a Demanda Industrial
              </label>
              <select
                value={selectedDemandId}
                onChange={(e) => {
                  setSelectedDemandId(e.target.value);
                  setSimulationComplete(false);
                  setMatchScore(null);
                }}
                className="w-full bg-natural-sand/20 border border-natural-border rounded-xl px-3 py-2.5 text-natural-dark focus:outline-hidden focus:border-natural-sage text-sm font-medium transition-all focus:ring-1 focus:ring-natural-sage/15 cursor-pointer"
              >
                <option value="">Selecione uma demanda...</option>
                {demandas.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.empresa} - {d.titulo.substring(0, 35)}...
                  </option>
                ))}
              </select>

              {/* Selected Demand info summary card */}
              {activeDemand && (
                <div className="bg-natural-sand/10 border border-natural-border/60 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-natural-clay uppercase font-mono">
                    <span>{activeDemand.setor}</span>
                    <span>{activeDemand.localizacao}</span>
                  </div>
                  <h4 className="font-bold text-natural-heading text-sm leading-snug">
                    {activeDemand.titulo}
                  </h4>
                  <p className="text-xs text-natural-olive line-clamp-2">
                    {activeDemand.descricao}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeDemand.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] text-natural-olive bg-white border border-natural-border/40 px-1.5 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Choose Solution */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-natural-dark mb-1 uppercase tracking-widest">
                Passo 2: Selecione a Solução do Provedor
              </label>
              <select
                value={selectedSolutionId}
                onChange={(e) => {
                  setSelectedSolutionId(e.target.value);
                  setSimulationComplete(false);
                  setMatchScore(null);
                }}
                className="w-full bg-natural-sand/20 border border-natural-border rounded-xl px-3 py-2.5 text-natural-dark focus:outline-hidden focus:border-natural-sage text-sm font-medium transition-all focus:ring-1 focus:ring-natural-sage/15 cursor-pointer"
              >
                <option value="">Selecione um fornecedor...</option>
                {solucoes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.empresa} - {s.titulo.substring(0, 35)}...
                  </option>
                ))}
              </select>

              {/* Selected Solution info summary card */}
              {activeSolution && (
                <div className="bg-natural-sand/10 border border-natural-border/60 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-natural-sage uppercase font-mono">
                    <span>{activeSolution.setor}</span>
                    <span>{activeSolution.localizacao}</span>
                  </div>
                  <h4 className="font-bold text-natural-heading text-sm leading-snug">
                    {activeSolution.empresa}
                  </h4>
                  <p className="text-xs text-natural-olive line-clamp-2">
                    Solução: {activeSolution.titulo}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {activeSolution.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] text-natural-olive bg-white border border-natural-border/40 px-1.5 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-natural-border/50 flex justify-center">
            <button
              onClick={handleCalculateMatch}
              disabled={!selectedDemandId || !selectedSolutionId || isSimulating}
              className="bg-natural-sage hover:bg-natural-sage/90 disabled:bg-natural-sand disabled:text-natural-olive/60 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-natural-sage/10 text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Calcular Compatibilidade Algorítmica
            </button>
          </div>
        </div>

        {/* Right Match visualizer workstation */}
        <div className="lg:col-span-4 bg-natural-dark text-white border border-natural-border/20 rounded-3xl p-6 shadow-md min-h-[400px] flex flex-col justify-between">
          
          <div className="text-center pb-4 border-b border-white/10">
            <span className="text-[10px] font-mono tracking-widest text-natural-sage uppercase">Monitor de Diplomacia</span>
            <h3 className="font-display font-bold text-sm text-natural-sand">HUB Pinhalzinho Indústria+</h3>
          </div>

          <div className="py-6 flex flex-col items-center justify-center flex-1">
            <AnimatePresence mode="wait">
              {isSimulating ? (
                /* Simulating animated nodes loop */
                <motion.div
                  key="simulating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 border-4 border-natural-sage/20 border-t-natural-sage rounded-full animate-spin" />
                    <Sparkles className="w-8 h-8 text-natural-sage animate-pulse" />
                  </div>
                  <span className="text-xs font-semibold text-natural-sand animate-pulse font-mono">
                    Cruzando metatags de competência...
                  </span>
                </motion.div>
              ) : simulationComplete && matchScore !== null ? (
                /* Complete indicator layout */
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center space-y-6"
                >
                  <div className="inline-flex flex-col items-center justify-center bg-natural-heading border border-white/10 rounded-full w-36 h-36 relative mx-auto">
                    {/* Gauge circle outline */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        stroke="#0C7A43"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 60}`}
                        strokeDashoffset={`${2 * Math.PI * 60 * (1 - matchScore / 100)}`}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>

                    <span className="text-4xl font-display font-extrabold text-white">{matchScore}%</span>
                    <span className="text-[10px] font-bold text-natural-sage uppercase tracking-wider font-mono">Compatível</span>
                  </div>

                  <div className="space-y-2 text-left bg-natural-heading/60 p-4 border border-white/5 rounded-2xl max-h-[160px] overflow-y-auto">
                    <span className="text-[10px] font-bold text-natural-sand/60 uppercase font-mono block mb-1">Evidências Encontradas:</span>
                    {matchReasoning.map((r, i) => (
                      <p key={i} className="text-xs text-natural-sand/90 leading-relaxed font-sans flex items-start gap-1 pb-1">
                        <span className="text-natural-sage shrink-0 select-none">✓</span>
                        {r}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Empty state */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4 text-white/40"
                >
                  <Network className="w-16 h-16 text-white/15 mx-auto" />
                  <p className="text-xs max-w-xs mx-auto">
                    Escolha uma demanda industrial e um competidor local no formulário ao lado para calcular seu alinhamento estratégico de forma preditiva.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            {simulationComplete && matchScore !== null ? (
              <button
                onClick={handleEstablishConnection}
                className="w-full bg-natural-sage hover:bg-natural-sage/90 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Intermediar Conexão (Match)
              </button>
            ) : (
              <span className="text-[10px] font-mono text-white/40 leading-none block">
                Fórmula de inteligência anti-achismo de Pinhalzinho.
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
