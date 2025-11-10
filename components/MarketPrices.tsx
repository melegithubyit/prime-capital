"use client";

import React, { useState, useEffect, useRef } from "react";
import { MdArrowUpward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface PriceItem {
  name: string;
  value: string;
  change: string;
  isUp: boolean | null;
}

const PRICE_ITEMS: PriceItem[] = [
  { name: "IBMM", value: "16.3533", change: "+3.76%", isUp: true },
  { name: "WGBX", value: "1060.87", change: "0%", isUp: null },
  { name: "GDAB", value: "1000", change: "0%", isUp: null },
  { name: "TBL182D", value: "4700", change: "0%", isUp: null },
];

const MarketPrices: React.FC = () => {
  // cycle increments to trigger a simultaneous animation refresh for all tickers
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCycle((c) => c + 1);
    }, 2500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <div
      className="bg-white text-black py-3 w-full overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-5xl items-center px-2 md:px-4">
        <div className="text-base md:text-lg font-semibold whitespace-nowrap pr-2 md:pr-4 border-r border-gray-300 mr-3 md:mr-6 text-[#002856]">
          ESX Market Prices
        </div>
        <div className="flex flex-1 gap-4 md:gap-8 overflow-x-auto md:overflow-visible">
          {PRICE_ITEMS.map((p) => (
            <div key={p.name} className="flex items-center gap-2 min-w-[120px] md:min-w-[150px] shrink-0">
              <span className="font-bold text-[#002856]">{p.name}</span>
              {/* Value ticker (all animate together) */}
              <div className="relative h-6 overflow-hidden w-fit">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={p.name + "val-" + cycle}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="text-cyan-600 block"
                  >
                    {p.value}
                  </motion.span>
                </AnimatePresence>
              </div>
              {/* Change ticker (all animate together) */}
              <div className="relative h-6 overflow-hidden w-fit">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={p.name + "chg-" + cycle}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={`flex items-center ${
                      p.isUp === true
                        ? "text-green-600"
                        : p.isUp === false
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.isUp === true && <MdArrowUpward className="mr-1" />}
                    {p.isUp === false && (
                      <MdArrowUpward className="mr-1 rotate-180" />
                    )}
                    {p.isUp === null && <span className="mr-1">↕</span>}
                    {p.change}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
