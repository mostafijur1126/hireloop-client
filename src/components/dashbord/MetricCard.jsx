"use client";
import React from "react";
import { Card } from "@heroui/react";

export default function MetricCard({ title, value, icon: Icon }) {
  return (
    <Card
      className="
    w-full bg-[#121212]
    border border-zinc-800
    text-white rounded-xl p-4
    shadow-sm flex flex-col gap-4
    items-start overflow-hidden
    transition-all duration-200
    hover:border-zinc-700
    hover:shadow-lg
    hover:-translate-y-1
  "
    >
      {/* Icon Wrapper */}
      {Icon && (
        <div className="p-2.5 bg-zinc-800/60 rounded-lg text-zinc-400 flex items-center justify-center">
          <Icon size={20} strokeWidth={1.5} />
        </div>
      )}

      {/* Metric Texts */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-zinc-400 font-medium tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-semibold tracking-tight text-zinc-100">
          {value}
        </p>
      </div>
    </Card>
  );
}
