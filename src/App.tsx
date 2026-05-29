/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  INITIAL_DEMANDAS,
  INITIAL_SOLUCOES,
  INITIAL_CONEXOES,
  INITIAL_PARCEIROS
} from "./data";
import { Demanda, Solucao, Conexao, Parceiro } from "./types";
import {
  LayoutDashboard,
  Megaphone,
  Briefcase,
  Handshake,
  TrendingUp,
  Users,
  Bell,
  Search,
  CheckCircle,
  Menu,
  X,
  Plus,
  Compass,
  FileBarChart,
  LogOut,
  MapPin,
  Sparkles,
  Zap,
  Bot
} from "lucide-react";

// Import custom views
import DashboardView from "./components/DashboardView";
import DemandasView from "./components/DemandasView";
import SolucoesView from "./components/SolucoesView";
import ConexoesView from "./components/ConexoesView";
import OportunidadesView from "./components/OportunidadesView";
import ParceirosView from "./components/ParceirosView";
import RelatoriosView from "./components/RelatoriosView";

type ActiveTab = "dashboard" | "demandas" | "solucoes" | "conexoes" | "oportunidades" | "parceiros" | "notificacoes" | "relatorios";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated live database states
  const [demandas, setDemandas] = useState<Demanda[]>(INITIAL_DEMANDAS);
  const [solucoes, setSolucoes] = useState<Solucao[]>(INITIAL_SOLUCOES);
  const [conexoes, setConexoes] = useState<Conexao[]>(INITIAL_CONEXOES);
  const [parceiros, setParceiros] = useState<Parceiro[]>(INITIAL_PARCEIROS);

  // Selected item detail states
  const [selectedDemand, setSelectedDemand] = useState<Demanda | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solucao | null>(null);

  // Match Simulation variables
  const [preselectedDemandId, setPreselectedDemandId] = useState("");
  const [preselectedSolutionId, setPreselectedSolutionId] = useState("");

  // Notifications system state representing agent feeds
  const [notis, setNotis] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: "1", text: "Zagonel S.A. publicou uma nova solicitação urgente de fiação e circuitos eletrônicos.", time: "Há 4 horas", read: false },
    { id: "2", text: "Acordo estabelecido com sucesso entre Zagonel S.A. e MEI EletroTech.", time: "Há 2 dias", read: true },
    { id: "3", text: "Aurora Alimentos expressou demanda sazonal por embalagens corrugadas biodegradáveis.", time: "Há 5 dias", read: true }
  ]);

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);

  // Form submission callback operations
  const handleAddDemanda = (newDem: Omit<Demanda, "id" | "publicadoEm" | "status">) => {
    const freshDem: Demanda = {
      ...newDem,
      id: `dem-${Date.now()}`,
      publicadoEm: "Agora mesmo",
      status: "Ativo"
    };
    setDemandas([freshDem, ...demandas]);

    // Create a live feed log
    setNotis([
      { id: `noti-${Date.now()}`, text: `Nova demanda publicada por ${newDem.empresa}: "${newDem.titulo}".`, time: "Agora", read: false },
      ...notis
    ]);
  };

  const handleAddSolucao = (newSol: Omit<Solucao, "id" | "publicadoEm" | "status">) => {
    const freshSol: Solucao = {
      ...newSol,
      id: `sol-${Date.now()}`,
      publicadoEm: "Agora mesmo",
      status: "Disponível"
    };
    setSolucoes([freshSol, ...solucoes]);

    // Create a live feed log
    setNotis([
      { id: `noti-${Date.now()}`, text: `Nova competência cadastrada por ${newSol.empresa}: "${newSol.titulo}".`, time: "Agora", read: false },
      ...notis
    ]);
  };

  const handleAddParceiro = (newPar: Omit<Parceiro, "id">) => {
    const freshPar: Parceiro = {
      ...newPar,
      id: `par-${Date.now()}`
    };
    setParceiros([freshPar, ...parceiros]);
  };

  const handleConexaoStatusUpdate = (id: string, newStatus: Conexao["status"], feedback?: string) => {
    setConexoes(
      conexoes.map((c) => (c.id === id ? { ...c, status: newStatus, feedback: feedback || c.feedback } : c))
    );
  };

  const handleEstablishConexao = (demandaId: string, solucaoId: string, score: number) => {
    const dem = demandas.find((d) => d.id === demandaId);
    const sol = solucoes.find((s) => s.id === solucaoId);
    if (!dem || !sol) return;

    const freshCon: Conexao = {
      id: `con-${Date.now()}`,
      demandaId,
      solucaoId,
      demandaTitulo: dem.titulo,
      demandaEmpresa: dem.empresa,
      solucaoTitulo: sol.titulo,
      solucaoEmpresa: sol.empresa,
      matchScore: score,
      dataConexao: new Date().toISOString().split("T")[0],
      status: "Match Simulado",
      feedback: `Simulado pelo agente ${dem.empresa} e ${sol.empresa} com índice de compatibilidade de ${score}%.`
    };

    setConexoes([freshCon, ...conexoes]);
    setActiveTab("conexoes");

    // Push alert
    setNotis([
      { id: `noti-${Date.now()}`, text: `Sincronização iniciada entre ${dem.empresa} e ${sol.empresa} (Compatibilidade ${score}%).`, time: "Agora", read: false },
      ...notis
    ]);
  };

  // Quick navigation link to simulator
  const handleStartSimulationWith = (demandaId: string, solucaoId: string) => {
    setPreselectedDemandId(demandaId);
    setPreselectedSolutionId(solucaoId);
    setActiveTab("oportunidades");
  };

  // Nav side items data matching exactly Slide 15 in Portuguese
  const sidebarItems: Array<{ id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "demandas", label: "Demandas", icon: Megaphone },
    { id: "solucoes", label: "Soluções", icon: Briefcase },
    { id: "conexoes", label: "Conexões", icon: Handshake },
    { id: "oportunidades", label: "Oportunidades", icon: Compass },
    { id: "parceiros", label: "Parceiros", icon: Users },
    { id: "relatorios", label: "Relatórios", icon: FileBarChart }
  ];

  return (
    <div className="min-h-screen bg-natural-bg flex font-sans antialiased text-natural-dark">
      
      {/* LEFT SIDEBAR - Desktop view exactly like in Slide 15 prototype */}
      <aside className="w-64 bg-natural-dark border-r border-natural-border/30 shrink-0 hidden lg:flex flex-col justify-between select-none">
        
        {/* Core Sidebar Header featuring stylized Net Logo */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            {/* Minimal SVG Node Network representing Slide 2 and 6 ecosystem */}
            <div className="relative w-9 h-9 bg-natural-sage/20 rounded-xl flex items-center justify-center border border-natural-sage/30 shrink-0">
              <NetworkCircleIcon className="w-5 h-5 text-natural-sage" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-natural-sage block tracking-wider uppercase leading-none font-display">
                Plataforma HUB
              </span>
              <h1 className="text-[15px] font-black text-white tracking-tight leading-tight">
                PINHALZINHO INDÚSTRIA+
              </h1>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setPreselectedDemandId("");
                    setPreselectedSolutionId("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-xs sm:text-sm cursor-pointer ${
                    activeTab === item.id
                      ? "bg-natural-sage text-white shadow-md shadow-natural-sage/15"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info: Clédia profile, status of integration, logout */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-natural-clay flex items-center justify-center text-white font-bold border border-white/5 font-display">
                CT
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-natural-sage border-2 border-natural-dark rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs text-white truncate leading-none">Clédia Thome</p>
              <p className="text-[10px] text-white/50 truncate mt-1">Agente de Desenv.</p>
            </div>
          </div>
          <p className="text-[10px] text-natural-sage font-mono flex items-center gap-1 leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-natural-sage animate-ping inline-block" />
            Dados reais unificados
          </p>
        </div>
      </aside>

      {/* MOBILE HEADER & DRAWER DRAWER SECTION */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-natural-dark border-b border-natural-border/20 flex items-center justify-between px-4 z-40 select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-natural-sage/20 rounded-lg flex items-center justify-center border border-natural-sage/30">
            <NetworkCircleIcon className="w-4 h-4 text-natural-sage" />
          </div>
          <h1 className="text-xs font-black text-white tracking-tight">
            HUB PINHALZINHO INDÚSTRIA+
          </h1>
        </div>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-30" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-natural-dark border-r border-white/10 p-6 z-40 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-black text-white text-xs">Menu HUB Indústria+</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                          setPreselectedDemandId("");
                          setPreselectedSolutionId("");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-semibold text-xs cursor-pointer ${
                          activeTab === item.id
                            ? "bg-natural-sage text-white shadow-md"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {sidebarItems.find((s) => s.id === item.id)?.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-natural-clay flex items-center justify-center text-white text-xs font-bold font-display">
                  CT
                </div>
                <div>
                  <p className="font-bold text-xs text-white">Clédia Thome</p>
                  <p className="text-[10px] text-white/50">Agente de Pinhalzinho</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CORE FRAME FOR VIEWS AND WORKSPACE HEADER */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        
        {/* Workspace Top Header Bar */}
        <header className="h-16 border-b border-natural-border/80 bg-white/90 backdrop-blur-md px-6 hidden sm:flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Pinhalzinho, Santa Catarina
            </span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Notifications feed dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600 relative cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {notis.some((n) => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
                )}
              </button>

              {/* Alerts Dropdown content list */}
              {showNotificationsDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotificationsDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 py-2">
                    <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                      <span className="text-xs font-bold text-slate-800">Alertas de Sincronização</span>
                      <button
                        onClick={() => {
                          setNotis(notis.map((n) => ({ ...n, read: true })));
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Marcar lidos
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                      {notis.map((n) => (
                        <div key={n.id} className={`p-3.5 text-xs transition-colors ${!n.read ? "bg-indigo-50/40" : ""}`}>
                          <p className="text-slate-700 leading-normal">{n.text}</p>
                          <span className="text-[10px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile status widget */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-natural-border">
              <div className="text-right">
                <p className="text-xs font-bold text-natural-dark leading-none">Clédia Thome</p>
                <span className="text-[10px] text-natural-olive font-mono font-bold uppercase tracking-wider block mt-0.5">
                  Prefeitura / SC
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-natural-clay text-white text-xs font-bold flex items-center justify-center">
                CT
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic scrollable viewport displaying selected and active view */}
        <div className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "dashboard" && (
                <DashboardView
                  demandas={demandas}
                  solucoes={solucoes}
                  conexoes={conexoes}
                  onNavigate={(tab) => {
                    if (tab === "oportunidades" || tab === "relatorios" || tab === "demandas" || tab === "solucoes" || tab === "conexoes" || tab === "parceiros") {
                      setActiveTab(tab as ActiveTab);
                    }
                  }}
                  onSelectDemand={(dem) => setSelectedDemand(dem)}
                  onSelectSolution={(sol) => setSelectedSolution(sol)}
                  onStartSimulationWith={handleStartSimulationWith}
                />
              )}

              {activeTab === "demandas" && (
                <DemandasView
                  demandas={demandas}
                  onAddDemanda={handleAddDemanda}
                  onSelect={(dem) => setSelectedDemand(dem)}
                  selectedDemanda={selectedDemand}
                  onCloseDetails={() => setSelectedDemand(null)}
                />
              )}

              {activeTab === "solucoes" && (
                <SolucoesView
                  solucoes={solucoes}
                  onAddSolucao={handleAddSolucao}
                  onSelect={(sol) => setSelectedSolution(sol)}
                  selectedSolucao={selectedSolution}
                  onCloseDetails={() => setSelectedSolution(null)}
                />
              )}

              {activeTab === "conexoes" && (
                <ConexoesView
                  conexoes={conexoes}
                  onUpdateStatus={handleConexaoStatusUpdate}
                />
              )}

              {activeTab === "oportunidades" && (
                <OportunidadesView
                  demandas={demandas}
                  solucoes={solucoes}
                  onConnect={handleEstablishConexao}
                  preSelectedDemandId={preselectedDemandId}
                  preSelectedSolutionId={preselectedSolutionId}
                />
              )}

              {activeTab === "parceiros" && (
                <ParceirosView
                  parceiros={parceiros}
                  onAddParceiro={handleAddParceiro}
                />
              )}

              {activeTab === "relatorios" && (
                <RelatoriosView />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

    </div>
  );
}

// Minimal stylized logo SVG representations for premium craftsmanship look
function NetworkCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <circle cx="12" cy="19" r="3" />
      <line x1="12" y1="8" x2="6" y2="12" />
      <line x1="12" y1="8" x2="18" y2="12" />
      <line x1="6" y1="12" x2="12" y2="16" />
      <line x1="18" y1="12" x2="12" y2="16" />
    </svg>
  );
}
