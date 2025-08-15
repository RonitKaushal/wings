"use client"
import React, { useState, useMemo, useCallback } from 'react'



const destinations = [
    {
      id: 1,
      name: "MALDIVES",
      country: "TROPICAL PARADISE",
      description: "Paradise of white-sand beaches and turquoise waters where palm trees sway and sunsets dazzle.",
      attractions: "Coral reefs, private islands, boat rides",
      activities: "Snorkeling, beach dining, cruises",
      bestTime: "Nov - Apr",
      cuisine: "Seafood, tropical fruits",
      image: "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "EUROPE",
      country: "DIVERSE CONTINENT",
      description: "Rich history, stunning architecture, and diverse cultures await in this magnificent continent of endless discoveries.",
      attractions: "Historic castles, art museums, ancient ruins",
      activities: "City tours, wine tasting, cultural experiences",
      bestTime: "May - Sep",
      cuisine: "Mediterranean, French, Italian",
      image: "https://images.pexels.com/photos/161901/paris-france-tower-eiffel-161901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "PARIS",
      country: "CITY OF LIGHT",
      description: "Romance, art, and elegance converge in the world's most beautiful city, where every corner tells a story.",
      attractions: "Eiffel Tower, Louvre, Notre-Dame",
      activities: "Seine cruises, café culture, shopping",
      bestTime: "Apr - Jun, Sep - Nov",
      cuisine: "French pastries, wine, gourmet dining",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      name: "ROME",
      country: "ETERNAL CITY",
      description: "Ancient wonders and timeless beauty blend seamlessly in this historic capital of art, culture, and cuisine.",
      attractions: "Colosseum, Vatican, Trevi Fountain",
      activities: "Historical tours, food experiences, art galleries",
      bestTime: "Apr - Jun, Sep - Oct",
      cuisine: "Authentic pasta, pizza, gelato",
      image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      name: "TOKYO",
      country: "MODERN METROPOLIS",
      description: "Where ancient traditions meet cutting-edge technology in a vibrant city that never sleeps.",
      attractions: "Tokyo Tower, temples, modern districts",
      activities: "Sushi tours, shopping, cultural experiences",
      bestTime: "Mar - May, Sep - Nov",
      cuisine: "Sushi, ramen, traditional Japanese",
      image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  

const popular = () => {
    const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
    
    const memoizedDestinations = useMemo(() => destinations, []);
    
    const handleDestinationClick = useCallback((destination) => {
        setSelectedDestination(destination);
    }, []);
  return (
    <div>
      <section 
        className="relative w-full bg-cover bg-center bg-no-repeat min-h-screen flex flex-col will-change-transform"
        style={{
          backgroundImage: `url('${selectedDestination.image}')`
        }}
      >
        {/* Background Overlay */}
        
        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-between max-w-7xl mx-auto w-full px-4 lg:px-6 py-8 lg:py-10">
          
          {/* Header Section */}
          <div className="mb-8 lg:mb-10">
            <div className="max-w-4xl">
              <h2 
                className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-wide"
                style={{ fontFamily: '"Bodoni Bd BT", serif' }}
              >
                POPULAR DESTINATIONS
              </h2>
              <p className="text-sm lg:text-base text-white/90 leading-relaxed max-w-2xl">
                Discover our handpicked selection of dream destinations. From beach retreats to cultural expeditions, find your perfect getaway.
              </p>
            </div>
          </div>

          {/* Featured Destination Details */}
          <div className="mb-8 lg:mb-10">
            <div className="max-w-4xl">
              <h3 
                className="text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 tracking-wider leading-none transition-all duration-500"
                style={{ fontFamily: '"Bodoni Bd BT", serif' }}
              >
                {selectedDestination.name}
              </h3>
              
              <p className="text-xs lg:text-sm text-yellow-400 font-semibold mb-4 lg:mb-6 tracking-widest">
                {selectedDestination.country}
              </p>
              
              <p className="text-base lg:text-lg text-white/95 mb-6 lg:mb-8 leading-relaxed max-w-3xl">
                {selectedDestination.description}
              </p>

              {/* Destination Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-white">
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-400 text-xs tracking-wide">ATTRACTIONS</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{selectedDestination.attractions}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-400 text-xs tracking-wide">ACTIVITIES</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{selectedDestination.activities}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-400 text-xs tracking-wide">BEST TIME</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{selectedDestination.bestTime}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-yellow-400 text-xs tracking-wide">CUISINE</h4>
                  <p className="text-xs text-white/90 leading-relaxed">{selectedDestination.cuisine}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Destinations Grid */}
          <div className="mt-auto">
            <div className="mb-6 lg:mb-8">
              <h4 className="text-lg lg:text-xl font-semibold text-white/90 tracking-wide">
                Explore Destinations
              </h4>
            </div>
            
            <div className="flex flex-wrap justify-start gap-4 lg:gap-6">
              {memoizedDestinations.map((destination) => (
                <div
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination)}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-110 shadow-2xl ${
                    selectedDestination.id === destination.id 
                      ? 'ring-4 ring-yellow-400 scale-105' 
                      : 'hover:shadow-yellow-400/20'
                  }`}
                  style={{ 
                    width: '140px', 
                    height: '180px' 
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    selectedDestination.id === destination.id 
                      ? 'bg-black/30' 
                      : 'bg-black/50 group-hover:bg-black/40'
                  }`}></div>

                  {/* Content */}
                  <div className="relative z-10 p-3 h-full flex flex-col justify-end">
                    <div className="text-center">
                      <h5 className={`font-bold text-xs mb-1 tracking-wide transition-colors duration-300 ${
                        selectedDestination.id === destination.id 
                          ? 'text-yellow-400' 
                          : 'text-white group-hover:text-yellow-400'
                      }`}>
                        {destination.name}
                      </h5>
                      <p className="text-white/80 text-xs tracking-wider">
                        {destination.country}
                      </p>
                    </div>
                    
                    {/* Active Indicator */}
                    {selectedDestination.id === destination.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default popular
