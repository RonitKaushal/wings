"use client";
import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import Footer from "../reusable/footer";
import Navbar from "../reusable/navbar";
import Image from "next/image";
import { Masonry } from "@/components/mansory";

// Indian Tours Images
// Indian Tours
const indianToursImages = [
  "/gallery/indian-tours/indian-1-Photoroom.png",
  "/gallery/indian-tours/indian-2-Photoroom.png",
  "/gallery/indian-tours/indian-3-Photoroom.png",
  "/gallery/indian-tours/indian-4-Photoroom.png",
  "/gallery/indian-tours/indian-5-Photoroom.png",
  "/gallery/indian-tours/indian-6.jpg",
  "/gallery/indian-tours/indian-7.jpg",
  "/gallery/indian-tours/indina-8.jpg", // fixed typo
  "/gallery/indian-tours/indian-9.jpg",
  "/gallery/indian-tours/indian-10.jpg",
];

// International Tours
const internationalToursImages = [
  "/gallery/international-tours/int-6.jpg",
  "/gallery/international-tours/intt-1.png",
  "/gallery/international-tours/intt-2.png",
  "/gallery/international-tours/intt-3.jpg",
  "/gallery/international-tours/intt-4.jpg",
  "/gallery/international-tours/intt-5.jpg",
];

// Seasonal Specials
const seasonalSpecialsImages = [
  "/gallery/season specials/1.jpg",
  "/gallery/season specials/2.jpg",
  "/gallery/season specials/3.jpg",
  "/gallery/season specials/4.jpg",
  "/gallery/season specials/5.jpg",
  "/gallery/season specials/5.jpg",
  "/gallery/season specials/6.jpg",
  "/gallery/season specials/7.jpg",
  "/gallery/season specials/8.png",
  "/gallery/season specials/9.png",
  "/gallery/season specials/10.png",

];

// Adventure & Nature
const adventureNatureImages = [
  "/gallery/adventure/img1.jpg",
  "/gallery/adventure/img2.jpg",
  "/gallery/adventure/img3.png",
  "/gallery/adventure/img4.png",
  "/gallery/adventure/img5.png",
  "/gallery/adventure/img6.jpg",
  "/gallery/adventure/img7.png",
  "/gallery/adventure/img8.jpg",
  "/gallery/adventure/img9.jpg",
  "/gallery/adventure/img10.jpg",

];

// Beach Holidays
const beachHolidaysImages = [
  "/gallery/beach-holidays/ANDAMAN-4N-5D-TOUR-PACKAGE-768x960-Photoroom.png",
  "/gallery/beach-holidays/BALI-DOUBLE-DELIGHT-PACKAGE02 (1)-Photoroom.png",
  "/gallery/beach-holidays/gettyimages-541398936-612x612.jpg",
  "/gallery/beach-holidays/gettyimages-1150434012-612x612.jpg",
  "/gallery/beach-holidays/gettyimages-1847868326-612x612.jpg",
  "/gallery/beach-holidays/jamai-Photoroom.png",
  "/gallery/beach-holidays/thailand-768x960 (1)-Photoroom.png",
];


const locations = [
  "All",
  "India Tours",
  "International Tours",
  "Beach Holidays",
  "Adventure & Nature",
  "Seasonal Specials",
];

