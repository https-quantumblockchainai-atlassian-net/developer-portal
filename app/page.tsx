"use client"

import { motion } from "framer-motion"
import NavigationHeader from "./components/navigation-header"
import TransformationalHomepage from "./components/transformational-homepage"
import AITrainingPipeline from "./components/ai-training-pipeline"
import QuantumShieldModule from "./components/quantum-shield-module"
import ThreatDetectionPanel from "./components/threat-detection-panel"
import CrystalStructureViz from "./components/crystal-structure-viz"
import NiagaraFXHealingStates from "./components/niagara-fx-healing-states"
import UMGWidgetMockup from "./components/umg-widget-mockup"
import BlueprintAuraSelfHeal from "./components/blueprint-aura-self-heal"
import DivineAlignmentOrchestration from "./components/divine-alignment-orchestration"
import AuraAICompanionSystem from "./components/aura-ai-companion-system"
import WalkerWorldEcosystem from "./components/walker-world-ecosystem"
import QuantumErrorCorrection from "./components/quantum-error-correction"
import BlueprintNodeLayout from "./components/blueprint-node-layout"
import EpicCharacterArcs from "./components/epic-character-arcs"
import UE57ProductionPipeline from "./components/ue5-7-production-pipeline" // New import

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans relative">
      {/* Global Cyber Grid Background */}
      <div className="fixed inset-0 cyber-grid opacity-10 z-0"></div>

      <NavigationHeader />

      <main className="relative z-10 p-6 space-y-16">
        {/* Hero Section */}
        <section id="home" className="py-12">
          <TransformationalHomepage />
        </section>

        {/* Quantum Shield Module */}
        <section id="quantum-shield" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Quantum Shield Module
          </motion.h2>
          <QuantumShieldModule />
        </section>

        {/* Crystal Structure Visualization */}
        <section id="crystal-structure" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Crystal Structure Visualization
          </motion.h2>
          <CrystalStructureViz />
        </section>

        {/* AI Training Pipeline */}
        <section id="ai-training" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            AI Training Pipeline
          </motion.h2>
          <AITrainingPipeline />
        </section>

        {/* Threat Detection Panel */}
        <section id="threat-detection" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Threat Detection Panel
          </motion.h2>
          <ThreatDetectionPanel />
        </section>

        {/* Niagara FX Healing States */}
        <section id="niagara-fx" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Niagara FX Healing States
          </motion.h2>
          <NiagaraFXHealingStates />
        </section>

        {/* UMG Widget Mockup */}
        <section id="umg-widget" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            UMG Widget Mockup
          </motion.h2>
          <UMGWidgetMockup />
        </section>

        {/* Blueprint Aura Self-Heal */}
        <section id="blueprint-aura-self-heal" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Blueprint Aura Self-Heal
          </motion.h2>
          <BlueprintAuraSelfHeal />
        </section>

        {/* Divine Alignment Orchestration */}
        <section id="divine-alignment" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Divine Alignment Orchestration
          </motion.h2>
          <DivineAlignmentOrchestration />
        </section>

        {/* Aura AI Companion System */}
        <section id="aura-companion" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Aura AI Companion System
          </motion.h2>
          <AuraAICompanionSystem />
        </section>

        {/* Walker World Ecosystem */}
        <section id="walker-world" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Walker World Ecosystem
          </motion.h2>
          <WalkerWorldEcosystem />
        </section>

        {/* Quantum Error Correction */}
        <section id="quantum-error-correction" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Quantum Error Correction
          </motion.h2>
          <QuantumErrorCorrection />
        </section>

        {/* Blueprint Node Layout */}
        <section id="blueprint" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Blueprint Node Layout
          </motion.h2>
          <BlueprintNodeLayout />
        </section>

        {/* Epic Character Arcs */}
        <section id="epic-character-arcs" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            Epic Character Arcs & Storytelling
          </motion.h2>
          <EpicCharacterArcs />
        </section>

        {/* UE5.7 Production Pipeline */}
        <section id="ue5-7-production-pipeline" className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-center mb-12 gradient-text"
          >
            UE5.7 Production Pipeline
          </motion.h2>
          <UE57ProductionPipeline />
        </section>
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-slate-700 mt-16">
        © {new Date().getFullYear()} Thoth Guardian. All rights reserved.
      </footer>
    </div>
  )
}
