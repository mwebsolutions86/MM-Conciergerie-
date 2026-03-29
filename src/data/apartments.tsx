import { Wifi, Tv, Coffee, Home, BedDouble, Utensils } from 'lucide-react';

export const APARTMENTS = [
  {
    id: '1',
    title: 'Appartement Résidence El Fajr',
    location: 'Quartier Essalam, Agadir',
    price: 60, // Prix indicatif, à modifier selon vos souhaits
    rating: 5.0,
    reviews: 0,
    description: 'Bel appartement situé au 4ème étage de la résidence El Fajr dans le quartier d\'Essalam. Il offre un espace de vie généreux comprenant une chambre confortable, un grand salon traditionnel marocain, un petit séjour supplémentaire et une grande cuisine entièrement équipée.',
    images: [
      '/images/apartment/1.jpg',
      '/images/apartment/2.jpg',
      '/images/apartment/3.jpg',
      '/images/apartment/4.jpg',
      '/images/apartment/5.jpg',
      '/images/apartment/6.jpg',
      '/images/apartment/7.jpg',
      '/images/apartment/8.jpg',
    ],
    amenities: [
      { icon: <BedDouble className="w-5 h-5" />, label: '1 Chambre' },
      { icon: <Home className="w-5 h-5" />, label: 'Grand Salon & Séjour' },
      { icon: <Utensils className="w-5 h-5" />, label: 'Grande Cuisine Équipée' },
      { icon: <Tv className="w-5 h-5" />, label: 'Télévision' },
    ]
  }
];
