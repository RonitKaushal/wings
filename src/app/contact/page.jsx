"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Country, State, City } from 'country-state-city';
import Footer from "../reusable/footer";

import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Mail,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from '../reusable/navbar';

const ContactUsPage = () => {
  const [serviceType, setServiceType] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedCountry, setSelectedCountry] = useState('juba');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [destinationState, setDestinationState] = useState('');
  const [nationality, setNationality] = useState('');
  
  // Get all countries for the dropdowns
  const countries = Country.getAllCountries();
  
  // Get states based on selected country
  const getStates = (countryCode) => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle visa details change
  const handleVisaDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      visaDetails: {
        ...prev.visaDetails,
        [name]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    try {
      // Base booking data
      const bookingData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || formData.phone, // Use phone if whatsapp not provided
        serviceType: serviceType,
        nationality: formData.nationality || 'Not specified',
        destinationCountry: destinationCountry,
        destinationState: destinationState,
        message: formData.message
      };

      // Add service-specific data
      switch(serviceType) {
        case 'visa':
          bookingData.visaDetails = {
            age: formData.visaDetails.age,
            gender: formData.visaDetails.gender,
            numberOfVisas: formData.visaDetails.numberOfVisas,
            visaType: visaType,
            visaCountry: visaCountry
          };
          break;
          
        case 'flights':
          bookingData.flightDetails = {
            tripType: tripType,
            flightClass: flightClass,
            departureCity: departureCity,
            arrivalCity: arrivalCity,
            departureDate: flightDepartureDate,
            returnDate: tripType === 'round-trip' ? flightReturnDate : undefined,
            preferredAirline: preferredAirline,
            adults: flightAdults,
            children: flightChildren,
            infants: flightInfants
          };
          break;
          
        case 'hotels':
          bookingData.hotelDetails = {
            destinationCity: hotelDestinationCity,
            numberOfGuests: parseInt(numberOfGuests) || 1,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberOfRooms: parseInt(numberOfRooms) || 1,
            roomType: roomType,
            budget: hotelBudget
          };
          break;
          
        case 'tours':
          bookingData.toursDetails = {
            departureDate: checkInDate, // Reusing checkInDate for tours
            numberOfNights: parseInt(numberOfNights) || 1,
            hotelStars: hotelStars,
            budget: toursBudget,
            adults: toursAdults,
            children: toursChildren,
            infants: toursInfants
          };
          break;
      }

      const response = await fetch('https://wwtravels.net/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        whatsappNumber: '',
        serviceType: 'visa',
        nationality: '',
        visaDetails: {
          age: '',
          gender: 'male',
          numberOfVisas: '1',
          visaType: '',
          visaCountry: ''
        },
        message: ''
      });
      
      // Reset all service-specific states
      setVisaType('');
      setVisaCountry('');
      setDestinationCountry('');
      setDestinationState('');
      
      // Reset flight states
      setTripType('round-trip');
      setFlightClass('economy');
      setDepartureCity('');
      setArrivalCity('');
      setFlightDepartureDate('');
      setFlightReturnDate('');
      setPreferredAirline('');
      setFlightAdults(1);
      setFlightChildren(0);
      setFlightInfants(0);
      
      // Reset hotel states
      setHotelDestinationCity('');
      setCheckInDate('');
      setCheckOutDate('');
      setNumberOfGuests('');
      setNumberOfRooms('');
      setRoomType('');
      setHotelBudget('');
      
      // Reset tours states
      setNumberOfNights('');
      setHotelStars('');
      setToursBudget('');
      setToursAdults(1);
      setToursChildren(0);
      setToursInfants(0);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle country change
  const handleCountryChange = (countryCode) => {
    setDestinationCountry(countryCode);
    setDestinationState('');
  };
  
  // Handle state change
  const handleStateChange = (stateCode) => {
    setDestinationState(stateCode);
  };
  
  // Get selected country object
  const selectedCountryObj = countries.find(c => c.isoCode === destinationCountry);
  
  // Get states for selected country
  const states = getStates(destinationCountry);
    // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    serviceType: 'visa',
    nationality: '',
    visaDetails: {
      age: '',
      gender: 'male',
      numberOfVisas: '1',
      visaType: '',
      visaCountry: ''
    },
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [visaType, setVisaType] = useState('');
  const [visaCountry, setVisaCountry] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  // Flight reservation states
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [flightDepartureDate, setFlightDepartureDate] = useState('');
  const [flightReturnDate, setFlightReturnDate] = useState('');
  const [tripType, setTripType] = useState('round-trip');
  const [flightClass, setFlightClass] = useState('economy');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightInfants, setFlightInfants] = useState(0);
  const [preferredAirline, setPreferredAirline] = useState('');
  
  // Hotel reservation states
  const [hotelDestinationCity, setHotelDestinationCity] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [numberOfRooms, setNumberOfRooms] = useState('');
  const [roomType, setRoomType] = useState('');
  const [hotelBudget, setHotelBudget] = useState('');

  // Tours and packages states
  const [toursAdults, setToursAdults] = useState(1);
  const [toursChildren, setToursChildren] = useState(0);
  const [toursInfants, setToursInfants] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState('');
  const [hotelStars, setHotelStars] = useState('');
  const [toursBudget, setToursBudget] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Passenger counter component
  const PassengerCounter = ({ label, value, setValue, min = 0, max = 20, description }) => (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-gray-800 font-medium text-sm">{label}</Label>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setValue(Math.max(min, value - 1))}
            disabled={value <= min}
          >
            <Minus size={14} />
          </Button>
          <span className="w-8 text-center font-semibold text-gray-800">{value}</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setValue(Math.min(max, value + 1))}
            disabled={value >= max}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  // Office locations data
  const officeLocations = {
    juba: {
      name: 'Juba, Republic of South Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+211 911544294',
      email: 'reservation.juba@holidaydreamz.net',
      address: 'Opp. Zain Building, Airport Ministry Road, Juba, Republic of South Sudan'
    },
    nairobi: {
      name: 'Nairobi-Kenya',
      company: 'Fly Holiday Dreamz Travel Mgt. Ltd.',
      phone: '+254 742449110',
      email: 'reservation.nbo@holidaydreamz.net',
      address: 'No 6, Ground Floor, Park Suit\'s, Parkland Road, Nairobi, Kenya'
    },
    khartoum: {
      name: 'Khartoum- Sudan',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+249 927992295',
      email: 'reservation.krt@holidaydreamz.net',
      address: 'Shop No 2, Bldg No 2, Block 2cg, Sylaphos Building, Jamuhiriya Street, Khartoum East, Sudan'
    },
    ajmer: {
      name: 'Ajmer- India',
      company: 'Fly Holiday Dreamz Travel Management Pvt. Ltd',
      phone: '+91 7300078037',
      email: 'reservation.ajm@holidaydreamz.net',
      address: '1 ch-19 Janta Colony, Vaishali Nagar Ajmer, Rajasthan, India, 305004'
    },
    kampala: {
      name: 'Kampala, Uganda',
      company: 'Holiday Dreamz Travel Management Co. Ltd',
      phone: '+256 707009367, +254 707009366',
      email: 'reservation.kla@holidaydreamz.net',
      address: 'UG 07,Plot 18, Nalukwago Complex, George Street, Kampala, Uganda'
    }
  };

  // Social media links
  const socialMediaLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      url: 'https://facebook.com/holidaydreamztravel',
      username: '@holidaydreamztravel'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      url: 'https://instagram.com/holidaydreamztravel',
      username: '@holidaydreamztravel'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      url: 'https://linkedin.com/company/holiday-dreamz-travel',
      username: 'Holiday Dreamz Travel'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      url: 'https://wa.me/211911544294',
      username: '+211 911544294'
    }
  ];

  // Countries and States data
  const countriesAndStates = {
    'United States': [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
      'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
      'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
      'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
      'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
      'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    'Canada': [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
      'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
      'Quebec', 'Saskatchewan', 'Yukon'
    ],
    'Australia': [
      'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
      'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
    ],
    'United Kingdom': [
      'England', 'Scotland', 'Wales', 'Northern Ireland'
    ],
    'India': [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
      'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
      'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
      'Uttarakhand', 'West Bengal'
    ],
    'Germany': [
      'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse',
      'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate',
      'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
    ],
    'Other Countries': ['France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'China', 'Brazil', 'Mexico']
  };

  // Popular cities for flights
  const popularCities = [
    'New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Dubai', 'Istanbul', 'Singapore',
    'Hong Kong', 'Bangkok', 'Mumbai', 'Delhi', 'Cairo', 'Nairobi', 'Johannesburg', 'Lagos',
    'Sydney', 'Melbourne', 'Toronto', 'Vancouver', 'Berlin', 'Rome', 'Madrid', 'Amsterdam',
    'Zurich', 'Vienna', 'Brussels', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Warsaw',
    'Prague', 'Budapest', 'Athens', 'Lisbon', 'Barcelona', 'Milan', 'Frankfurt', 'Munich'
  ];

  // Popular airlines
  const popularAirlines = [
    'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways',
    'Air France', 'KLM', 'Turkish Airlines', 'Etihad Airways', 'Swiss International',
    'Delta Air Lines', 'United Airlines', 'American Airlines', 'Virgin Atlantic',
    'Ethiopian Airlines', 'Kenya Airways', 'South African Airways', 'Egypt Air'
  ];

  return (
    <div className="relative w-full bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/new/24.png)',          
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative min-h-screen flex flex-col w-full">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center px-4 sm:px-8">
                {/* Main Heading */}
                <h1 
                  className={`GeistBlack text-4xl md:text-7xl mb-4 uppercase tracking-wider leading-tight text-white transition-all duration-1000 GeistBlack ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  CONTACT US
                </h1>

                {/* Description */}
                <p 
                  className={`Poppins text-sm md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto text-white transition-all duration-1200 Poppins ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Have questions? Ready to book your trip? Our travel experts are here to help you every step of the way. Whether you need flight options, visa help, or a full vacation plan—we're just a message away.
                </p>
              </div>
            </div>

                        <div className="absolute z-0 top-0 left-0 w-[100vw] h-full bg-gradient-to-b from-white/80 via-transparent to-transparent"></div>

          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card className="bg-white border">
                <CardContent className="p-6 sm:p-8">
                  <h2 
                    className="text-black mb-4 font-bold uppercase text-center"
                  >
                    Get In Touch With Us
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* Personal Information Section */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 
                          className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block"
                        >
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Full Name *
                            </Label>
                            <Input
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              required
                            />
                          </div>

                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Email Address *
                            </Label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address"
                              className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              required
                            />
                          </div>

                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Phone Number *
                            </Label>
                            <div className="space-y-2">
                              <Input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                required
                              />
                              <Input
                                name="whatsappNumber"
                                type="tel"
                                value={formData.whatsappNumber}
                                onChange={handleInputChange}
                                placeholder="WhatsApp number (if different)"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Nationality *
                            </Label>
                            <Select 
                              value={formData.nationality} 
                              onValueChange={(value) => {
                                setFormData(prev => ({
                                  ...prev,
                                  nationality: value
                                }));
                              }}
                            >
                              <SelectTrigger 
                                className="rounded-lg bg-gray-50 border border-gray-200 w-full transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                style={{ backgroundColor: '#f9fafb', color: 'black' }}
                              >
                                <SelectValue placeholder="Select your nationality" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white max-h-96">
                                {countries.map((country) => (
                                  <SelectItem 
                                    key={country.isoCode} 
                                    value={country.name}
                                    className="hover:bg-blue-50 text-black"
                                  >
                                    {country.name} ({country.isoCode})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Service Information Section */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 
                          className="text-gray-800 mb-3 font-semibold text-lg border-b border-gray-200 pb-1 inline-block"
                        >
                          Service Information
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Service Type *
                            </Label>
                            <Select 
                              value={serviceType} 
                              onValueChange={(value) => {
                                setServiceType(value);
                                setFormData(prev => ({
                                  ...prev,
                                  serviceType: value
                                }));
                              }}
                            >
                              <SelectTrigger 
                                className="rounded-lg bg-gray-50 border border-gray-200 w-full transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                style={{ backgroundColor: '#f9fafb', color: 'black' }}
                              >
                                <SelectValue placeholder="What service do you need?" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                <SelectItem value="tours" className="hover:bg-blue-50 text-black">
                                  🌍 Tours and Packages
                                </SelectItem>
                                <SelectItem value="visa" className="hover:bg-blue-50 text-black">
                                  📋 Visa Assistance
                                </SelectItem>
                                <SelectItem value="flights" className="hover:bg-blue-50 text-black">
                                  ✈️ Flight Bookings
                                </SelectItem>
                                <SelectItem value="hotels" className="hover:bg-blue-50 text-black">
                                  🏨 Hotel Reservations
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label 
                              className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                            >
                              Destination Country
                            </Label>
                            <Select 
                              value={destinationCountry}
                              onValueChange={handleCountryChange}
                            >
                              <SelectTrigger 
                                className="rounded-lg bg-gray-50 border border-gray-200 w-full transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                style={{ backgroundColor: '#f9fafb', color: 'black' }}
                              >
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                {countries.map((country) => (
                                  <SelectItem 
                                    key={country.isoCode} 
                                    value={country.isoCode}
                                    className="hover:bg-blue-50 text-black"
                                  >
                                    {country.flag} {country.name} ({country.isoCode})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {destinationCountry && (
                            <div>
                              <Label className="text-gray-600 mb-1 text-xs font-semibold uppercase block">
                                Destination State/Province
                              </Label>
                              <Select 
                                value={destinationState} 
                                onValueChange={handleStateChange}
                                disabled={!destinationCountry}
                              >
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue 
                                    placeholder={
                                      selectedCountryObj 
                                        ? `Select state in ${selectedCountryObj.name}` 
                                        : 'Select a country first'
                                    } 
                                  />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {states.map((state) => (
                                    <SelectItem 
                                      key={state.isoCode} 
                                      value={state.isoCode}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {state.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          

                        </div>
                      </CardContent>
                    </Card>

                    {/* Flight Reservation Section */}
                    {serviceType === 'flights' && (
                      <Card className="shadow-none border">
                        <CardContent className="p-3">
                          <h3 
                            className="text-gray-800 mb-3 font-semibold text-lg border pb-1 inline-block"
                          >
                            Flight Reservation Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Trip Type *
                              </Label>
                              <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-row mt-1">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="one-way" id="one-way" />
                                  <Label htmlFor="one-way" className="text-gray-600">One Way</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="round-trip" id="round-trip" />
                                  <Label htmlFor="round-trip" className="text-gray-600">Round Trip</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Flight Class *
                              </Label>
                              <Select value={flightClass} onValueChange={setFlightClass}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="economy" className="hover:bg-blue-50 text-black">
                                    Economy Class
                                  </SelectItem>
                                  <SelectItem value="premium-economy" className="hover:bg-blue-50 text-black">
                                    Premium Economy
                                  </SelectItem>
                                  <SelectItem value="business" className="hover:bg-blue-50 text-black">
                                    Business Class
                                  </SelectItem>
                                  <SelectItem value="first" className="hover:bg-blue-50 text-black">
                                    First Class
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Departure City *
                              </Label>
                              <Select value={departureCity} onValueChange={setDepartureCity}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select departure city" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {popularCities.map((city) => (
                                    <SelectItem 
                                      key={city} 
                                      value={city}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Arrival City *
                              </Label>
                              <Select value={arrivalCity} onValueChange={setArrivalCity}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select arrival city" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {popularCities.map((city) => (
                                    <SelectItem 
                                      key={city} 
                                      value={city}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Departure Date *
                              </Label>
                              <Input
                                type="date"
                                value={flightDepartureDate}
                                onChange={(e) => setFlightDepartureDate(e.target.value)}
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            {tripType === 'round-trip' && (
                              <div>
                                <Label 
                                  className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                                >
                                  Return Date *
                                </Label>
                                <Input
                                  type="date"
                                  value={flightReturnDate}
                                  onChange={(e) => setFlightReturnDate(e.target.value)}
                                  className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                />
                              </div>
                            )}

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Preferred Airline (Optional)
                              </Label>
                              <Select value={preferredAirline} onValueChange={setPreferredAirline}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Any airline" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {popularAirlines.map((airline) => (
                                    <SelectItem 
                                      key={airline} 
                                      value={airline}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {airline}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Flight Passengers Section */}
                          <div className="mt-4">
                            <Label className="text-gray-600 mb-2 text-xs font-semibold uppercase block">
                              Number of Passengers *
                            </Label>
                            <div className="space-y-3">
                              <PassengerCounter
                                label="Adults"
                                value={flightAdults}
                                setValue={setFlightAdults}
                                min={1}
                                description="12+ years"
                              />
                              <PassengerCounter
                                label="Children"
                                value={flightChildren}
                                setValue={setFlightChildren}
                                min={0}
                                description="2-11 years"
                              />
                              <PassengerCounter
                                label="Infants"
                                value={flightInfants}
                                setValue={setFlightInfants}
                                min={0}
                                description="Under 2 years"
                              />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Total Passengers: {flightAdults + flightChildren + flightInfants}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Hotel Reservation Section */}
                    {serviceType === 'hotels' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 
                            className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block"
                          >
                            Hotel Reservation Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Hotel Destination City *
                              </Label>
                              <Select value={hotelDestinationCity} onValueChange={setHotelDestinationCity}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select destination city" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {popularCities.map((city) => (
                                    <SelectItem 
                                      key={city} 
                                      value={city}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Number of Guests *
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many guests?"
                                value={numberOfGuests}
                                onChange={(e) => setNumberOfGuests(e.target.value)}
                                min="1"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Check-in Date *
                              </Label>
                              <Input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Check-out Date *
                              </Label>
                              <Input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Number of Rooms *
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many rooms?"
                                value={numberOfRooms}
                                onChange={(e) => setNumberOfRooms(e.target.value)}
                                min="1"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Room Type (Optional)
                              </Label>
                              <Select value={roomType} onValueChange={setRoomType}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Any room type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="standard" className="hover:bg-blue-50 text-black">
                                    Standard Room
                                  </SelectItem>
                                  <SelectItem value="deluxe" className="hover:bg-blue-50 text-black">
                                    Deluxe Room
                                  </SelectItem>
                                  <SelectItem value="suite" className="hover:bg-blue-50 text-black">
                                    Suite
                                  </SelectItem>
                                  <SelectItem value="family" className="hover:bg-blue-50 text-black">
                                    Family Room
                                  </SelectItem>
                                  <SelectItem value="executive" className="hover:bg-blue-50 text-black">
                                    Executive Room
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Budget Range (Optional)
                              </Label>
                              <Select value={hotelBudget} onValueChange={setHotelBudget}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="budget" className="hover:bg-blue-50 text-black">
                                    Budget ($50-$100 per night)
                                  </SelectItem>
                                  <SelectItem value="mid-range" className="hover:bg-blue-50 text-black">
                                    Mid-range ($100-$250 per night)
                                  </SelectItem>
                                  <SelectItem value="luxury" className="hover:bg-blue-50 text-black">
                                    Luxury ($250-$500 per night)
                                  </SelectItem>
                                  <SelectItem value="ultra-luxury" className="hover:bg-blue-50 text-black">
                                    Ultra-luxury ($500+ per night)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Visa Details Section */}
                    {serviceType === 'visa' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 
                            className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block"
                          >
                            Visa Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Your Age
                              </Label>
                              <Input
                                type="number"
                                name="age"
                                value={formData.visaDetails.age}
                                onChange={handleVisaDetailsChange}
                                placeholder="Enter your age"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                min="1"
                                max="120"
                                required
                              />
                            </div>
                            
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Gender
                              </Label>
                              <RadioGroup 
                                value={formData.visaDetails.gender} 
                                onValueChange={(value) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      gender: value
                                    }
                                  }));
                                }} 
                                className="flex flex-row mt-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <Label htmlFor="male" className="text-gray-600">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <Label htmlFor="female" className="text-gray-600">Female</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Number of Visas
                              </Label>
                              <Input
                                type="number"
                                name="numberOfVisas"
                                value={formData.visaDetails.numberOfVisas}
                                onChange={handleVisaDetailsChange}
                                placeholder="How many visas?"
                                min="1"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                                required
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Visa Type
                              </Label>
                              <Select 
                                value={visaType} 
                                onValueChange={(value) => {
                                  setVisaType(value);
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      visaType: value
                                    }
                                  }));
                                }}
                                required
                              >
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select visa type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="tourist" className="hover:bg-blue-50 text-black">
                                    Tourist Visa
                                  </SelectItem>
                                  <SelectItem value="business" className="hover:bg-blue-50 text-black">
                                    Business Visa
                                  </SelectItem>
                                  <SelectItem value="student" className="hover:bg-blue-50 text-black">
                                    Student Visa
                                  </SelectItem>
                                  <SelectItem value="work" className="hover:bg-blue-50 text-black">
                                    Work Visa
                                  </SelectItem>
                                  <SelectItem value="other" className="hover:bg-blue-50 text-black">
                                    Other
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Which Country's Visa Do You Want?
                              </Label>
                              <Select 
                                value={visaCountry} 
                                onValueChange={(value) => {
                                  setVisaCountry(value);
                                  setFormData(prev => ({
                                    ...prev,
                                    visaDetails: {
                                      ...prev.visaDetails,
                                      visaCountry: value
                                    }
                                  }));
                                }}
                                required
                              >
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select visa country" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-96 bg-white">
                                  {countries.map((country) => (
                                    <SelectItem 
                                      key={country.isoCode} 
                                      value={country.name}
                                      className="hover:bg-blue-50 text-black"
                                    >
                                      {country.flag} {country.name} ({country.isoCode})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Tours Section */}
                    {serviceType === 'tours' && (
                      <Card className="shadow-none border border-gray-100">
                        <CardContent className="p-3">
                          <h3 
                            className="text-gray-800 mb-3 font-semibold text-lg border-b-2 border-blue-600 pb-1 inline-block"
                          >
                            Tours & Packages Details
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Departure Date
                              </Label>
                              <Input
                                type="date"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>
                            
                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Number of Nights
                              </Label>
                              <Input
                                type="number"
                                placeholder="How many nights?"
                                value={numberOfNights}
                                onChange={(e) => setNumberOfNights(e.target.value)}
                                min="1"
                                className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg"
                              />
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Hotel Star Rating (Optional)
                              </Label>
                              <Select value={hotelStars} onValueChange={setHotelStars}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select preferred star rating" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="any" className="hover:bg-blue-50 text-black">
                                    Any Rating
                                  </SelectItem>
                                  <SelectItem value="3-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐ 3 Star
                                  </SelectItem>
                                  <SelectItem value="4-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐⭐ 4 Star
                                  </SelectItem>
                                  <SelectItem value="5-star" className="hover:bg-blue-50 text-black">
                                    ⭐⭐⭐⭐⭐ 5 Star
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label 
                                className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                              >
                                Budget Per Person (Optional)
                              </Label>
                              <Select value={toursBudget} onValueChange={setToursBudget}>
                                <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                                  <SelectItem value="budget" className="hover:bg-blue-50 text-black">
                                    Budget ($500-$1,000)
                                  </SelectItem>
                                  <SelectItem value="mid-range" className="hover:bg-blue-50 text-black">
                                    Mid-range ($1,000-$2,500)
                                  </SelectItem>
                                  <SelectItem value="premium" className="hover:bg-blue-50 text-black">
                                    Premium ($2,500-$5,000)
                                  </SelectItem>
                                  <SelectItem value="luxury" className="hover:bg-blue-50 text-black">
                                    Luxury ($5,000+)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Tours Passengers Section */}
                          <div className="mt-4">
                            <Label className="text-gray-600 mb-2 text-xs font-semibold uppercase block">
                              Number of Travelers *
                            </Label>
                            <div className="space-y-3">
                              <PassengerCounter
                                label="Adults"
                                value={toursAdults}
                                setValue={setToursAdults}
                                min={1}
                                description="12+ years"
                              />
                              <PassengerCounter
                                label="Children"
                                value={toursChildren}
                                setValue={setToursChildren}
                                min={0}
                                description="2-11 years"
                              />
                              <PassengerCounter
                                label="Infants"
                                value={toursInfants}
                                setValue={setToursInfants}
                                min={0}
                                description="Under 2 years"
                              />
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              Total Travelers: {toursAdults + toursChildren + toursInfants}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Message Section */}
                    <Card className="shadow-none border border-gray-100">
                      <CardContent className="p-3">
                        <h3 
                          className="text-gray-800 mb-3 font-semibold text-lg border-b pb-1 inline-block"
                        >
                          Your Message
                        </h3>
                        
                        <Label 
                          className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                        >
                          Tell us about your requirements
                        </Label>
                        <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Please provide details about your travel requirements, special requests, budget considerations, or any questions you have..."
                            className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg resize-none"
                          />
                      </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                      <div className="h-4"></div>
                      {isSubmitted ? (
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                          <p className="font-medium">Thank you for your submission!</p>
                          <p className="text-sm">We'll get back to you soon.</p>
                        </div>
                      ) : (
                        <Button
                          type="submit"
                          className={`py-2 px-6 rounded-full bg-black text-white text-lg font-semibold uppercase shadow-lg transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-xl ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : 'Send My Request'}
                        </Button>
                      )}
                      {submitError && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                          {submitError}
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-3">
              {/* GET IN TOUCH Box */}
              <Card className="bg-white border">
                <CardContent className="p-4">
                  <h2 
                    className="mb-3 font-bold uppercase text-lg text-center"
                  >
                    Our Offices
                  </h2>

                  {/* Country Selection */}
                  <div className="mb-4">
                    <Label 
                      className="text-gray-600 mb-1 text-xs font-semibold uppercase block"
                    >
                      Select Office Location
                    </Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 hover:bg-gray-100 hover:border-blue-600 hover:shadow-md focus:bg-white focus:border-blue-600 focus:shadow-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border border-gray-200 shadow-lg bg-white">
                        <SelectItem value="juba" className="hover:bg-blue-50 text-black">
                          🇸🇸 Juba, Republic of South Sudan
                        </SelectItem>
                        <SelectItem value="nairobi" className="hover:bg-blue-50 text-black">
                          🇰🇪 Nairobi, Kenya
                        </SelectItem>
                        <SelectItem value="khartoum" className="hover:bg-blue-50 text-black">
                          🇸🇩 Khartoum, Sudan
                        </SelectItem>
                        <SelectItem value="ajmer" className="hover:bg-blue-50 text-black">
                          🇮🇳 Ajmer, India
                        </SelectItem>
                        <SelectItem value="kampala" className="hover:bg-blue-50 text-black">
                          🇺🇬 Kampala, Uganda
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-3" />

                  {/* Dynamic Contact Information */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Phone:
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Email:
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Address:
                        </p>
                        <p className="mb-0.5 text-gray-600 italic">
                          {officeLocations[selectedCountry].company}
                        </p>
                        <p className="text-gray-600">
                          {officeLocations[selectedCountry].address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-blue-600" />
                      <div>
                        <p className="font-semibold mb-0.5 text-black text-base">
                          Office Hours:
                        </p>
                        <p className="mb-1 text-gray-600">
                          Monday - Saturday: 9:00 AM to 7:00 PM
                        </p>
                        <p className="text-gray-600">
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                
              <div className="h-4"></div>

              {/* ENHANCED SOCIAL MEDIA Box */}
              <Card className="bg-white border">
                <CardContent className="p-4">
                  <h2 
                    className="mb-4 font-bold uppercase text-lg text-center"
                  >
                    Connect With Us
                  </h2>

                  {/* Social Media Icons Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {socialMediaLinks.slice(0, 4).map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <div key={index} className="text-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            style={{ 
                              backgroundColor: social.color,
                              borderColor: social.color,
                              color: 'white'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            title={`Follow us on ${social.name}`}
                          >
                            <IconComponent size={24} />
                          </Button>
                          <p className="mt-1 text-xs font-medium text-gray-600">
                            {social.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                
                  <div className="h-4"></div>

                  {/* Social Media Details */}
                  <div className="space-y-2.5">
                    <p className="text-center text-gray-600 text-sm italic py-2">
                      Follow us on social media for travel tips, deals, and updates!
                    </p>
                  </div>

                  {/* WhatsApp Direct Contact */}
                  <Separator className="my-3" />
                  
                  <div 
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-green-50 border border-green-200 transition-all duration-300 hover:bg-green-100 hover:-translate-y-0.5"
                    onClick={() => window.open(socialMediaLinks[5].url, '_blank')}
                  >
                    <MessageCircle size={24} className="text-green-600" />
                    <div className="w-full flex justify-center h-auto items-start flex-col">
                      <p className="font-semibold text-black text-sm">
                        <div className="h-auto"></div>
                        WhatsApp Us Directly
                      </p>
                      <p className="text-gray-600 text-xs">
                        Quick support & instant replies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
            <Footer />

    </div>
  );
};

export default ContactUsPage;