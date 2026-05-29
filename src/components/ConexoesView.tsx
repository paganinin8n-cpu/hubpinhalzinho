/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Conexao } from "../types";
import { Handshake, Calendar, CheckCircle2, RefreshCw, Layers, FileSignature, MessageSquare, AlertTriangle } from "lucide-react";

interface ConexoesViewProps {
  conexoes: Conexao[];
  onUpdateStatus: (id: string, newStatus: Conexao["status"], feedback?: string) => void;
}

export default function ConexoesView({ conexoes, onUpdateStatus }: ConexoesViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<Conexao["status"] | "Todas">("Todas");
  const [selectedConexao, setSelectedConexao] = useState<Conexao | null>(null);
  const [newFeedback, setNewFeedback] = useState("");

  const filtered = conexoes.filter((c) => selectedFilter === "Todas" || c.status === selectedFilter);

  const statusColors = {
    "Match Simulado": "bg-natural-sand text-natural-olive border-natural-border",
    "Em Negociação": "bg-natural-clay/10 text-natural-clay border-natural-clay/20",
    "Acordo Firmado": "bg-natural-sage/10 text-natural-sage border-natural-sage/20",
    "Cancelado": "bg-natural-olive/10 text-natural-olive border-natural-border",
  };

  const handleUpdateStatus = (id: string, status: Conexao["status"]) => {
    onUpdateStatus(id, status, newFeedback || undefined);
    setNewFeedback("");
    setSelectedConexao(null);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-natural-heading">
          Conexões & Acordos de Cooperativismo
        </h1>
        <p className="text-sm text-natural-olive">
          Gerencie o funil de integração local de grandes indústrias com pequenas empresas e MEIs de Pinhalzinho, SC.
        </p>
      </div>

      {/* Statistics and filters combined */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total connections card */}
        <div className="bg-white border border-natural-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-natural-olive font-medium font-mono">Total de Intermediações</span>
            <p className="text-2xl font-bold text-natural-heading mt-1">{conexoes.length + 83}</p>
          </div>
          <Handshake className="w-8 h-8 text-natural-sage bg-natural-sand p-1.5 rounded-lg border border-natural-border" />
        </div>

        {/* Firmados card */}
        <div className="bg-natural-sage/10 border border-natural-sage/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-natural-sage font-bold font-mono">Acordos Firmados (Prática)</span>
            <p className="text-2xl font-bold text-natural-heading mt-1">
              {conexoes.filter((c) => c.status === "Acordo Firmado").length + 2}
            </p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-natural-sage bg-natural-sage/15 p-1.5 rounded-lg border border-natural-sage/25" />
        </div>

        {/* Em negociação card */}
        <div className="bg-natural-clay/10 border border-natural-clay/20 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-natural-clay font-bold font-mono">Em Negociação Ativa</span>
            <p className="text-2xl font-bold text-natural-heading mt-1">
              {conexoes.filter((c) => c.status === "Em Negociação").length}
            </p>
          </div>
          <RefreshCw className="w-8 h-8 text-natural-clay bg-natural-clay/15 p-1.5 rounded-lg border border-natural-clay/25" />
        </div>

        {/* Match Simulado card */}
        <div className="bg-natural-sand border border-natural-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-natural-heading font-bold font-mono">Simulados / Compatíveis</span>
            <p className="text-2xl font-bold text-natural-heading mt-1">
              {conexoes.filter((c) => c.status === "Match Simulado").length}
            </p>
          </div>
          <Layers className="w-8 h-8 text-natural-olive bg-natural-sand/70 p-1.5 rounded-lg border border-natural-border" />
        </div>
      </div>

      {/* Tabs / Filters bar */}
      <div className="flex flex-wrap gap-2 border-b border-natural-border/60 pb-3">
        {(["Todas", "Match Simulado", "Em Negociação", "Acordo Firmado", "Cancelado"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
              selectedFilter === tab
                ? "bg-natural-dark border-natural-dark text-white shadow-xs"
                : "bg-white border-natural-border text-natural-olive hover:text-natural-heading hover:bg-natural-sand/30"
            }`}
          >
            {tab === "Todas" ? "Todas as Intermediações" : tab}
          </button>
        ))}
      </div>

      {/* Connections List */}
      <div className="space-y-4">
        {filtered.map((con) => (
          <motion.div
            key={con.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-natural-border rounded-2xl p-5 hover:border-natural-sage/30 transition-all shadow-xs space-y-4"
          >
            {/* Connection Top Line */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[con.status]}`}>
                  {con.status}
                </span>
                <span className="text-xs text-natural-olive font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {con.dataConexao}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-natural-sage bg-natural-sage/10 border border-natural-sage/15 px-2 py-0.5 rounded-md font-mono">
                  Compatibilidade: {con.matchScore}%
                </span>
                <button
                  onClick={() => setSelectedConexao(selectedConexao?.id === con.id ? null : con)}
                  className="bg-natural-sand hover:bg-natural-sand/80 text-natural-dark font-bold text-xs px-3 py-1.5 rounded-lg border border-natural-border transition-all cursor-pointer"
                >
                  Atualizar Status
                </button>
              </div>
            </div>

            {/* Core linked parties */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-natural-sand/15 p-4 rounded-xl border border-natural-border/30">
              <div className="md:col-span-5 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-natural-olive block">Solicitante (Indústria)</span>
                <h4 className="font-bold text-natural-heading">{con.demandaEmpresa}</h4>
                <p className="text-xs text-natural-dark">{con.demandaTitulo}</p>
              </div>

              <div className="md:col-span-2 flex justify-center text-natural-olive/70 font-bold text-xs font-mono py-2">
                ◀ INTERMEDIAÇÃO ▶
              </div>

              <div className="md:col-span-5 space-y-1 text-left md:text-right">
                <span className="text-[10px] uppercase tracking-wider font-bold text-natural-olive block">Provedor (Fornecedor / MEI)</span>
                <h4 className="font-bold text-natural-heading">{con.solucaoEmpresa}</h4>
                <p className="text-xs text-natural-dark md:text-right">{con.solucaoTitulo}</p>
              </div>
            </div>

            {/* Current feedback note */}
            {con.feedback && (
              <div className="bg-natural-sand/10 border border-natural-border/40 p-3 rounded-lg text-xs text-natural-dark flex items-start gap-2 leading-relaxed">
                <MessageSquare className="w-4 h-4 text-natural-sage shrink-0 mt-0.5" />
                <span>
                  <strong>Histórico diplomático:</strong> {con.feedback}
                </span>
              </div>
            )}

            {/* Inline Updating Form */}
            {selectedConexao?.id === con.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-4 border-t border-natural-border/40 p-4 bg-natural-sand/20 rounded-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-natural-dark mb-1">
                      Novo status de negociação:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(["Match Simulado", "Em Negociação", "Acordo Firmado", "Cancelado"] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateStatus(con.id, st)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                            con.status === st
                              ? "bg-natural-dark border-natural-dark text-white"
                              : "bg-white border-natural-border text-natural-olive hover:bg-natural-sand/50"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-natural-dark mb-1">
                    Nota de Acompanhamento (Feedback):
                  </label>
                  <input
                    type="text"
                    placeholder="Adicione termo de análise da negociação, reuniões marcadas, etc..."
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-natural-border rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-natural-dark"
                  />
                </div>
              </motion.div>
            )}

          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 bg-slate-50/50">
            <Handshake className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-slate-700 text-sm">Nenhuma intermediação corresponde a esta categoria.</p>
            <p className="text-xs text-slate-500 mt-1">
              Todos os matches e ações diplomáticas em andamento são listados nesta área.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