const travelData = [
  // 🌍 International Tours
  {
    id: 1,
    image: internationalToursImages[0],
    title: "Swiss Alpine Paradise",
    location: "Switzerland",
    category: "International Tours",
    height: 380,
  },
  {
    id: 2,
    image: internationalToursImages[1],
    title: "European Countryside",
    location: "France",
    category: "International Tours",
    height: 400,
  },
  {
    id: 3,
    image: internationalToursImages[2],
    title: "Mediterranean Coast",
    location: "Greece",
    category: "International Tours",
    height: 360,
  },
  {
    id: 4,
    image: internationalToursImages[3],
    title: "Mountain Retreat",
    location: "Austria",
    category: "International Tours",
    height: 380,
  },
  {
    id: 5,
    image: internationalToursImages[4],
    title: "Scandinavian Beauty",
    location: "Norway",
    category: "International Tours",
    height: 400,
  },
  {
    id: 6,
    image: internationalToursImages[5],
    title: "Italian Renaissance",
    location: "Italy",
    category: "International Tours",
    height: 350,
  },

  // 🇮🇳 Indian Tours
  {
    id: 7,
    image: indianToursImages[0],
    title: "Rajasthan Royalty",
    location: "Rajasthan, India",
    category: "India Tours",
    height: 380,
  },
  {
    id: 8,
    image: indianToursImages[1],
    title: "Kerala Backwaters",
    location: "Kerala, India",
    category: "India Tours",
    height: 400,
  },
  {
    id: 9,
    image: indianToursImages[2],
    title: "Himalayan Majesty",
    location: "Himachal Pradesh, India",
    category: "India Tours",
    height: 360,
  },
  {
    id: 10,
    image: indianToursImages[3],
    title: "Mumbai Metropolis",
    location: "Maharashtra, India",
    category: "India Tours",
    height: 320,
  },
  {
    id: 11,
    image: indianToursImages[4],
    title: "Golden Temple Glory",
    location: "Punjab, India",
    category: "India Tours",
    height: 390,
  },
  {
    id: 12,
    image: indianToursImages[5],
    title: "Goan Paradise",
    location: "Goa, India",
    category: "India Tours",
    height: 370,
  },
  {
    id: 13,
    image: indianToursImages[6],
    title: "Delhi Heritage",
    location: "Delhi, India",
    category: "India Tours",
    height: 380,
  },
  {
    id: 14,
    image: indianToursImages[7],
    title: "Varanasi Spirituality",
    location: "Uttar Pradesh, India",
    category: "India Tours",
    height: 400,
  },
  {
    id: 15,
    image: indianToursImages[8],
    title: "Ladakh Adventures",
    location: "Ladakh, India",
    category: "India Tours",
    height: 380,
  },
  {
    id: 16,
    image: indianToursImages[9],
    title: "Karnataka Culture",
    location: "Karnataka, India",
    category: "India Tours",
    height: 350,
  },

  // 🌞 Seasonal Specials
  {
    id: 17,
    image: seasonalSpecialsImages[0],
    title: "Mystic Arunachal",
    location: "Arunachal Pradesh, India",
    category: "Seasonal Specials",
    height: 380,
  },
  {
    id: 18,
    image: seasonalSpecialsImages[1],
    title: "Bali Double Delight",
    location: "Bali, Indonesia",
    category: "Seasonal Specials",
    height: 400,
  },
  {
    id: 19,
    image: seasonalSpecialsImages[2],
    title: "Diani Raha Escape",
    location: "Kenya",
    category: "Seasonal Specials",
    height: 360,
  },
  {
    id: 20,
    image: seasonalSpecialsImages[3],
    title: "Dubai Desert Luxury",
    location: "Dubai, UAE",
    category: "Seasonal Specials",
    height: 390,
  },
  {
    id: 21,
    image: seasonalSpecialsImages[4],
    title: "Kashmir Winter Wonderland",
    location: "Kashmir, India",
    category: "Seasonal Specials",
    height: 370,
  },
  {
    id: 22,
    image: seasonalSpecialsImages[5],
    title: "Kuala Lumpur City Lights",
    location: "Malaysia",
    category: "Seasonal Specials",
    height: 400,
  },
  {
    id: 23,
    image: seasonalSpecialsImages[6],
    title: "Tropical Malaysia",
    location: "Malaysia",
    category: "Seasonal Specials",
    height: 380,
  },
  {
    id: 24,
    image: seasonalSpecialsImages[7],
    title: "Masai Mara Safari",
    location: "Kenya",
    category: "Seasonal Specials",
    height: 350,
  },
  {
    id: 25,
    image: seasonalSpecialsImages[8],
    title: "Thailand Bliss",
    location: "Thailand",
    category: "Seasonal Specials",
    height: 360,
  },

  // 🌲 Adventure & Nature
  {
    id: 26,
    image: adventureNatureImages[0],
    title: "Thai Village Escape",
    location: "Thailand",
    category: "Adventure & Nature",
    height: 380,
  },
  {
    id: 27,
    image: adventureNatureImages[1],
    title: "Historic Fort Trails",
    location: "Rajasthan, India",
    category: "Adventure & Nature",
    height: 390,
  },
  {
    id: 28,
    image: adventureNatureImages[2],
    title: "Snowy Kashmir Trek",
    location: "Kashmir, India",
    category: "Adventure & Nature",
    height: 370,
  },
  {
    id: 29,
    image: adventureNatureImages[3],
    title: "Menal Waterfalls",
    location: "Rajasthan, India",
    category: "Adventure & Nature",
    height: 360,
  },
  {
    id: 30,
    image: adventureNatureImages[4],
    title: "Nepal Mountain Spirit",
    location: "Nepal",
    category: "Adventure & Nature",
    height: 400,
  },
  {
    id: 31,
    image: adventureNatureImages[5],
    title: "River Valley Escape",
    location: "Himachal, India",
    category: "Adventure & Nature",
    height: 380,
  },
  {
    id: 32,
    image: adventureNatureImages[6],
    title: "Shimla-Manali-Kasol",
    location: "Himachal Pradesh, India",
    category: "Adventure & Nature",
    height: 400,
  },
  {
    id: 33,
    image: adventureNatureImages[7],
    title: "Swiss Alps Ride",
    location: "Switzerland",
    category: "Adventure & Nature",
    height: 350,
  },
  {
    id: 34,
    image: adventureNatureImages[8],
    title: "Jungle Waterfalls",
    location: "Kerala, India",
    category: "Adventure & Nature",
    height: 370,
  },
  {
    id: 35,
    image: adventureNatureImages[9],
    title: "Himalayan Monastery",
    location: "Himachal, India",
    category: "Adventure & Nature",
    height: 360,
  },

  // 🏖️ Beach Holidays
  {
    id: 36,
    image: beachHolidaysImages[0],
    title: "Andaman Islands Escape",
    location: "Andaman, India",
    category: "Beach Holidays",
    height: 390,
  },
  {
    id: 37,
    image: beachHolidaysImages[1],
    title: "Bali Beach Retreat",
    location: "Bali, Indonesia",
    category: "Beach Holidays",
    height: 370,
  },
  {
    id: 38,
    image: beachHolidaysImages[2],
    title: "Seashell Paradise",
    location: "Maldives",
    category: "Beach Holidays",
    height: 360,
  },
  {
    id: 39,
    image: beachHolidaysImages[3],
    title: "Golden Sand Shores",
    location: "Thailand",
    category: "Beach Holidays",
    height: 350,
  },
  {
    id: 40,
    image: beachHolidaysImages[4],
    title: "Azure Coastline",
    location: "Mauritius",
    category: "Beach Holidays",
    height: 400,
  },
  {
    id: 41,
    image: beachHolidaysImages[5],
    title: "Jamaican Vibes",
    location: "Jamaica",
    category: "Beach Holidays",
    height: 380,
  },
  {
    id: 42,
    image: beachHolidaysImages[6],
    title: "Tropical Thailand",
    location: "Thailand",
    category: "Beach Holidays",
    height: 390,
  },
];



