/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Parceiro } from "../types";
import { Users, Mail, Phone, User, Pin, Plus, X, Search, Building } from "lucide-react";

interface ParceirosViewProps {
  parceiros: Parceiro[];
  onAddParceiro: (parceiro: Omit<Parceiro, "id">) => void;
}

export default function ParceirosView({ parceiros, onAddParceiro }: ParceirosViewProps) {
  const [selectedType, setSelectedType] = useState<Parceiro["tipo"] | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<Parceiro["tipo"]>("Indústria");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !responsavel) return;

    onAddParceiro({ nome, tipo, email, telefone, responsavel });

    // Reset Form
    setNome("");
    setTipo("Indústria");
    setEmail("");
    setTelefone("");
    setResponsavel("");
    setIsAdding(false);
  };

  const filtered = parceiros.filter((p) => {
    const matchesType = selectedType === "Todos" || p.tipo === selectedType;
    const matchesSearch =
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const categoryDecorations = {
    "Indústria": "bg-natural-clay/10 border-natural-clay/15 text-natural-clay",
    "Universidade": "bg-natural-sage/10 border-natural-sage/15 text-natural-sage",
    "Poder Público": "bg-natural-sand border-natural-border text-natural-dark",
    "Empreendedor": "bg-natural-olive/10 border-natural-olive/15 text-natural-olive",
    "MEI": "bg-natural-sage/10 border-natural-sage/15 text-natural-sage",
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-natural-heading">
            Parceiros de Ecossistema
          </h1>
          <p className="text-sm text-natural-olive">
            Pessoas e entidades cadastradas e articuladas sob o modelo do HUB Pinhalzinho.
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="bg-natural-dark hover:bg-natural-dark/90 text-white font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all text-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Registrar Novo Parceiro
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-natural-border rounded-2xl p-4 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search input */}
        <div className="md:col-span-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-natural-olive/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar parceiro por nome, e-mail ou gestor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/10 text-sm transition-all"
          />
        </div>

        {/* Categorization filter */}
        <div className="md:col-span-6 flex flex-wrap gap-1.5 justify-start md:justify-end">
          {(["Todos", "Indústria", "Universidade", "Poder Público", "Empreendedor", "MEI"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedType(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all ${
                selectedType === cat
                  ? "bg-natural-dark border-natural-dark text-white shadow-xs"
                  : "bg-white border-natural-border text-natural-olive hover:text-natural-heading hover:bg-natural-sand/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((par) => (
          <motion.div
            key={par.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-natural-border rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-natural-sage/30 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${categoryDecorations[par.tipo]}`}>
                  {par.tipo}
                </span>
                <Building className="w-4 h-4 text-natural-olive/60" />
              </div>

              <div>
                <h3 className="font-bold text-natural-heading text-base">
                  {par.nome}
                </h3>
                <p className="text-xs text-natural-olive font-mono flex items-center gap-1 mt-1">
                  <User className="w-3.5 h-3.5 text-natural-olive/55" />
                  Rep: <span className="text-natural-dark font-semibold">{par.responsavel}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-natural-border/30 pt-3 mt-1 space-y-1.5">
              {par.email && (
                <a href={`mailto:${par.email}`} className="text-xs text-natural-olive hover:text-natural-sage flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5 text-natural-olive/50 shrink-0" />
                  <span className="truncate">{par.email}</span>
                </a>
              )}
              {par.telefone && (
                <div className="text-xs text-natural-olive flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-natural-olive/50 shrink-0" />
                  <span>{par.telefone}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal - Cadastro de Novo Parceiro */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setIsAdding(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white border border-natural-border rounded-2xl shadow-xl w-full max-w-lg overflow-hidden z-10"
          >
            <div className="bg-natural-dark text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-natural-sage" />
                <h2 className="text-lg font-display font-bold">Registrar Novo Parceiro do HUB</h2>
              </div>
              <button onClick={() => setIsAdding(false)} className="text-natural-sand/80 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-natural-dark uppercase tracking-wider mb-1">
                  Nome da Entidade / Empresa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cerâmica Pinhalzinho S/A"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-sm transition-all focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-natural-dark uppercase tracking-wider mb-1">
                    Categoria do Pilar *
                  </label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as Parceiro["tipo"])}
                    className="w-full px-3.5 py-2.5 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-sm font-medium transition-all cursor-pointer"
                  >
                    <option value="Indústria">Indústria</option>
                    <option value="Universidade">Universidade (Academia)</option>
                    <option value="Poder Público">Poder Público</option>
                    <option value="Empreendedor">Empreendedor (Startup)</option>
                    <option value="MEI">MEI / Pequeno Negócio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-natural-dark uppercase tracking-wider mb-1">
                    Gestor / Responsável *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cláudio Silva"
                    value={responsavel}
                    onChange={(e) => setResponsavel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-sm transition-all focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-natural-dark uppercase tracking-wider mb-1">
                    E-mail Corporativo
                  </label>
                  <input
                    type="email"
                    placeholder="Ex: contato@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-sm transition-all focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-natural-dark uppercase tracking-wider mb-1">
                    Telefone de Contato
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: (49) 99999-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-natural-sand/20 border border-natural-border rounded-xl text-natural-dark placeholder:text-natural-olive/50 focus:outline-hidden focus:border-natural-sage focus:ring-1 focus:ring-natural-sage/15 text-sm transition-all focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-natural-border/30 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-natural-border rounded-xl text-natural-olive hover:bg-natural-sand/30 text-sm font-medium transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-natural-dark hover:bg-natural-dark/90 text-white rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Registrar Parceiro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
