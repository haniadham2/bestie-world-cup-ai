"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import MascotPlaceholder from "@/components/MascotPlaceholder";
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
        <MascotPlaceholder size="xl" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-ink">
            Meet Bestie
          </h1>
          <p className="text-lg font-bold text-ink/70">
            Your AI Bestie for the World Cup
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button size="lg" onClick={() => router.push("/matches")}>
            Start Watching
          </Button>
        </motion.div>
      </div>
    </ScreenContainer>
  );
}
