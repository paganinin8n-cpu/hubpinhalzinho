/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Demanda, Sector } from "../types";
import { Plus, Search, Filter, Calendar, MapPin, Tag, Briefcase, FileText, X, Check, Eye } from "lucide-react";

interface DemandasViewProps {
  demandas: Demanda[];
  onAddDemanda: (demanda: Omit<Demanda, "id" | "publicadoEm" | "status">) => void;
  onSelect?: (demanda: Demanda) => void;
  selectedDemanda?: Demanda | null;
  onCloseDetails?: () => void;
}

const SETORES: Sector[] = [
  "Metalmecânico",
  "Moveleiro",
  "Madeireiro",
  "Laticínio / Alimentos",
  "Tecnologia / TI",
  "Serviços"
];

export default function DemandasView({
  demandas,
  onAddDemanda,
  onSelect,
  selectedDemanda,
  onCloseDetails
}: DemandasViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<Sector | "Todos">("Todos");
  const [isAdding, setIsAdding] = useState(false);

  // New Demand Form states
  const [newTitulo, setNewTitulo] = useState("");
  const [newEmpresa, setNewEmpresa] = useState("");
  const [newSetor, setNewSetor] = useState<Sector>("Metalmecânico");
  const [newDescricao, setNewDescricao] = useState("");
  const [newVolume, setNewVolume] = useState("");
  const [newTagsString, setNewTagsString] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitulo || !newEmpresa || !newDescricao) return;

    const tagsArray = newTagsString
      ? newTagsString.split(",").map((t) => t.trim()).filter(Boolean)
      : [newSetor];

    onAddDemanda({
      titulo: newTitulo,
      empresa: newEmpresa,
      setor: newSetor,
      descricao: newDescricao,
      volume: newVolume || "Sob consulta",
      localizacao: "Pinhalzinho - SC",
      tags: tagsArray
    });

    // Reset Form
    setNewTitulo("");
    setNewEmpresa("");
    setNewDescricao("");
    setNewVolume("");
    setNewTagsString("");
    setIsAdding(false);
  };

  const filtered = demandas.filter((dem) => {
    const matchesSearch =
      dem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dem.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dem.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector = selectedSector === "Todos" || dem.setor === selectedSector;

    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      
      {/* View Header with Statistics panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-natural-heading">
            Demandas Industriais
          </h1>
          <p className="text-sm text-natural-olive">
            Acompanhe o mapeamento em tempo real de gargalos e suprimentos necessários em Pinhalzinho.
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="bg-natural-clay hover:bg-natural-clay/90 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm shadow-natural-clay/10 text-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Nova Demanda
        </button>
      </div>

      {/* Filter and Search Bar designed for efficiency and high accessibility visual contrast */}
      <div className="bg-white border border-natural-border rounded-2xl p-4 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-natural-olive/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por termo, empresa ou necessidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-2 focus:ring-natural-sage/15 text-sm transition-all"
          />
        </div>

        {/* Sector filtering tabs/dropdown */}
        <div className="md:col-span-4 relative">
          <div className="flex items-center gap-2">
            <Filter className="text-natural-olive/60 w-4 h-4 shrink-0" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as Sector | "Todos")}
              className="w-full bg-natural-sand/20 border border-natural-border rounded-xl px-3 py-2 text-natural-dark focus:outline-hidden focus:border-natural-sage focus:ring-2 focus:ring-natural-sage/15 text-xs sm:text-sm font-medium transition-all"
            >
              <option value="Todos">Todos os Setores</option>
              {SETORES.map((sect) => (
                <option key={sect} value={sect}>
                  {sect}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter of active filtered items */}
        <div className="md:col-span-3 text-right">
          <span className="text-xs font-semibold text-natural-olive bg-natural-sand border border-natural-border/60 px-2.5 py-1.5 rounded-full inline-block">
            {filtered.length} demandas encontradas
          </span>
        </div>
      </div>

      {/* Grid listing demands */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((dem) => (
          <motion.div
            layoutId={`dem-card-${dem.id}`}
            key={dem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-natural-border hover:border-natural-clay/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="text-xs font-semibold text-natural-clay bg-natural-clay/10 px-2.5 py-1 rounded-full border border-natural-clay/15">
                  {dem.setor}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  dem.status === "Ativo"
                    ? "bg-natural-sage/10 text-natural-sage border-natural-sage/20"
                    : dem.status === "Em Conexão"
                    ? "bg-natural-clay/10 text-natural-clay border-natural-clay/20"
                    : "bg-natural-olive/10 text-natural-olive border-natural-border"
                }`}>
                  {dem.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-natural-heading group-hover:text-natural-clay transition-colors text-base">
                  {dem.titulo}
                </h3>
                <span className="text-xs font-semibold text-natural-olive font-mono block mt-1">
                  Requisitado por: {dem.empresa}
                </span>
              </div>

              <p className="text-sm text-natural-dark/95 line-clamp-3 leading-relaxed">
                {dem.descricao}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {dem.tags.map((tg, i) => (
                  <span key={i} className="text-[11px] text-natural-olive bg-natural-sand px-2 py-0.5 rounded-md font-medium">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-natural-border/40 pt-3 mt-1 flex items-center justify-between">
              <div className="flex gap-4 text-xs font-mono text-natural-olive">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-natural-olive/60" />
                  Vol: <strong className="text-natural-dark">{dem.volume}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-natural-olive/60" />
                  {dem.localizacao}
                </span>
              </div>

              <button
                onClick={() => onSelect?.(dem)}
                className="text-xs font-semibold text-natural-clay hover:text-natural-clay/80 flex items-center gap-1 px-2.5 py-1.5 hover:bg-natural-sand rounded-lg transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                Analisar
              </button>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-500 bg-slate-50/50">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-slate-700 text-sm">Nenhuma demanda correspondente.</p>
            <p className="text-xs text-slate-500 mt-1">
              Tente redefinir os filtros de busca ou cadastre uma nova demanda no botão acima.
            </p>
          </div>
        )}
      </div>

      {/* Modal - Cadastro de Nova Demanda */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setIsAdding(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-display font-bold">Mapear Nova Demanda Industrial</h2>
              </div>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Título da Demanda / Necessidade *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Usinagem CNC de peças estruturais"
                  value={newTitulo}
                  onChange={(e) => setNewTitulo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Empresa Solicitante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Aurora Alimentos"
                    value={newEmpresa}
                    onChange={(e) => setNewEmpresa(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Setor Econômico *
                  </label>
                  <select
                    value={newSetor}
                    onChange={(e) => setNewSetor(e.target.value as Sector)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:border-indigo-500 text-sm font-medium transition-all"
                  >
                    {SETORES.map((sect) => (
                      <option key={sect} value={sect}>
                        {sect}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Volume / Frequência Estimada
                </label>
                <input
                  type="text"
                  placeholder="Ex: 500 peças / mês ou 1 projeto único"
                  value={newVolume}
                  onChange={(e) => setNewVolume(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Descrição Detalhada do Requisito *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escreva os requisitos e tolerâncias técnicas necessárias para incentivar o match ideal com pequenos negócios e MEIs de Pinhalzinho..."
                  value={newDescricao}
                  onChange={(e) => setNewDescricao(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tags de Competência (Separadas por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="Ex: usinagem, torneamento, inox, MEI"
                  value={newTagsString}
                  onChange={(e) => setNewTagsString(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  As etiquetas facilitam o cálculo de compatibilidade algorítmico do HUB.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  Publicar Requisito
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal - Detalhes da Demanda (Análise) */}
      <AnimatePresence>
        {selectedDemanda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={onCloseDetails} />
            <motion.div
              layoutId={`dem-card-${selectedDemanda.id}`}
              className="bg-white border border-slate-200 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10"
            >
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">{selectedDemanda.setor}</span>
                  <h2 className="text-lg font-display font-medium text-white">Análise da Demanda</h2>
                </div>
                <button onClick={onCloseDetails} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Necessidade</h3>
                  <p className="text-lg font-bold text-slate-900">{selectedDemanda.titulo}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Mapeado por: {selectedDemanda.empresa}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Localização & Volume</h3>
                  <div className="flex gap-4 text-xs font-semibold text-slate-800 font-mono">
                    <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      {selectedDemanda.localizacao}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      {selectedDemanda.volume}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Descrição Técnica</h3>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {selectedDemanda.descricao}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Instrução ao Agente</h3>
                  <p className="text-xs text-slate-600 bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl leading-relaxed">
                    <strong>Ação Diplomática:</strong> Esta demanda está aberta à correspondência de parceiros. Utilize a aba <strong>Oportunidades de Conexão</strong> para calcular potenciais compatibilidades automáticas locais e iniciar trâmites de diplomacia industrial.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={onCloseDetails}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all"
                  >
                    Fechar Detalhes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
