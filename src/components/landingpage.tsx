"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TreatmentMenu from "./pricescard";
import Image from "next/image";
import BookingForm, { bookingSchema, BookingFormData } from "./form";
import {
  FaPhone,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaGem,
  FaShieldAlt,
  FaSpa,
  FaHeart,
  FaBars,
  FaTimes,
  FaInstagram,
} from "react-icons/fa";

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

  // 1. Initialize the react-hook-form pipeline
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

  // 2. THIS IS EXACTLY WHERE YOUR ON-SUBMIT FUNCTION GOES!
  const onSubmit = async (data: BookingFormData) => {
    try {
      // Send the data packet directly to your hidden internal route handler
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName, // matches destructured variables in route.ts
          email: data.email,
          phone: data.phone,
          date: data.date,
          services: data.services,
          budget: `${data.budget[0].toLocaleString()} - ${data.budget[1].toLocaleString()} RWF`,
          isMember: data.isMember,
        }),
      });

      if (response.ok) {
        console.log("Nodemailer Email sent out successfully!");
        setIsSubmitted(true); // Switches UI window view to a success state
      } else {
        const errorResponse = await response.json();
        alert(`Submission error: ${errorResponse.error || "Failed to process form."}`);
      }
    } catch (error) {
      console.error("Network interface connection failure:", error);
      alert("A network disconnect disrupted processing. Please verify network connection.");
    }
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // const onSubmit = async (data: BookingFormData) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1200));
  //   console.log("The Pink Room Booking Confirmed:", data);
  //   setIsSubmitted(true);
  // };

  return (
    <div className="w-full bg-[#FFF5F5] text-[#4A2828] font-sans antialiased min-h-screen selection:bg-[#FCE7F3] selection:text-[#9D174D]">
      {/* 1. Privacy Banner Guard */}
      <div className="bg-[#FCE7F3] text-[#9D174D] text-xs py-2.5 px-4 text-center font-semibold flex items-center justify-center gap-2 border-b border-[#FBCFE8] sticky top-0 z-50 shadow-sm backdrop-blur-md bg-opacity-95">
        <FaShieldAlt size={13} className="animate-pulse" />
        Strictly Women-Only Sanctuary. Total Privacy for Hijab & Halal-Friendly Accommodations.
      </div>

      {/* Luxury Sticky Navbar */}
      <nav className="sticky top-[37px] z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#FBCFE8] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 h-20 flex items-center justify-between">
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

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B4F4F]">
            <button onClick={() => scrollToSection("experience")} className="hover:text-[#DB2777] transition-colors cursor-pointer">
              Experience
            </button>
            <button onClick={() => scrollToSection("membership")} className="hover:text-[#DB2777] transition-colors cursor-pointer">
              Membership
            </button>
            <button onClick={() => scrollToSection("menu")} className="hover:text-[#DB2777] transition-colors cursor-pointer">
              Treatment Menu
            </button>
            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-[#DB2777] hover:bg-[#BE185D] text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-md flex items-center gap-2 text-xs"
            >
              Book Session <FaArrowRight size={10} />
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#9D174D] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#FBCFE8] px-6 py-6 space-y-4 shadow-inner animate-fadeIn">
            <button onClick={() => scrollToSection("experience")} className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]">
              Experience Pillars
            </button>
            <button onClick={() => scrollToSection("membership")} className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]">
              The Membership
            </button>
            <button onClick={() => scrollToSection("menu")} className="block w-full text-left font-medium text-[#6B4F4F] py-2 border-b border-[#FFF5F5]">
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

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 lg:px-14 pt-12 pb-20 lg:pt-16 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden rounded-3xl my-4">
        <div className="absolute inset-0 bg-cover bg-center filter blur-[1px] scale-105 pointer-events-none z-0" style={{ backgroundImage: "url('/pinkroom1.jpeg')" }} />
        <div className="absolute inset-0 bg-[#FFF5F5]/85 z-0 pointer-events-none" />

        <div className="space-y-6 text-center lg:text-left z-10 relative">
          <span className="text-[#DB2777] text-xs font-bold uppercase tracking-[0.3em] bg-[#FCE7F3] px-3 py-1.5 rounded-full inline-block">
            Kigali's Premium Haven
          </span>
          <h1 className="text-[#9D174D] lg:text-[56px] md:text-[48px] text-[36px] font-serif font-bold tracking-tight leading-tight">
            A Private Women’s Sanctuary <br />
            <span className="text-[#DB2777] italic font-normal">for Pure Self-Care.</span>
          </h1>
          <p className="text-[#6B4F4F] text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            The Pink Room Kigali is an elegant, secluded sanctuary in Kibagabaga where professional women, mothers, and entrepreneurs escape to experience premium beauty rituals in absolute privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-[#DB2777] hover:bg-[#BE185D] text-white font-medium px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
            >
              Book Private Session <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="tel:0793146005" className="border border-[#FBCFE8] bg-white hover:bg-[#FFF5F5] text-[#9D174D] font-medium px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
              <FaPhone size={14} /> Call 0793 146 005
            </a>
          </div>
        </div>

        <div className="bg-white border border-[#FBCFE8] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden z-10 w-full max-w-xl mx-auto lg:mx-0">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FCE7F3] rounded-full filter blur-3xl opacity-70 pointer-events-none" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#FFF5F5] pb-4">
            <div className="text-xs font-bold uppercase text-[#DB2777] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DB2777] animate-pulse" />
              <FaClock /> Now Booking
            </div>
            <a href="https://instagram.com/thepinkroomkigali" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#6B4F4F] hover:text-[#DB2777] flex items-center gap-1.5 bg-[#FFF5F5] hover:bg-[#FCE7F3] px-3 py-1 rounded-full border border-[#FBCFE8]/40 transition-all group">
              <FaInstagram className="text-[#DB2777] group-hover:scale-110 transition-transform" /> @thepinkroomkigali
            </a>
          </div>
          <blockquote className="text-[#4A2828] font-serif italic text-lg leading-relaxed border-l-4 border-[#DB2777] pl-4">
            "Beauty, relaxation, and self-care come together in an elegant and welcoming environment."
          </blockquote>
          <div className="space-y-3.5 pt-2 text-sm text-[#6B4F4F]">
            <div className="flex items-center gap-3 font-medium">
              <span className="text-[#DB2777] text-xs">✦</span>
              <p>Mon – Sat: <span className="text-[#DB2777] font-semibold">9:00 AM – 9:00 PM</span></p>
            </div>
            <div className="flex items-start gap-3 font-medium">
              <span className="text-[#DB2777] text-xs mt-0.5">✦</span>
              <p>Opposite St. Ignace Primary School, <span className="text-[#DB2777] font-semibold">Kibagabaga</span></p>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Image Grid Showcase */}
      <section className="max-w-7xl mx-auto px-6 lg:px-14 pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image src="/manicure.jpg" alt="Premium Manicure Care" fill priority className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">Manicures & Polish</span>
          </div>
        </div>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image src="/pedicure.jpeg" alt="Luxury Pedicure Rituals" fill priority className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">Luxury Pedicures</span>
          </div>
        </div>
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-[#FBCFE8] group">
          <Image src="/facial.jpg" alt="Premium Facial and Skin Treatment" fill priority className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <span className="text-white text-xs uppercase tracking-widest font-semibold bg-[#DB2777]/80 px-2.5 py-1 rounded-md backdrop-blur-xs">Facials & Esthetics</span>
          </div>
        </div>
      </section>

      {/* Core Pillars Matrix */}
      <section id="experience" className="bg-white border-y border-[#FBCFE8] py-20 px-6 lg:px-14 scroll-mt-28">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#9D174D]">Our Core Experience Pillars</h2>
            <p className="text-[#6B4F4F] text-sm">Every treatment is centered around luxury comfort designed entirely for women.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => (
              <div key={idx} className="p-6 bg-[#FFF5F5] rounded-xl border border-[#FBCFE8] space-y-4 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-white text-[#DB2777] flex items-center justify-center shadow-xs">
                  <p.icon size={20} />
                </div>
                <div className="text-lg font-serif font-bold text-[#9D174D]">{p.title}</div>
                <p className="text-sm text-[#6B4F4F] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Membership Banner */}
      <section id="membership" className="max-w-7xl mx-auto px-6 lg:px-14 py-16 scroll-mt-28">
        <div className="bg-gradient-to-br from-[#9D174D] to-[#DB2777] text-white p-8 md:p-12 rounded-3xl shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-2 space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#FFFFFF20] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <FaGem size={12} /> Elite Privileges
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold">The Pink Membership</h2>
            <p className="text-[#FCE7F3] text-sm md:text-base max-w-xl">
              Unlock a premium lifestyle of consistent alignment and self-care. Offers include recurring luxury benefits, absolute priority booking, custom refreshment trays, and members-only relaxation lounge entry.
            </p>
          </div>
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <button onClick={() => scrollToSection("booking-section")} className="bg-white text-[#9D174D] font-bold px-8 py-4 rounded-xl hover:bg-[#FFF5F5] transition-all shadow-md w-full sm:w-auto whitespace-nowrap cursor-pointer">
              Inquire About Membership
            </button>
          </div>
        </div>
      </section>

      {/* Booking Form Interface Area */}
      <main id="booking-section" className="max-w-7xl mx-auto lg:px-14 px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-28">
        <TreatmentMenu />

        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-white border border-[#FBCFE8] rounded-2xl p-10 text-center flex flex-col items-center gap-6 shadow-md min-h-[500px] justify-center">
              <FaCheckCircle size={64} className="text-[#EC4899] animate-pulse" />
              <h2 className="text-[#9D174D] text-3xl font-serif font-bold">Your Spot Is Blocked!</h2>
              <p className="text-[#6B4F4F] max-w-md">
                Thank you, <span className="font-semibold text-black">{watch("fullName")}</span>. We have secured your appointment window. Your private relaxation room configuration has been passed down to our floor stewards.
              </p>
              <div className="text-sm text-gray-500 bg-[#FFF5F5] p-4 rounded-xl border border-[#FBCFE8]">
                We are validating availability and will call you on <span className="text-[#DB2777] font-bold">{watch("phone")}</span> within the hour.
              </div>
              <button onClick={() => setIsSubmitted(false)} className="bg-[#DB2777] text-white hover:bg-[#BE185D] font-medium px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer">
                Book Another Appointment
              </button>
            </div>
          ) : (
            <BookingForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              watch={watch}
              setValue={setValue}
            />
          )}
        </div>
      </main>
    </div>
  );
}