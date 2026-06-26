"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import LandingDemo from "@/components/LandingDemo";
import Button from "@/components/Button";

/**
 * Landing page — answers "what does this app do?" before "who is Bestie?".
 * The hero is a live demo of the core loop: tap a moment → Bestie reacts →
 * Bestie explains. Value-first copy, then the call to action.
 */
export default function LandingPage() {
  const router = useRouter();

  return (
    <ScreenContainer gradient="from-lavender via-sky to-mint">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center">
        {/* World Cup framing */}
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-ink/70 shadow-soft backdrop-blur"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            ⚽️
          </motion.span>
          World Cup Companion
        </motion.span>

        {/* Value-first headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl">
            Watch the World Cup
            <br />
            with Bestie
          </h1>
          <p className="mx-auto max-w-xs text-lg font-bold text-ink/70">
            Tap any moment and Bestie explains it — like watching with your
            funniest friend.
          </p>
        </motion.div>

        {/* The product, demonstrated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="w-full"
        >
          <LandingDemo />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1, 1.03, 1] }}
          transition={{
            opacity: { delay: 0.4, duration: 0.4 },
            y: { delay: 0.4, duration: 0.4 },
            scale: { delay: 1.2, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="flex flex-col items-center gap-3"
        >
          <Button size="lg" onClick={() => router.push("/matches")}>
            Start Watching →
          </Button>
          <p className="text-sm font-bold text-ink/45">
            Never feel lost watching soccer again.
          </p>
        </motion.div>
      </div>
    </ScreenContainer>
  );
}
