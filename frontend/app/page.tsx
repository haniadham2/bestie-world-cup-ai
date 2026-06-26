"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import Bestie from "@/components/Bestie";
import Button from "@/components/Button";

/**
 * Landing page — the warm first hello.
 * Big hero, floating mascot, one clear call to action.
 */
export default function LandingPage() {
  const router = useRouter();

  return (
    <ScreenContainer gradient="from-lavender via-sky to-mint">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <Bestie mood="idle" size={240} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
          className="space-y-3"
        >
          <motion.h1
            className="text-5xl font-extrabold tracking-tight text-ink"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 12 }}
          >
            Meet Bestie
          </motion.h1>
          <p className="text-lg font-bold text-ink/70">
            Your AI Bestie for the World Cup
          </p>
        </motion.div>

        {/* Soft, breathing invitation to tap. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [12, 0, 0], scale: [1, 1, 1.03, 1] }}
          transition={{
            opacity: { delay: 0.3, duration: 0.4 },
            y: { delay: 0.3, duration: 0.4 },
            scale: { delay: 1, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Button size="lg" onClick={() => router.push("/matches")}>
            Start Watching
          </Button>
        </motion.div>
      </div>
    </ScreenContainer>
  );
}
