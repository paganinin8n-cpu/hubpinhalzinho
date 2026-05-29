/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

interface KpiCardProps {
  title: string;
  value: number;
  change: string;
  iconName: keyof typeof Icons;
  colorScheme: "green" | "emerald" | "blue" | "indigo" | "amber";
  sparklineData: number[];
  id: string;
  onClick?: () => void;
}

export default function KpiCard({
  title,
  value,
  change,
  iconName,
  colorScheme,
  sparklineData,
  id,
  onClick
}: KpiCardProps) {
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string }>;

  // Color mappings for reading facilitation and high-contrast usability
  const schemeClasses = {
    green: {
      bg: "bg-white hover:bg-natural-bg/50 border-natural-border",
      text: "text-natural-dark",
      icon: "text-natural-sage bg-natural-sage/10 border-natural-border",
      badge: "bg-natural-sage/15 text-natural-olive border-natural-sage/30",
      sparkline: "#0C7A43",
    },
    emerald: {
      bg: "bg-white hover:bg-natural-bg/50 border-natural-border",
      text: "text-natural-dark",
      icon: "text-natural-sage bg-natural-sage/10 border-natural-border",
      badge: "bg-natural-sage/15 text-natural-olive border-natural-sage/30",
      sparkline: "#0C7A43",
    },
    blue: {
      bg: "bg-white hover:bg-natural-bg/50 border-natural-border",
      text: "text-natural-dark",
      icon: "text-natural-olive bg-natural-olive/10 border-natural-border",
      badge: "bg-natural-olive/15 text-natural-olive border-natural-olive/30",
      sparkline: "#3D5A4B",
    },
    indigo: {
      bg: "bg-white hover:bg-natural-bg/50 border-natural-border",
      text: "text-natural-dark",
      icon: "text-natural-clay bg-natural-clay/10 border-natural-border",
      badge: "bg-natural-clay/15 text-natural-clay border-natural-clay/30",
      sparkline: "#CE1B1B",
    },
    amber: {
      bg: "bg-white hover:bg-natural-bg/50 border-natural-border",
      text: "text-natural-dark",
      icon: "text-natural-olive bg-natural-sand border-natural-border",
      badge: "bg-natural-sand text-natural-olive border-natural-border",
      sparkline: "#D69E2E",
    },
  };

  const scheme = schemeClasses[colorScheme] || schemeClasses.indigo;

  // Let's generate a SVG path for the sparkline data
  const width = 120;
  const height = 40;
  const padding = 2;
  const maxVal = Math.max(...sparklineData);
  const minVal = Math.min(...sparklineData);
  const valRange = maxVal - minVal || 1;

  const points = sparklineData
    .map((val, index) => {
      const x = (index / (sparklineData.length - 1)) * (width - padding * 2) + padding;
      const y = height - ((val - minVal) / valRange) * (height - padding * 2) - padding;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      id={id}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onClick}
      className={`relative p-5 rounded-2xl border bg-white shadow-xs transition-colors duration-200 cursor-pointer overflow-hidden group ${scheme.bg}`}
    >
      {/* Background visual texture */}
      <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none translate-x-4 translate-y-4">
        {IconComponent && <IconComponent className="w-32 h-32" />}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-natural-olive font-bold block mb-2">
            {title}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold tracking-tight text-natural-heading">
              {value}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${scheme.badge}`}>
              {change}
            </span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${scheme.icon}`}>
          {IconComponent && <IconComponent className="w-5 h-5" />}
        </div>
      </div>

      {/* High-contrast and accessible mini sparkline diagram */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100/50 pt-3">
        <span className="text-xs font-mono text-slate-500">Histórico de Tendência</span>
        <div className="w-[120px] h-[40px]">
          <svg width={width} height={height} className="overflow-visible">
            {/* Soft gradient underneath sparkline */}
            <path
              d={`M ${padding},${height} L ${points} L ${width - padding},${height} Z`}
              fill={`${scheme.sparkline}15`}
              stroke="none"
            />
            <polyline
              fill="none"
              stroke={scheme.sparkline}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {/* Pulse indicator at the end */}
            <circle
              cx={(width - padding).toString()}
              cy={(height - ((sparklineData[sparklineData.length - 1] - minVal) / valRange) * (height - padding * 2) - padding).toString()}
              r="3"
              fill={scheme.sparkline}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
