import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, MapPin, Star, Wifi, Car, Coffee, Key, Menu, Home as HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { APARTMENTS } from '../data/apartments';

// Add this component above the Home component
function ApartmentCard({ apt, index, key }: { apt: typeof APARTMENTS[0], index: number, key?: string | number }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % apt.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + apt.images.length) % apt.images.length);
  };

  return (
    <div 
      className={cn(
        "group flex flex-col rounded-3xl overflow-hidden bg-[#141414] border border-white/5 transition-all hover:border-white/20",
        index === 0 ? "md:col-span-2 lg:col-span-2" : "col-span-1"
      )}
    >
      {/* Image Carousel Area */}
      <div className={cn(
        "relative overflow-hidden w-full",
        index === 0 ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
      )}>
        <Link to={`/apartment/${apt.id}`} className="absolute inset-0 z-10" />
        <img 
          src={apt.images[currentImage]} 
          alt={apt.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Carousel Controls */}
        {apt.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={prevImage} className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 backdrop-blur-sm transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 backdrop-blur-sm transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Image Count Badge */}
        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-white border border-white/10">
          {currentImage + 1} / {apt.images.length}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col flex-1 relative">
        <Link to={`/apartment/${apt.id}`} className="absolute inset-0 z-10" />
        <div className="flex items-center justify-between mb-4">
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border border-white/10 text-white">
            Premium
          </span>
          <div className="flex items-center gap-1 text-sm text-white">
            <Star className="w-4 h-4 fill-white text-white" />
            <span>{apt.rating}</span>
            <span className="text-white/50">({apt.reviews})</span>
          </div>
        </div>
        
        <h4 className={cn("font-serif mb-2 text-white", index === 0 ? "text-3xl" : "text-2xl")}>{apt.title}</h4>
        
        <p className="text-white/60 text-sm mb-6 line-clamp-2 leading-relaxed">
          {apt.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
          <p className="text-white/60 flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" /> {apt.location}
          </p>
          <p className="text-2xl font-light text-white">{apt.price}€ <span className="text-sm text-white/50">/ nuit</span></p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    navigate(`/apartment/${APARTMENTS[0].id}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif tracking-widest uppercase">Mazouz</Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link to="/about" className="hover:text-white/70 transition-colors">Notre Vision</Link>
            <Link to="/login" className="hover:text-white/70 transition-colors">Connexion</Link>
            <Dialog>
              <DialogTrigger render={
                <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-black transition-all">
                  Confier mon bien
                </Button>
              } />
              <DialogContent className="sm:max-w-[500px] bg-[#141414] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-serif">Proposer votre bien</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Remplissez ce formulaire pour proposer votre bien sur notre plateforme exclusive.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-white/80">Nom complet</Label>
                    <Input id="name" placeholder="Jean Dupont" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white/80">Email</Label>
                    <Input id="email" type="email" placeholder="jean@exemple.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-white/80">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+212 6XX XX XX XX" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location" className="text-white/80">Quartier (Agadir)</Label>
                    <Input id="location" placeholder="Marina, Founty, Taghazout..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-white/80">Description rapide du bien</Label>
                    <Textarea id="description" placeholder="Appartement 2 pièces vue mer..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none" rows={3} />
                  </div>
                </div>
                <Button className="w-full bg-white text-black hover:bg-white/90">
                  Envoyer ma demande
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={APARTMENTS[0].images[0]} 
            alt="Luxury Apartment" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
          >
            L'Excellence de la <br />
            <span className="italic text-white/70">Location à Agadir.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light"
          >
            Trouvez le bien idéal pour votre séjour ou confiez-nous la mise en relation pour votre propriété d'exception.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#141414] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto shadow-2xl"
          >
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="text-white/40 w-5 h-5" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Destination</span>
                <input 
                  type="text" 
                  placeholder="Où allez-vous ?" 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/30"
                  defaultValue="Agadir, Maroc"
                />
              </div>
            </div>

            <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

            <Popover>
              <PopoverTrigger render={
                <button type="button" className="flex-1 w-full flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <CalendarIcon className="text-white/40 w-5 h-5" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Dates</span>
                    <span className="text-sm text-white/80">
                      {date ? format(date, "dd MMM yyyy") : "Quand ?"}
                    </span>
                  </div>
                </button>
              } />
              <PopoverContent className="w-auto p-0 bg-[#141414] border-white/10 text-white" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-[#141414] text-white"
                />
              </PopoverContent>
            </Popover>

            <div className="w-[1px] h-10 bg-white/10 hidden md:block" />

            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
              <Users className="text-white/40 w-5 h-5" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">Voyageurs</span>
                <input 
                  type="number" 
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="bg-transparent border-none outline-none text-sm w-full"
                />
              </div>
            </div>

            <Button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-white text-black hover:bg-white/90 rounded-xl px-8 py-6 text-sm font-semibold tracking-wide"
            >
              Rechercher
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 mb-10 md:mb-16">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-2 font-semibold">Notre Collection</h2>
            <h3 className="text-3xl md:text-4xl font-serif">Biens d'Exception à Agadir</h3>
          </div>
          <Button variant="link" className="text-white/70 hover:text-white px-0 md:px-4">Voir tout le catalogue &rarr;</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {APARTMENTS.map((apt, index) => (
            <ApartmentCard key={apt.id} apt={apt} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
