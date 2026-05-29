/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Award, CheckCircle, PieChart, BarChart2 } from "lucide-react";

export default function RelatoriosView() {
  // Let's draw high fidelity SVG components directly in React for complete styling reliability
  const monthlyConnections = [15, 28, 45, 62, 86]; // Jan -> May
  const sectorShare = [
    { name: "Metalmecânico", count: 42, color: "#CE1B1B" }, // Scarlet Red from Flag
    { name: "Laticínio / Alimentos", count: 28, color: "#0C7A43" }, // Pine Green from Flag
    { name: "Moveleiro", count: 18, color: "#3D5A4B" }, // Olive from Flag Theme
    { name: "Tecnologia / TI", count: 8, color: "#D69E2E" }, // Gold from Flag Crown
    { name: "Madeireiro / Outros", count: 4, color: "#0A2E1C" }, // Dark forest green from Flag Theme
  ];

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-natural-heading">
          Relatórios & Métricas Decisivas
        </h1>
        <p className="text-sm text-natural-olive">
          Substitua o achismo por dados empíricos: métricas de evolução industrial e conectividade territorial em Pinhalzinho.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend line SVG Chart - Accessible Indigo colors */}
        <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-natural-sage w-5 h-5" />
              <h3 className="font-bold text-natural-heading font-display">Conexões Estabelecidas (Acumulado)</h3>
            </div>
            
            <p className="text-xs text-natural-olive mb-6 font-medium">
              Evolução mensal do número absoluto de matches auxiliados pelo HUB em Pinhalzinho.
            </p>

            {/* Area SVG Chart */}
            <div className="w-full h-48 relative">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(222, 213, 196, 0.4)" strokeWidth="1" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(222, 213, 196, 0.4)" strokeWidth="1" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(222, 213, 196, 0.4)" strokeWidth="1" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(222, 213, 196, 0.4)" strokeWidth="1.5" />

                {/* Left labels */}
                <text x="15" y="25" fill="#a2aa98" fontSize="10" fontFamily="monospace">90</text>
                <text x="15" y="75" fill="#a2aa98" fontSize="10" fontFamily="monospace">60</text>
                <text x="15" y="125" fill="#a2aa98" fontSize="10" fontFamily="monospace">30</text>
                <text x="15" y="175" fill="#a2aa98" fontSize="10" fontFamily="monospace">0</text>

                {/* Chart Path elements (points Jan: [50, 160], Feb: [150, 140], Mar: [250, 110], Apr: [350, 80], May: [450, 30]) */}
                <path
                  d="M 50,170 L 50,160 L 150,140 L 250,110 L 350,80 L 450,30 L 450,170 Z"
                  fill="url(#natural-sage-gradient)"
                  opacity="0.1"
                />
                <polyline
                  fill="none"
                  stroke="#0C7A43"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,160 150,140 250,110 350,80 450,30"
                />

                {/* Point nodes */}
                <circle cx="50" cy="160" r="5" fill="#ffffff" stroke="#0C7A43" strokeWidth="2.5" />
                <circle cx="150" cy="140" r="5" fill="#ffffff" stroke="#0C7A43" strokeWidth="2.5" />
                <circle cx="250" cy="110" r="5" fill="#ffffff" stroke="#0C7A43" strokeWidth="2.5" />
                <circle cx="350" cy="80" r="5" fill="#ffffff" stroke="#0C7A43" strokeWidth="2.5" />
                <circle cx="450" cy="30" r="6" fill="#C87A53" stroke="#ffffff" strokeWidth="2.5" />

                {/* X labels */}
                <text x="50" y="192" fill="#5E644D" fontSize="10" textAnchor="middle" fontWeight="bold">Jan</text>
                <text x="150" y="192" fill="#5E644D" fontSize="10" textAnchor="middle" fontWeight="bold">Fev</text>
                <text x="250" y="192" fill="#5E644D" fontSize="10" textAnchor="middle" fontWeight="bold">Mar</text>
                <text x="350" y="192" fill="#5E644D" fontSize="10" textAnchor="middle" fontWeight="bold">Abr</text>
                <text x="450" y="192" fill="#C87A53" fontSize="11" textAnchor="middle" fontWeight="bold">Maio</text>

                <defs>
                  <linearGradient id="natural-sage-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0C7A43" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="border-t border-natural-border/30 pt-3 mt-4 flex justify-between items-center text-xs font-mono">
            <span className="text-natural-olive">Aceleração trimestral</span>
            <span className="text-natural-clay font-bold font-sans flex items-center gap-0.5">
              ▲ +91.1% no período
            </span>
          </div>
        </div>

        {/* Sector representation - Bar chart style */}
        <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 font-display">
              <BarChart2 className="text-natural-clay w-5 h-5" />
              <h3 className="font-bold text-natural-heading">Demanda Setorial Unificada (%)</h3>
            </div>
            
            <p className="text-xs text-natural-olive mb-6 font-medium">
              Representação percentual de demandas publicadas agrupadas por segmento em Pinhalzinho.
            </p>

            <div className="space-y-3">
              {sectorShare.map((sec, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-natural-dark">
                    <span>{sec.name}</span>
                    <span className="font-mono">{sec.count}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-natural-sand/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${sec.count}%`, backgroundColor: sec.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-natural-olive/60 font-mono mt-4 leading-relaxed">
            * Dados computados com base no total acumulado do primeiro semestre de 2026.
          </p>
        </div>

        {/* Effectiveness / Adesão Pie Ring - Slide 12 specific representation */}
        <div className="bg-natural-dark border border-natural-border/20 text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 font-display">
              <Award className="text-natural-sage w-5 h-5" />
              <h3 className="font-bold text-natural-sand">Eficácia & Adesão Prática</h3>
            </div>

            <p className="text-xs text-natural-sand/70 mb-5 leading-relaxed font-sans">
              <strong>Slide 12:</strong> Medição obtida através de questionários, visitas de campo e reuniões com as indústrias locais de Pinhalzinho.
            </p>

            {/* Circular Ring SVG representating "55% adesão" precisely */}
            <div className="relative flex items-center justify-center py-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#0C7A43"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - 55 / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-black text-white leading-none">55%</span>
                <span className="text-[9px] font-bold text-natural-sage uppercase tracking-wider font-mono mt-1">Adesão Total</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-[11px] text-natural-sand/90 leading-relaxed font-sans mt-3">
            <strong>Acordos com MEIs:</strong> Empresas participantes relatam redução de gargalos na fabricação de componentes do setor metalmecanico (ex: Zagonel S.A.).
          </div>
        </div>

      </div>

    </div>
  );
}
