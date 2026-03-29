import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format, differenceInDays } from 'date-fns';
import { Star, MapPin, CheckCircle2, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { APARTMENTS } from '../data/apartments';

export default function Apartment() {
  const { id } = useParams();
  const apartment = APARTMENTS.find(a => a.id === id) || APARTMENTS[0];
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nights = dateRange.from && dateRange.to ? differenceInDays(dateRange.to, dateRange.from) : 0;
  const total = nights * apartment.price;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % apartment.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + apartment.images.length) % apartment.images.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex-1 flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">Retour</span>
          </Link>
          <Link to="/" className="text-xl font-serif tracking-widest uppercase text-center">Mazouz</Link>
          <div className="flex-1" /> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="pt-24 md:pt-28 max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-serif mb-4">{apartment.title}</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-white text-white" />
              {apartment.rating} ({apartment.reviews} avis)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {apartment.location}
            </span>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-10 md:mb-16 md:h-[60vh]">
          <div 
            className="rounded-2xl overflow-hidden h-[40vh] md:h-full cursor-pointer"
            onClick={() => { setCurrentImageIndex(0); setShowGallery(true); }}
          >
            <img 
              src={apartment.images[0]} 
              alt="Main" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-2 md:gap-4 h-[20vh] md:h-full">
            <div 
              className="rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => { setCurrentImageIndex(1); setShowGallery(true); }}
            >
              <img 
                src={apartment.images[1]} 
                alt="Secondary 1" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div 
              className="rounded-2xl overflow-hidden relative cursor-pointer group"
              onClick={() => { setCurrentImageIndex(2); setShowGallery(true); }}
            >
              <img 
                src={apartment.images[2]} 
                alt="Secondary 2" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {apartment.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                  <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Voir toutes les photos ({apartment.images.length})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showGallery && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
            >
              <div className="flex justify-between items-center p-6">
                <div className="text-white/50 text-sm font-medium tracking-widest">
                  {currentImageIndex + 1} / {apartment.images.length}
                </div>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
                <button 
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                
                <img 
                  src={apartment.images[currentImageIndex]} 
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-2 space-y-12 md:space-y-16">
            <section>
              <h2 className="text-2xl font-serif mb-4 md:mb-6">À propos de ce bien</h2>
              <p className="text-white/60 leading-relaxed font-light text-base md:text-lg">
                {apartment.description}
              </p>
            </section>

            <div className="h-[1px] bg-white/10 w-full" />

            <section>
              <h2 className="text-2xl font-serif mb-6 md:mb-8">Équipements Premium</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4">
                {apartment.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-white/80">
                    <div className="p-3 bg-[#141414] rounded-xl border border-white/5">
                      {amenity.icon}
                    </div>
                    <span className="font-medium tracking-wide">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <Card className="bg-[#141414] border-white/10 text-white shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex justify-between items-end mb-8">
                    <p className="text-4xl font-light">{apartment.price}€ <span className="text-lg text-white/50">/ nuit</span></p>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-2xl p-2 sm:p-4 border border-white/5 mb-8 overflow-x-auto flex justify-center">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange as any}
                      numberOfMonths={1}
                      className="bg-transparent text-white w-fit"
                      classNames={{
                        day_selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                        day_today: "bg-white/10 text-white",
                      }}
                    />
                  </div>

                  {nights > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 mb-8"
                    >
                      <div className="flex justify-between text-white/70">
                        <span>{apartment.price}€ x {nights} nuits</span>
                        <span>{total}€</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Frais de service (5%)</span>
                        <span>{Math.round(total * 0.05)}€</span>
                      </div>
                      <div className="h-[1px] bg-white/10 w-full my-4" />
                      <div className="flex justify-between font-serif text-xl">
                        <span>Total</span>
                        <span>{total + Math.round(total * 0.05)}€</span>
                      </div>
                    </motion.div>
                  )}

                  <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl py-6 text-sm font-semibold tracking-wide uppercase">
                    Réserver maintenant
                  </Button>
                  
                  <p className="text-center text-xs text-white/40 mt-4 uppercase tracking-widest">
                    Aucun montant débité pour le moment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
