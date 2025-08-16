"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Grid3X3, LayoutGrid, Layers } from 'lucide-react';
import Footer from '../reusable/footer';
import Navbar from '../reusable/navbar';
// Extended collection of Pexels stock photos
const images = [
  'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];

const locations = [
  'All', 'Italy', 'Dubai', 'London', 'Berlin', 'Rome', 'Lisbon', 'India', 'China', 'Japan', 'France', 'Spain', 'Greece', 'Norway', 'Thailand', 'Morocco'
];

const travelData = [
  {
    id: 1,
    image: images[0],
    title: 'Alpine Lake Serenity',
    location: 'Italy',
    category: 'Nature',
    isVideo: false,
    height: 300
  },
  {
    id: 2,
    image: images[1],
    title: 'Golden Hour Flight',
    location: 'Dubai',
    category: 'Travel',
    isVideo: true,
    height: 400
  },
  {
    id: 3,
    image: images[2],
    title: 'Ancient Roman Glory',
    location: 'Rome',
    category: 'Historical',
    isVideo: false,
    height: 350
  },
  {
    id: 4,
    image: images[3],
    title: 'Future City Lights',
    location: 'Dubai',
    category: 'Urban',
    isVideo: false,
    height: 280
  },
  {
    id: 5,
    image: images[4],
    title: 'Cherry Blossom Temple',
    location: 'Japan',
    category: 'Cultural',
    isVideo: false,
    height: 420
  },
  {
    id: 6,
    image: images[5],
    title: 'London Bridge Evening',
    location: 'London',
    category: 'Urban',
    isVideo: false,
    height: 300
  },
  {
    id: 7,
    image: images[6],
    title: 'Berlin Architecture',
    location: 'Berlin',
    category: 'Modern',
    isVideo: false,
    height: 380
  },
  {
    id: 8,
    image: images[7],
    title: 'Lisbon Coastline',
    location: 'Lisbon',
    category: 'Nature',
    isVideo: false,
    height: 320
  },
  {
    id: 9,
    image: images[8],
    title: 'Parisian Romance',
    location: 'France',
    category: 'Cultural',
    isVideo: false,
    height: 360
  },
  {
    id: 10,
    image: images[9],
    title: 'Barcelona Vibes',
    location: 'Spain',
    category: 'Urban',
    isVideo: true,
    height: 340
  },
  {
    id: 11,
    image: images[10],
    title: 'Santorini Sunset',
    location: 'Greece',
    category: 'Romance',
    isVideo: false,
    height: 400
  },
  {
    id: 12,
    image: images[11],
    title: 'Norwegian Fjords',
    location: 'Norway',
    category: 'Nature',
    isVideo: false,
    height: 450
  },
  {
    id: 13,
    image: images[12],
    title: 'Thai Paradise',
    location: 'Thailand',
    category: 'Tropical',
    isVideo: false,
    height: 300
  },
  {
    id: 14,
    image: images[13],
    title: 'Marrakech Markets',
    location: 'Morocco',
    category: 'Cultural',
    isVideo: false,
    height: 380
  },
  {
    id: 15,
    image: images[14],
    title: 'Mumbai Chaos',
    location: 'India',
    category: 'Urban',
    isVideo: true,
    height: 320
  },
  {
    id: 16,
    image: images[15],
    title: 'Shanghai Skyline',
    location: 'China',
    category: 'Modern',
    isVideo: false,
    height: 350
  },
  {
    id: 17,
    image: images[16],
    title: 'Venetian Canals',
    location: 'Italy',
    category: 'Historical',
    isVideo: false,
    height: 410
  },
  {
    id: 18,
    image: images[17],
    title: 'London Eye Night',
    location: 'London',
    category: 'Urban',
    isVideo: false,
    height: 290
  },
  {
    id: 19,
    image: images[18],
    title: 'German Countryside',
    location: 'Berlin',
    category: 'Nature',
    isVideo: false,
    height: 370
  },
  {
    id: 20,
    image: images[19],
    title: 'Portuguese Coast',
    location: 'Lisbon',
    category: 'Beach',
    isVideo: false,
    height: 330
  }
];

const TravelCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewType, setViewType] = useState('carousel'); // 'carousel', 'grid', 'masonry'
  const [activeLocation, setActiveLocation] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredData, setFilteredData] = useState(travelData);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (activeLocation === 'All') {
      setFilteredData(travelData);
    } else {
      setFilteredData(travelData.filter(item => item.location === activeLocation));
    }
    setCurrentSlide(0);
  }, [activeLocation]);

  // Calculate max slides: we show 5 cards, so if we have more than 5 items, we can slide
  const maxSlide = Math.max(0, filteredData.length - 5);
  const canNavigate = filteredData.length > 5;

  const nextSlide = () => {
    if (canNavigate) {
      setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1));
    }
  };

  const prevSlide = () => {
    if (canNavigate) {
      setCurrentSlide((prev) => (prev - 1 + (maxSlide + 1)) % (maxSlide + 1));
    }
  };

  const getCardStyle = (index) => {
    const position = index - currentSlide;
    const isVisible = position >= 0 && position < 5;  // Show up to 5 cards (0-4)
    
    if (!isVisible) return { display: 'none' };
    
    const baseStyle = {
      position: 'absolute',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      transformOrigin: 'center center',
    };

    switch (position) {
      case 0: // Far left background
        return {
          ...baseStyle,
          left: '-5%',
          top: '60px',
          zIndex: 1,
          transform: 'scale(0.7) rotateY(-25deg) rotateZ(-5deg)',
          opacity: 0.7,
        };
      case 1: // Near left background
        return {
          ...baseStyle,
          left: '10%',
          top: '30px',
          zIndex: 2,
          transform: 'scale(0.8) rotateY(-15deg) rotateZ(-2deg)',
          opacity: 0.9,
        };
      case 2: // Center main card
        return {
          ...baseStyle,
          left: '30%',
          top: '0px',
          zIndex: 4,
          transform: 'scale(1) rotateY(0deg) rotateZ(0deg)',
          opacity: 1,
        };
      case 3: // Near right background
        return {
          ...baseStyle,
          left: '50%',
          top: '30px',
          zIndex: 2,
          transform: 'scale(0.8) rotateY(15deg) rotateZ(2deg)',
          opacity: 0.9,
        };
      case 4: // Far right background
        return {
          ...baseStyle,
          left: '65%',
          top: '60px',
          zIndex: 1,
          transform: 'scale(0.7) rotateY(25deg) rotateZ(5deg)',
          opacity: 0.7,
        };
      default:
        return { display: 'none' };
    }
  };

  const renderCarousel = () => (
    <div className="relative w-full h-[500px] mx-auto overflow-hidden">
      <div className="relative w-full h-full">
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            className="w-[350px] h-[400px] absolute cursor-pointer group"
            style={getCardStyle(index)}
            onClick={() => {
              const targetSlide = Math.max(0, Math.min(index - 2, maxSlide));
              setCurrentSlide(targetSlide);
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Video Play Button */}
              {item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              )}

              {/* Card Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">{item.location}</span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {canNavigate && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={prevSlide}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canNavigate}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canNavigate}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Slide Indicators */}
      {canNavigate && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-black w-8' 
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredData.map((item, index) => (
        <div
          key={item.id}
          className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Video Play Button */}
            {item.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            )}

            {/* Card Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">{item.location}</span>
                <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMasonry = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {filteredData.map((item, index) => (
        <div
          key={item.id}
          className={`break-inside-avoid group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`
          }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-6">
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ height: `${item.height}px` }}
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Video Play Button */}
            {item.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            )}

            {/* Card Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-90">{item.location}</span>
                <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          maxHeight: '100vh'
        }}
      >
        <div className="relative z-20 h-full flex flex-col w-full">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center h-full py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1 
                  className={`font-bold mb-4 uppercase tracking-wider leading-tight text-white transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                    fontSize: 'clamp(3rem, 7vw, 5rem)',
                    fontWeight: '800',
                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)',
                    letterSpacing: '2px',
                  }}
                >
                  GALLERY
                </h1>

                {/* Description */}
                <p 
                  className={`font-light leading-relaxed mb-6 max-w-2xl mx-auto text-white transition-all duration-1200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Explore our collection of breathtaking destinations and travel experiences. From stunning landscapes to vibrant cities, let these images inspire your next adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-20 relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking locations from around the world with our immersive travel gallery
            </p>
          </div>

          {/* View Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1 flex gap-1">
              <button
                onClick={() => setViewType('carousel')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === 'carousel'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <Layers className="h-4 w-4" />
                Carousel
              </button>
              <button
                onClick={() => setViewType('grid')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === 'grid'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
                Grid
              </button>
              <button
                onClick={() => setViewType('masonry')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === 'masonry'
                    ? 'bg-black text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:shadow-md'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Masonry
              </button>
            </div>
          </div>

          {/* Location Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveLocation(location)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeLocation === location
                    ? 'bg-black text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:scale-105'
                }`}
              >
                {location}
              </button>
            ))}
          </div>

          {/* Gallery Content */}
          <div className="mb-12">
            {viewType === 'carousel' && renderCarousel()}
            {viewType === 'grid' && renderGrid()}
            {viewType === 'masonry' && renderMasonry()}
          </div>

          {/* Info Text */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Showing {filteredData.length} destinations
              {activeLocation !== 'All' && ` in ${activeLocation}`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default TravelCarousel;