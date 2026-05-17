
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Layers, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  BarChart3,
  Search,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2 font-headline font-bold text-2xl tracking-tight text-primary">
          <Layers className="h-8 w-8" />
          <span>STRATA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#enterprise" className="hover:text-primary transition-colors">Enterprise</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex">Login</Button>
          <Link href="/login">
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
              Enter Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-48 max-w-7xl mx-auto w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Zap className="h-4 w-4" />
            <span>Redefining Employee Performance Management</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-headline font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]"
          >
            Strategic <span className="text-primary italic">Execution</span> for Modern Teams
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A high-performance portal for quarterly goal tracking, AI-powered alignment, and transparent team collaboration.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="rounded-full px-8 py-7 text-lg bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Start Demo Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-7 text-lg bg-white/50 backdrop-blur-md">
              View Product Tour
            </Button>
          </motion.div>

          {/* Decorative Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-6xl aspect-square">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] mix-blend-multiply opacity-50" />
          </div>
        </section>

        {/* Dashboard Preview Widgets */}
        <section className="px-6 pb-32 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-[2rem] flex flex-col justify-between h-64"
          >
            <div className="flex items-center justify-between mb-auto">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Target className="h-6 w-6" />
              </div>
              <div className="text-sm font-semibold text-primary">+12.5%</div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Goal Alignment</h3>
              <p className="text-sm text-muted-foreground">Synchronize quarterly objectives across departments automatically.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-[2rem] flex flex-col justify-between h-64 border-primary/20 bg-white/80"
          >
            <div className="flex items-center justify-between mb-auto">
              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Performance Index</h3>
              <p className="text-sm text-muted-foreground">Real-time visualization of team progress and bottleneck detection.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-[2rem] flex flex-col justify-between h-64"
          >
            <div className="flex items-center justify-between mb-auto">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Zap className="h-6 w-6" />
              </div>
              <div className="text-xs bg-slate-100 px-2 py-1 rounded">V2.4.0</div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">AI-Powered Clarity</h3>
              <p className="text-sm text-muted-foreground">Transform vague intentions into measurable SMART goals instantly.</p>
            </div>
          </motion.div>
        </section>

        {/* Feature List */}
        <section id="features" className="bg-slate-900 py-32 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Designed for Enterprise Speed</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">Strata brings clarity to the most complex organizational structures with dedicated tools for every stakeholder.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-4">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Role-Based Portals</h3>
                <p className="text-slate-400 text-sm">Tailored experiences for Employees, Managers, and HR Administrators.</p>
              </div>
              <div className="space-y-4">
                <Shield className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Approval Workflows</h3>
                <p className="text-slate-400 text-sm">Structured multi-level sign-offs ensure data integrity and alignment.</p>
              </div>
              <div className="space-y-4">
                <Search className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Audit History</h3>
                <p className="text-slate-400 text-sm">Complete transparency with versioning and manager feedback logs.</p>
              </div>
              <div className="space-y-4">
                <Users className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Team Analytics</h3>
                <p className="text-slate-400 text-sm">Visualize progress across departments with heatmaps and trends.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-headline font-bold text-xl tracking-tight text-primary">
            <Layers className="h-6 w-6" />
            <span>STRATA</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Strata Performance AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
