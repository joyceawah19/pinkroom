"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Range, getTrackBackground } from "react-range";
// import pinkroom from "/pinkroom1.jpeg";
import Image from "next/image";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaGem,
  FaCoffee,
  FaShieldAlt,
  FaSpa,
  FaHeart,
  FaBars,
  FaTimes,
  FaInstagram,
} from "react-icons/fa";

const MIN_BUDGET = 5000;
const MAX_BUDGET = 100000;

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  isMember: z.enum(["yes", "no"]),
  services: z.array(z.string()).min(1, "Please select at least one treatment"),
  budget: z.tuple([z.number(), z.number()]),
  date: z.string().min(1, "Please select a preferred date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  specialNotes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function PinkRoomLandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pillars = [
    {
      icon: FaLock,
      title: "Absolute Privacy",
      desc: "A strict women-only environment designed for complete relaxation, perfect for hijab-wearing and privacy-conscious clients.",
    },
    {
      icon: FaSpa,
      title: "Unmatched Comfort",
      desc: "Step out of Kigali’s hustle into a serene, plush sanctuary engineered for pure peace.",
    },
    {
      icon: FaHeart,
      title: "Exceptional Care",
      desc: "Our elite technicians prioritize your hygiene, health, and personalized beauty goals.",
    },
    {
      icon: FaGem,
      title: "Luxury Self-Care",
      desc: "Premium treatments paired with complimentary refreshments to elevate your standard routine.",
    },
  ];

  const serviceCategories = [
    {
      name: "Nails & Halal Options",
      options: [
        "Classic Manicure",
        "Gel Manicure",
        "Classic Pedicure",
        "Gel Pedicure",
        "Luxury Pedicure Treatment",
        "Halal Nail Polish Application",
      ],
    },
    {
      name: "Hair Removal (Wax & Threading)",
      options: [
        "Threading (Brows/Face/Neck)",
        "Underarm Waxing",
        "Leg Waxing",
        "Bikini Line Waxing",
        "Brazilian Waxing",
        "Sugar Wax Treatment",
      ],
    },
    {
      name: "Skin & Beauty",
      options: ["Premium Facial Treatment", "Henna Art Design"],
    },
  ];

  const timeSlots = [
    "09:00 AM - 12:00 PM (Morning Care)",
    "12:00 PM - 03:00 PM (Midday Rest)",
    "03:00 PM - 06:00 PM (Afternoon Glow)",
    "06:00 PM - 09:00 PM (Evening Relaxation)",
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      isMember: "no",
      services: [],
      budget: [25000, 60000],
      date: "",
      timeSlot: "",
      specialNotes: "",
    },
  });

  const selectedServices = watch("services") || [];
  const budgetRange = watch("budget") || [25000, 60000];
  const activeTimeSlot = watch("timeSlot");

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];
    setValue("services", updated, { shouldValidate: true });
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: BookingFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("The Pink Room Booking Confirmed:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FFF5F5] text-[#4A2828] font-sans antialiased min-h-screen selection:bg-[#FCE7F3] selection:text-[#9D174D]">
      {/* 1. Privacy Banner Guard */}
      <div className="bg-[#FCE7F3] text-[#9D174D] text-xs py-2.5 px-4 text-center font-semibold flex items-center justify-center gap-2 border-b border-[#FBCFE8] sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95">
        <FaShieldAlt size={13} className="animate-pulse" />
        Strictly Women-Only Sanctuary. Total Privacy for Hijab & Halal-Friendly
        Accommodations.
      </div>

      {/* Luxury Sticky Navbar (Positioned just below the privacy guard) */}
      <nav className="sticky top-[37px] z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#FBCFE8] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 h-20 flex items-center justify-between">
          {/* Logo Brand Title */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#9D174D] to-[#DB2777] flex items-center justify-center text-white shadow-xs">
              <FaSpa size={16} />
            </div>
            <span className="font-serif font-bold text-xl tracking-wide text-[#9D174D] group-hover:text-[#DB2777] transition-colors">
              The Pink Room
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B4F4F]">
            <button
              onClick={() => scrollToSection("experience")}
              className="hover:text-[#DB2777] transition-colors cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="hover:text-[#DB2777] transition-colors cursor-pointer"
            >
              Membership
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="hover:text-[#DB2777] transition-colors cursor-pointer"
            >
              Treatment Menu
            </button>

            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-[#DB2777] hover:bg-[#BE185D] text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-2 text-xs"
            >
              Book Session <FaArrowRight size={10} />
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#9D174D] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#FBCFE8] px-6 py-6 space-y-4 shadow-inner animate-fadeIn">
            <button
              onClick={() => scrollToSection("experience")}
              className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]"
            >
              Experience Pillars
            </button>
            <button
              onClick={() => scrollToSection("membership")}
              className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]"
            >
              The Membership
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]"
            >
              Treatment Menu
            </button>

            <button
              onClick={() => scrollToSection("booking-section")}
              className="w-full bg-[#DB2777] text-white font-bold py-3.5 rounded-xl text-center flex items-center justify-center gap-2"
            >
              Book Private Session <FaArrowRight size={12} />
            </button>
          </div>
        )}
      </nav>

      {/* 3. Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 lg:px-14 pt-12 pb-20 lg:pt-16 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden rounded-3xl my-4">
        {/* 1. Blurred Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[1px] scale-105 pointer-events-none z-0"
          style={{ backgroundImage: "url('/pinkroom1.jpeg')" }}
        />

        {/* 2. Soft Tint Overlay (Maintains perfect readability) */}
        <div className="absolute inset-0 bg-[#FFF5F5]/85 z-0 pointer-events-none" />

        {/* 3. LEFT COLUMN (Stacks on top on mobile, sits on the left on desktop) */}
        <div className="space-y-6 text-center lg:text-left z-10 relative">
          <span className="text-[#DB2777] text-xs font-bold uppercase tracking-[0.3em] bg-[#FCE7F3] px-3 py-1.5 rounded-full inline-block">
            Kigali's Premium Haven
          </span>

          <h1 className="text-[#9D174D] lg:text-[56px] md:text-[48px] text-[36px] font-serif font-bold tracking-tight leading-tight">
            A Private Women’s Sanctuary <br />
            <span className="text-[#DB2777] italic font-normal">
              for Pure Self-Care.
            </span>
          </h1>

          <p className="text-[#6B4F4F] text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            The Pink Room Kigali is an elegant, secluded sanctuary in Kibagabaga
            where professional women, mothers, and entrepreneurs escape to
            experience premium beauty rituals in absolute privacy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-[#DB2777] hover:bg-[#BE185D] text-white font-medium px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
            >
              Book Private Session
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:0793146005"
              className="border border-[#FBCFE8] bg-white hover:bg-[#FFF5F5] text-[#9D174D] font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <FaPhone size={14} /> Call 0793 146 005
            </a>
          </div>
        </div>

        {/* 4. RIGHT COLUMN (Stacks underneath on mobile, sits on the right on desktop) */}
        <div className="bg-white border border-[#FBCFE8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden z-10 w-full max-w-xl mx-auto lg:mx-0">
          {/* Soft ambient background glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FCE7F3] rounded-full filter blur-3xl opacity-70 pointer-events-none" />

          {/* Header Status & Socials Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FFF5F5] pb-4">
            <div className="text-xs font-bold uppercase text-[#DB2777] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777] animate-pulse" />
              <FaClock /> Now Booking
            </div>

            <a
              href="https://instagram.com/thepinkroomkigali"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#6B4F4F] hover:text-[#DB2777] flex items-center gap-1.5 bg-[#FFF5F5] hover:bg-[#FCE7F3] px-3 py-1 rounded-full border border-[#FBCFE8]/40 transition-all group"
            >
              <FaInstagram className="text-[#DB2777] group-hover:scale-110 transition-transform" />
              @thepinkroomkigali
            </a>
          </div>

          {/* Captivating Minimalist Quote */}
          <blockquote className="text-[#4A2828] font-serif italic text-lg leading-relaxed border-l-4 border-[#DB2777] pl-4">
            "Beauty, relaxation, and self-care come together in an elegant and
            welcoming environment."
          </blockquote>

          {/* Clean, Uncluttered Detail Rows */}

          <div className="space-y-3.5 pt-2 text-sm text-[#6B4F4F]">
            <div className="flex items-center gap-3 font-medium">
              <span className="text-[#DB2777] text-xs">✦</span>
              <p>
                Mon – Sat:{" "}
                <span className="text-[#4A2828]">9:00 AM – 9:00 PM</span>
              </p>
            </div>
            <div className="flex items-start gap-3 font-medium">
              <span className="text-[#DB2777] text-xs mt-0.5">✦</span>
              <p>
                Opposite St. Ignace Primary School,{" "}
                <span className="text-[#4A2828]">Kibagabaga</span>
              </p>
            </div>
              <div className="flex items-start gap-3 font-medium">
              <span className="text-[#DB2777] text-xs mt-0.5">
                              <FaInstagram className="text-[#DB2777] group-hover:scale-110 transition-transform" />
 </span>
              <p>
                <span className="text-[#4A2828]"> @thepinkroomkigali</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Premium Image Grid Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image
            src="/manicure.jpg"
            alt="Premium Manicure Care"
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">
              Manicures & Polish
            </span>
          </div>
        </div>

        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image
            src="/pedicure.jpeg"
            alt="Luxury Pedicure Rituals"
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">
              Luxury Pedicures
            </span>
          </div>
        </div>

        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image
            src="/facial.jpg"
            alt="Premium Facial and Skin Treatment"
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">
              Facials & Esthetics
            </span>
          </div>
        </div>
      </section>

      {/* 4. Core Pillars Matrix */}
      <section
        id="experience"
        className="bg-white border-y border-[#FBCFE8] py-20 px-6 lg:px-14 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#9D174D]">
              Our Core Experience Pillars
            </h2>
            <p className="text-[#6B4F4F] text-sm">
              Every treatment is centered around luxury comfort designed
              entirely for women.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FFF5F5] rounded-xl border border-[#FBCFE8] space-y-4 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-white text-[#DB2777] flex items-center justify-center shadow-xs">
                  <p.icon size={20} />
                </div>
                <div className="text-lg font-serif font-bold text-[#9D174D]">
                  {p.title}
                </div>
                <p className="text-sm text-[#6B4F4F] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Luxury Membership Banner */}
      <section
        id="membership"
        className="max-w-7xl mx-auto px-6 lg:px-14 py-16 scroll-mt-28"
      >
        <div className="bg-gradient-to-br from-[#9D174D] to-[#DB2777] text-white p-8 md:p-12 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-2 space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#FFFFFF20] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <FaGem size={12} /> Elite Privileges
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold">
              The Pink Membership
            </h2>
            <p className="text-[#FCE7F3] text-sm md:text-base max-w-xl">
              Unlock a premium lifestyle of consistent alignment and self-care.
              Offers include recurring luxury benefits, absolute priority
              booking, custom refreshment trays, and members-only relaxation
              lounge entry.
            </p>
          </div>
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-white text-[#9D174D] font-bold px-8 py-4 rounded-xl hover:bg-[#FFF5F5] transition-all shadow-md w-full sm:w-auto whitespace-nowrap cursor-pointer"
            >
              Inquire About Membership
            </button>
          </div>
        </div>
      </section>

      {/* 6. Combined Interactive Booking & Services Section */}
      <main
        id="booking-section"
        className="max-w-7xl mx-auto lg:px-14 px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-28"
      >
        {/* Left Side: Services Presentation List (5 Columns) */}
        <div id="menu" className="lg:col-span-5 space-y-8 scroll-mt-28">
          <div className="bg-white border border-[#FBCFE8] p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#9D174D]">
                The Treatment Menu
              </h2>
              <p className="text-xs text-[#6B4F4F] mt-1">
                Tap services on the right form block to build your custom
                reservation box.
              </p>
            </div>

            <div className="space-y-6">
              {serviceCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#9D174D] border-b border-[#FFF5F5] pb-1">
                    {category.name}
                  </div>
                  <ul className="space-y-2">
                    {category.options.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[#6B4F4F] flex items-center gap-2"
                      >
                        <span className="text-[#DB2777] text-xs">✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="pt-4 border-t border-[#FFF5F5] flex items-center gap-3 text-xs text-[#6B4F4F] bg-[#FFF5F5]/60 p-3 rounded-xl">
                <FaCoffee className="text-[#DB2777] shrink-0" size={16} />
                <span>
                  All appointments include tailored aromatic tea blends, freshly
                  filtered espresso coffee, and premium biscuit trays.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Dynamic Form Console (7 Columns) */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-white border border-[#FBCFE8] rounded-2xl p-10 text-center flex flex-col items-center gap-6 shadow-md min-h-[500px] justify-center">
              <FaCheckCircle
                size={64}
                className="text-[#EC4899] animate-pulse"
              />
              <h2 className="text-[#9D174D] text-3xl font-serif font-bold">
                Your Spot Is Blocked!
              </h2>
              <p className="text-[#6B4F4F] max-w-md">
                Thank you,{" "}
                <span className="font-semibold text-black">
                  {watch("fullName")}
                </span>
                . We have secured your appointment window. Your private
                relaxation room configuration has been passed down to our floor
                stewards.
              </p>
              <div className="text-sm text-gray-500 bg-[#FFF5F5] p-4 rounded-xl border border-[#FBCFE8]">
                We are validating availability and will call you on{" "}
                <span className="text-[#DB2777] font-bold">
                  {watch("phone")}
                </span>{" "}
                within the hour.
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#DB2777] text-white hover:bg-[#BE185D] font-medium px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 bg-white border border-[#FBCFE8] p-6 sm:p-10 rounded-2xl shadow-sm"
            >
              {/* Form Block 1 */}
              <div className="space-y-6">
                <h3 className="text-lg font-serif font-bold text-[#9D174D] flex items-center gap-2 border-b border-[#FFF5F5] pb-2">
                  <span className="text-xs bg-[#DB2777] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Your name"
                      className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="e.g., 0793 146 005"
                      className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="email@example.com"
                      className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">
                      Are you a Pink Member? *
                    </label>
                    <div className="flex gap-4 py-2">
                      <label className="flex items-center gap-2 text-xs text-[#6B4F4F] cursor-pointer">
                        <input
                          type="radio"
                          value="no"
                          {...register("isMember")}
                          className="accent-[#DB2777]"
                        />{" "}
                        General Guest
                      </label>
                      <label className="flex items-center gap-2 text-xs text-[#4A2828] font-bold cursor-pointer">
                        <input
                          type="radio"
                          value="yes"
                          {...register("isMember")}
                          className="accent-[#DB2777]"
                        />{" "}
                        Pink Member
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Block 2 */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#9D174D] flex items-center gap-2 border-b border-[#FFF5F5] pb-2">
                  <span className="text-xs bg-[#DB2777] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                  Select Active Treatments *
                </h3>

                <div className="space-y-4">
                  {serviceCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <span className="text-[11px] font-bold text-[#9D174D] tracking-wide block">
                        {category.name}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.options.map((option) => {
                          const isChecked = selectedServices.includes(option);
                          return (
                            <div
                              key={option}
                              onClick={() => handleServiceToggle(option)}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer select-none transition-all duration-150 ${
                                isChecked
                                  ? "border-[#DB2777] bg-[#FFF5F5] text-[#9D174D] font-semibold"
                                  : "border-[#FBCFE8] bg-white text-[#6B4F4F] hover:border-[#F472B6]"
                              }`}
                            >
                              <span>{option}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                                  isChecked
                                    ? "bg-[#DB2777] border-[#DB2777]"
                                    : "border-[#FBCFE8]"
                                }`}
                              >
                                {isChecked && (
                                  <span className="text-white text-[8px]">
                                    ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.services && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.services.message}
                  </p>
                )}
              </div>

              {/* Form Block 3: Expenditure Dynamic Bar */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#9D174D] flex items-center gap-2 border-b border-[#FFF5F5] pb-2">
                  <span className="text-xs bg-[#DB2777] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                  Budget Target Window (RWF)
                </h3>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B4F4F]">
                    Expected treatment cost spectrum:
                  </span>
                  <span className="font-bold font-mono text-[#DB2777] bg-[#FFF5F5] px-2 py-1 rounded">
                    {budgetRange[0].toLocaleString()} -{" "}
                    {budgetRange[1].toLocaleString()} RWF
                  </span>
                </div>

                <div className="py-4 px-1">
                  <Range
                    step={2500}
                    min={MIN_BUDGET}
                    max={MAX_BUDGET}
                    values={budgetRange}
                    onChange={(values) =>
                      setValue("budget", values as [number, number], {
                        shouldValidate: true,
                      })
                    }
                    renderTrack={({ props, children }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div
                          key={key}
                          {...restProps}
                          className="h-1.5 w-full rounded-full relative"
                          style={{
                            ...restProps.style,
                            background: getTrackBackground({
                              values: budgetRange,
                              colors: ["#E5E7EB", "#DB2777", "#E5E7EB"],
                              min: MIN_BUDGET,
                              max: MAX_BUDGET,
                            }),
                          }}
                        >
                          {children}
                        </div>
                      );
                    }}
                    renderThumb={({ props }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div
                          key={key}
                          {...restProps}
                          className="w-4 h-4 rounded-full bg-[#9D174D] border-2 border-white outline-none cursor-pointer shadow-md active:scale-110 transition-transform"
                          style={{ ...restProps.style }}
                        />
                      );
                    }}
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono">
                    <span>{MIN_BUDGET.toLocaleString()} RWF</span>
                    <span>{MAX_BUDGET.toLocaleString()}+ RWF</span>
                  </div>
                </div>
              </div>

              {/* Form Block 4 */}
              <div className="space-y-6">
                <h3 className="text-lg font-serif font-bold text-[#9D174D] flex items-center gap-2 border-b border-[#FFF5F5] pb-2">
                  <span className="text-xs bg-[#DB2777] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    4
                  </span>
                  Timing Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-2">
                      <FaCalendarAlt className="text-[#DB2777]" /> Date Choice *
                    </label>
                    <input
                      {...register("date")}
                      type="date"
                      className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm color-scheme-light"
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-2">
                      <FaClock className="text-[#DB2777]" /> Booking Blocks *
                    </label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {timeSlots.map((slot) => {
                        const isSelected = activeTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() =>
                              setValue("timeSlot", slot, {
                                shouldValidate: true,
                              })
                            }
                            className={`text-left p-2 rounded-xl text-xs border transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#DB2777] bg-[#FFF5F5] text-[#9D174D] font-bold shadow-xs"
                                : "border-[#FBCFE8] bg-white text-[#6B4F4F] hover:border-[#F472B6]"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {errors.timeSlot && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.timeSlot.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Block 5 */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-serif font-bold text-[#9D174D]">
                  5. Privacy or Special Customizations
                </h3>
                <textarea
                  rows={3}
                  {...register("specialNotes")}
                  placeholder="Need absolute curtain down protection? Prefer Halal setup specifics? Let us know here..."
                  className="border border-[#FBCFE8] bg-white rounded-xl p-4 outline-none focus:border-[#DB2777] text-[#4A2828] text-xs transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#DB2777] text-white font-bold py-4 rounded-xl hover:bg-[#BE185D] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm cursor-pointer"
              >
                {isSubmitting
                  ? "Securing Your Secluded Space..."
                  : "Request Sanctuary Space"}
                <FaArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={12}
                />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* 7. Elegant Footer */}
      <footer className="border-t border-[#FBCFE8] bg-white py-8 text-center text-xs text-[#6B4F4F]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            © 2026 The Pink Room Kigali. All Rights Reserved to Luxury Women's
            Self-Care.
          </p>
          <p>Opposite St. Ignace Primary School, Kibagabaga, Kigali</p>
        </div>
      </footer>
    </div>
  );
}