const TravelGallery = () => {
  const [activeLocation, setActiveLocation] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const filteredData =
    activeLocation === "All"
      ? travelData
      : travelData.filter((item) => item.category === activeLocation);

  return (
    <div className="relative w-full bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 min-h-screen flex flex-col w-full">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1
                  className={`mb-6 uppercase GeistBlack text-4xl md:text-7xl tracking-wider leading-tight text-white transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  GALLERY
                </h1>

                {/* Subtitle */}
                <div
                  className={`mb-6 transition-all duration-1200 Poppins delay-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <h2 className="text-sm PoppinBold md:text-xl max-w-3xl text-gray-200 mb-4 tracking-wide">
                   Explore stunning destinations and vibrant cultures. Let these images inspire your next adventure.
                  </h2>
                </div>

                {/* Description */}
                <p
                  className={`Poppins text-sm md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto text-gray-100 transition-all duration-1400 delay-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Your trusted partner in creating extraordinary travel
                  experiences. We combine years of industry expertise with
                  personalized service to deliver seamless journeys that exceed
                  expectations.
                </p>

                {/* Key Stats */}


                <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery Section */}
      <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-14">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold GeistBold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Discover Amazing Destinations
            </h2>
            <p className="text-lg text-gray-600 Poppins max-w-2xl mx-auto">
              Handpicked travel inspirations for your next journey
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeLocation === loc
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <Masonry>
            {filteredData.map((item, i) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border overflow-hidden transition-all duration-300"
                // style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-t-xl transition-all duration-500"
                    loading="lazy"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute z-0 inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Video Play */}
                  {/* {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  )} */}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{item.location}</p>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </Masonry>

          {/* Info */}
          <div className="text-center text-gray-600">
            Showing {filteredData.length} destinations
            {activeLocation !== "All" && ` in ${activeLocation}`}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TravelGallery;
