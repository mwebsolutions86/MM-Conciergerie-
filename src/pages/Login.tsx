import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-white/20">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit">
          <ChevronLeft className="w-5 h-5" /> Retour
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif mb-4 uppercase tracking-widest">Mazouz</h1>
            <p className="text-white/50 font-light">
              {isLogin ? 'Accédez à votre espace exclusif.' : 'Rejoignez le cercle Mazouz.'}
            </p>
          </div>

          <div className="bg-[#141414] p-8 rounded-3xl border border-white/10 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70 uppercase tracking-wider text-xs">Nom complet</Label>
                  <Input 
                    id="name" 
                    placeholder="Jean Dupont" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/30"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70 uppercase tracking-wider text-xs">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="jean@exemple.com" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/30"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white/70 uppercase tracking-wider text-xs">Mot de passe</Label>
                  {isLogin && (
                    <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Oublié ?</a>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-white/30"
                />
              </div>

              <Button className="w-full bg-white text-black hover:bg-white/90 h-12 rounded-xl font-semibold tracking-wide uppercase mt-8">
                {isLogin ? 'Se connecter' : 'Créer un compte'}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/50">
                {isLogin ? "Pas encore membre ?" : "Déjà membre ?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-white hover:underline underline-offset-4"
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
