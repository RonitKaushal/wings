"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Grid3X3,
  LayoutGrid,
  Layers,
} from "lucide-react";
import Footer from "../reusable/footer";
import Navbar from "../reusable/navbar";
import Image from "next/image";

// Indian Tours Images
const indianToursImages = [
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492177/indian-1_grhv97.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492177/indian-2_ifsbx4.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492177/indian-3_xkyukl.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492177/indian-4_lxevpf.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492178/indian-5_dyxdhr.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492180/indian-6_r8vfyg.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492179/indian-7_cfz8yt.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492178/indina-8_taxguw.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492179/indian-9_lf6ygb.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755492178/indian-10_tmksms.jpg",
];

// International Tours Images
const internationalToursImages = [
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493185/int-1_xxa3te.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493185/int-2_hkuopo.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493185/int-3_rkryz3.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493186/int-4_zydoue.jpg",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493185/int-5_mq3dio.avif",
  "https://res.cloudinary.com/dvrko1y0a/image/upload/v1755493186/int-6_pqejqa.jpg",
];

const locations = [
  "All",
  "India Tours",
  "International Tours",
  "Beach Holidays",
  "Adventure & Nature",
  "Luxury Escapes",
  "Seasonal Specials",
];

const travelData = [
  // International Tours
  {
    id: 1,
    image: internationalToursImages[0],
    title: "Swiss Alpine Paradise",
    location: "Switzerland",
    category: "International Tours",
    isVideo: false,
    height: 380,
  },
  {
    id: 2,
    image: internationalToursImages[1],
    title: "European Countryside",
    location: "France",
    category: "International Tours",
    isVideo: false,
    height: 400,
  },
  {
    id: 3,
    image: internationalToursImages[2],
    title: "Mediterranean Coast",
    location: "Greece",
    category: "International Tours",
    isVideo: false,
    height: 360,
  },
  {
    id: 4,
    image: internationalToursImages[3],
    title: "Mountain Retreat",
    location: "Austria",
    category: "International Tours",
    isVideo: false,
    height: 380,
  },
  {
    id: 5,
    image: internationalToursImages[4],
    title: "Scandinavian Beauty",
    location: "Norway",
    category: "International Tours",
    isVideo: true,
    height: 400,
  },
  {
    id: 6,
    image: internationalToursImages[5],
    title: "Italian Renaissance",
    location: "Italy",
    category: "International Tours",
    isVideo: false,
    height: 350,
  },
  // Indian Tours
  {
    id: 7,
    image: indianToursImages[0],
    title: "Rajasthan Royalty",
    location: "Rajasthan, India",
    category: "India Tours",
    isVideo: false,
    height: 380,
  },
  {
    id: 8,
    image: indianToursImages[1],
    title: "Kerala Backwaters",
    location: "Kerala, India",
    category: "India Tours",
    isVideo: false,
    height: 400,
  },
  {
    id: 9,
    image: indianToursImages[2],
    title: "Himalayan Majesty",
    location: "Himachal Pradesh, India",
    category: "India Tours",
    isVideo: false,
    height: 360,
  },
  {
    id: 10,
    image: indianToursImages[3],
    title: "Mumbai Metropolis",
    location: "Maharashtra, India",
    category: "India Tours",
    isVideo: true,
    height: 320,
  },
  {
    id: 11,
    image: indianToursImages[4],
    title: "Golden Temple Glory",
    location: "Punjab, India",
    category: "India Tours",
    isVideo: false,
    height: 390,
  },
  {
    id: 12,
    image: indianToursImages[5],
    title: "Goan Paradise",
    location: "Goa, India",
    category: "India Tours",
    isVideo: false,
    height: 370,
  },
  {
    id: 13,
    image: indianToursImages[6],
    title: "Delhi Heritage",
    location: "Delhi, India",
    category: "India Tours",
    isVideo: false,
    height: 380,
  },
  {
    id: 14,
    image: indianToursImages[7],
    title: "Varanasi Spirituality",
    location: "Uttar Pradesh, India",
    category: "India Tours",
    isVideo: false,
    height: 400,
  },
  {
    id: 15,
    image: indianToursImages[8],
    title: "Ladakh Adventures",
    location: "Ladakh, India",
    category: "India Tours",
    isVideo: false,
    height: 380,
  },
  {
    id: 16,
    image: indianToursImages[9],
    title: "Karnataka Culture",
    location: "Karnataka, India",
    category: "India Tours",
    isVideo: false,
    height: 350,
  },
];

const TravelCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewType, setViewType] = useState("masonry"); // 'carousel', 'grid', 'masonry'
  const [activeLocation, setActiveLocation] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filteredData, setFilteredData] = useState(travelData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (activeLocation === "All") {
      setFilteredData(travelData);
    } else {
      setFilteredData(
        travelData.filter((item) => item.category === activeLocation)
      );
    }
    setCurrentSlide(0);
  }, [activeLocation]);

  // Calculate max slides: we show 5 cards, so if we have more than 5 items, we can slide
  const maxSlide = Math.max(0, filteredData.length - 5);
  const canNavigate = filteredData.length > 5;

  const nextSlide = () => {
    if (canNavigate) {
      setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
    }
  };

  const prevSlide = () => {
    if (canNavigate) {
      setCurrentSlide((prev) => (prev - 1 + (maxSlide + 1)) % (maxSlide + 1));
    }
  };

  const getCardStyle = (index) => {
    const position = index - currentSlide;
    const isVisible = position >= 0 && position < 5; // Show up to 5 cards (0-4)

    if (!isVisible) return { display: "none" };

    const baseStyle = {
      position: "absolute",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      transformOrigin: "center center",
    };

    switch (position) {
      case 0: // Far left background
        return {
          ...baseStyle,
          left: "0%",
          top: "60px",
          zIndex: 1,
          transform: "scale(0.7) rotateY(-25deg) rotateZ(-5deg)",
          opacity: 0.7,
        };
      case 1: // Near left background
        return {
          ...baseStyle,
          left: "15%",
          top: "30px",
          zIndex: 2,
          transform: "scale(0.8) rotateY(-15deg) rotateZ(-2deg)",
          opacity: 0.9,
        };
      case 2: // Center main card
        return {
          ...baseStyle,
          left: "35%",
          top: "0px",
          zIndex: 4,
          transform: "scale(1) rotateY(0deg) rotateZ(0deg)",
          opacity: 1,
        };
      case 3: // Near right background
        return {
          ...baseStyle,
          left: "55%",
          top: "30px",
          zIndex: 2,
          transform: "scale(0.8) rotateY(15deg) rotateZ(2deg)",
          opacity: 0.9,
        };
      case 4: // Far right background
        return {
          ...baseStyle,
          left: "70%",
          top: "60px",
          zIndex: 1,
          transform: "scale(0.7) rotateY(25deg) rotateZ(5deg)",
          opacity: 0.7,
        };
      default:
        return { display: "none" };
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
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
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
                  ? "bg-black w-8"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
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
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
          }}
        >
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
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
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
      {filteredData.map((item, index) => (
        <div
          key={item.id}
          className={`break-inside-avoid mb-6 group cursor-pointer transform transition-all duration-500 ease-out hover:scale-[1.03] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={item.height}
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ height: `${item.height}px` }}
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Video Play Button */}
            {item.isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            )}

            {/* Card Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
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
          backgroundImage: "url(/assets/new.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          maxHeight: "100vh",
          backgroundAttachment: "fixed",
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
                  className={`text-7xl mb-4 uppercase tracking-wider leading-tight text-white transition-all duration-1000 GeistBlack ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  GALLERY
                </h1>

                {/* Description */}
                <p
                  className={`Poppins text-xl leading-relaxed mb-6 max-w-2xl mx-auto text-white transition-all duration-1200 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Explore our collection of breathtaking destinations and travel
                  experiences. From stunning landscapes to vibrant cities, let
                  these images inspire your next adventure.
                </p>
              </div>
            </div>

            <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-20 relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black GeistBold mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto Poppins">
              Explore breathtaking locations from around the world with our
              immersive travel gallery
            </p>
          </div>

          {/* View Type Toggle */}
          <div className="flex justify-center mb-8">
            {/* <div className="bg-gray-100 rounded-full p-1 flex gap-1">
              {/* <button
                onClick={() => setViewType("carousel")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === "carousel"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                <Layers className="h-4 w-4" />
                Carousel
              </button> 
              <button
                onClick={() => setViewType("grid")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === "grid"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
                Grid Roni
              </button>
              <button
                onClick={() => setViewType("masonry")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  viewType === "masonry"
                    ? "bg-black text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Masonry
              </button>
            </div> */}
          </div>

          {/* Location Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveLocation(location)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeLocation === location
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {location}
              </button>
            ))}
          </div>

          {/* Gallery Content */}
          <div className="mb-12">
            {viewType === "carousel" && renderCarousel()}
            {viewType === "grid" && renderGrid()}
            {viewType === "masonry" && renderMasonry()}
          </div>

          {/* Info Text */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Showing {filteredData.length} destinations
              {activeLocation !== "All" && ` in ${activeLocation}`}
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
