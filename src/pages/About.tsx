import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, Star, Key, Building } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex-1 flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Retour</span>
          </Link>
          <Link to="/" className="text-xl font-serif tracking-widest uppercase text-center">Mazouz</Link>
          <div className="flex-1" />
        </div>
      </nav>

      <main className="pt-32 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Notre Vision</h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            Redéfinir la location immobilière à Agadir, en connectant les propriétaires de biens d'exception avec une clientèle exigeante, en toute confiance.
          </p>
        </motion.div>

        <div className="space-y-24">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-serif mb-4">Pour les Voyageurs</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Nous sélectionnons rigoureusement les biens les plus exclusifs d'Agadir, de la Marina à Taghazout Bay. Réservez votre prochain séjour en toute sérénité grâce à notre plateforme sécurisée et profitez d'un accès direct aux propriétaires.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/80">
                  <Star className="w-5 h-5 text-white/50" /> Biens d'exception vérifiés
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Shield className="w-5 h-5 text-white/50" /> Réservation sécurisée
                </li>
              </ul>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#141414] border border-white/5 p-8 flex items-center justify-center">
              <Key className="w-32 h-32 text-white/10" />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 aspect-square rounded-3xl overflow-hidden bg-[#141414] border border-white/5 p-8 flex items-center justify-center">
              <Building className="w-32 h-32 text-white/10" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-serif mb-4">Pour les Propriétaires</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Rejoignez notre collection exclusive. Nous vous mettons en relation avec une clientèle qualifiée tout en vous laissant le contrôle total de votre bien. Maximisez vos revenus en toute simplicité grâce à notre vitrine digitale.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/80">
                  <Shield className="w-5 h-5 text-white/50" /> Mise en relation transparente
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Star className="w-5 h-5 text-white/50" /> Visibilité premium
                </li>
              </ul>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
