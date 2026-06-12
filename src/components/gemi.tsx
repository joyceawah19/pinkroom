"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Range, getTrackBackground } from "react-range";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaGem,
} from "react-icons/fa";

// Budget constraints based on luxury treatments (in RWF or USD - customizable)
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

export default function PinkRoomBookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceCategories = [
    {
      name: "Nails & Halal Options",
      options: ["Classic Manicure", "Gel Manicure", "Classic Pedicure", "Gel Pedicure", "Luxury Pedicure Treatment", "Halal Nail Polish Application"],
    },
    {
      name: "Hair Removal (Wax & Threading)",
      options: ["Threading (Brows/Face/Neck)", "Underarm Waxing", "Leg Waxing", "Bikini Line Waxing", "Brazilian Waxing", "Sugar Wax Treatment"],
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
  const membershipStatus = watch("isMember");

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service];

    setValue("services", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: BookingFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("The Pink Room Booking Confirmed:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen bg-[#FFF5F5] text-[#4A2828] flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-white border border-[#FBCFE8] rounded-2xl p-10 max-w-xl flex flex-col items-center gap-6 shadow-xl">
          <FaCheckCircle size={64} className="text-[#EC4899]" />
          <h2 className="text-[#DB2777] text-3xl font-serif font-bold tracking-wide">Your Sanctuary Awaits</h2>
          <p className="text-[#6B4F4F]">
            Thank you, <span className="font-semibold">{watch("fullName")}</span>. Your reservation request at The Pink Room Kigali has been received. A complimentary beverage (Tea, Coffee & Biscuits) will be prepared for you.
          </p>
          <p className="text-sm text-gray-500">
            We will contact you shortly on <span className="text-[#DB2777] font-semibold">{watch("phone")}</span> to finalize your secure space.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 bg-[#DB2777] text-white hover:bg-[#BE185D] font-medium px-6 py-3 rounded-lg transition-all shadow-md"
          >
            Book Another Treatment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFF5F5] text-[#4A2828] font-sans antialiased min-h-screen">
      {/* Privacy Guard Notice */}
      <div className="bg-[#FCE7F3] text-[#9D174D] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#FBCFE8]">
        <FaLock size={12} /> Purely Women-Only Sanctuary. Absolute Privacy for Hijab & Halal-Friendly Accommodations Guaranteed.
      </div>

      {/* Elegant Header Banner */}
      <div className="flex flex-col justify-center items-center text-center px-4 py-20 lg:py-28 bg-gradient-to-b from-[#FCE7F3] to-[#FFF5F5]">
        <span className="text-[#DB2777] text-xs uppercase tracking-[0.25em] font-bold mb-2">A Luxury Self-Care Experience</span>
        <h1 className="text-[#9D174D] lg:text-[52px] text-[32px] font-serif font-bold tracking-wide mb-4">
          Reserve Your Sanctuary Space
        </h1>
        <p className="text-[#6B4F4F] lg:w-[50%] w-[90%] text-base sm:text-lg italic">
          “Where beauty, relaxation, and self-care come together in an elegant, private environment.”
        </p>
      </div>

      <div className="max-w-7xl mx-auto lg:px-14 px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Boutique Info Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="bg-white border border-[#FBCFE8] p-8 rounded-2xl shadow-sm sticky top-6">
            <h3 className="text-xl font-serif font-bold text-[#9D174D] mb-4 pb-2 border-b border-[#F3E8FF]">
              The Pink Room Kigali
            </h3>

            <div className="flex flex-col gap-5 mt-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-[#FFF5F5]">
                <FaMapMarkerAlt className="text-[#DB2777] mt-1 shrink-0" size={16} />
                <span className="text-sm text-[#6B4F4F]">
                  Opposite St. Ignace Primary School, Kibagabaga, Kigali
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#FFF5F5]">
                <FaPhone className="text-[#DB2777] shrink-0" size={16} />
                <a href="tel:0793146005" className="text-sm text-[#6B4F4F] font-semibold hover:text-[#DB2777]">
                  0793 146 005
                </a>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#FFF5F5]">
                <FaClock className="text-[#DB2777] shrink-0" size={16} />
                <span className="text-sm text-[#6B4F4F]">
                  Mon – Sat: 9:00 AM – 9:00 PM
                </span>
              </div>
            </div>

            {/* Pink Membership Mini-Banner */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-[#FCE7F3] to-[#F472B6]/20 border border-[#FBCFE8]">
              <h4 className="text-sm font-bold text-[#9D174D] flex items-center gap-2">
                <FaGem className="text-[#DB2777]" /> The Pink Membership
              </h4>
              <p className="text-xs text-[#6B4F4F] mt-2 leading-relaxed">
                Enjoy recurring premium self-care benefits, absolute priority booking slots, and exclusive member lounge privileges.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Appointment Customizer Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-[#FBCFE8] p-6 sm:p-10 rounded-2xl shadow-sm">
            
            {/* Section 1: Guest Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-serif font-bold text-[#9D174D] border-b border-[#FFF5F5] pb-2">
                1. Guest Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">Full Name *</label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Enter full name"
                    className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">Phone Number *</label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="e.g. 0793 146 005"
                    className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">Email Address *</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="name@example.com"
                    className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">Are you a Pink Member? *</label>
                  <div className="flex gap-4 py-2">
                    <label className="flex items-center gap-2 text-sm text-[#6B4F4F] cursor-pointer">
                      <input type="radio" value="no" {...register("isMember")} className="accent-[#DB2777]" /> No, not yet
                    </label>
                    <label className="flex items-center gap-2 text-sm text-[#4A2828] font-medium cursor-pointer">
                      <input type="radio" value="yes" {...register("isMember")} className="accent-[#DB2777]" /> Yes, Premium Member
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Premium Treatment Selections */}
            <div className="space-y-6">
              <h2 className="text-lg font-serif font-bold text-[#9D174D] border-b border-[#FFF5F5] pb-2">
                2. Select Treatments *
              </h2>
              
              {serviceCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#9D174D] bg-[#FFF5F5] py-1 px-2 rounded w-fit">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.options.map((option) => {
                      const isChecked = selectedServices.includes(option);
                      return (
                        <div
                          key={option}
                          onClick={() => handleServiceToggle(option)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer select-none transition-all duration-150 ${
                            isChecked 
                              ? "border-[#DB2777] bg-[#FFF5F5] text-[#9D174D] font-medium shadow-sm" 
                              : "border-[#FBCFE8] bg-white text-[#6B4F4F] hover:border-[#F472B6]"
                          }`}
                        >
                          <span className="text-sm">{option}</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isChecked ? "bg-[#DB2777] border-[#DB2777]" : "border-[#FBCFE8]"
                          }`}>
                            {isChecked && <span className="text-white text-[9px] font-bold">✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services.message}</p>}
            </div>

            {/* Section 3: Luxury Custom Budget Range */}
            <div className="space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#9D174D] border-b border-[#FFF5F5] pb-2">
                3. Estimated Expenditure Window (RWF)
              </h2>
              <div className="flex justify-between items-baseline">
                <p className="text-xs text-[#6B4F4F]">Slide to match your package expectations.</p>
                <span className="text-base font-bold font-mono text-[#DB2777]">
                  {budgetRange[0].toLocaleString()} RWF - {budgetRange[1].toLocaleString()} RWF
                </span>
              </div>

              <div className="py-6 px-2">
                <Range
                  step={2500}
                  min={MIN_BUDGET}
                  max={MAX_BUDGET}
                  values={budgetRange}
                  onChange={(values) => setValue("budget", values as [number, number], { shouldValidate: true })}
                  renderTrack={({ props, children }) => {
                    const { key, ...restProps } = props;
                    return (
                      <div
                        key={key}
                        {...restProps}
                        className="h-2 w-full rounded-full relative"
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
                        className="w-5 h-5 rounded-full bg-[#9D174D] border-2 border-white outline-none cursor-pointer shadow-md active:scale-110 transition-transform"
                        style={{ ...restProps.style }}
                      />
                    );
                  }}
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
                  <span>{MIN_BUDGET.toLocaleString()} RWF</span>
                  <span>{MAX_BUDGET.toLocaleString()}+ RWF</span>
                </div>
              </div>
            </div>

            {/* Section 4: Schedule Parameters */}
            <div className="space-y-6">
              <h2 className="text-lg font-serif font-bold text-[#9D174D] border-b border-[#FFF5F5] pb-2">
                4. Schedule Appointment
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-2">
                    <FaCalendarAlt className="text-[#DB2777]" /> Preferred Date *
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors"
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                {/* Time Selection Slots */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-2">
                    <FaClock className="text-[#DB2777]" /> Preferred Time Window *
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = activeTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setValue("timeSlot", slot, { shouldValidate: true })}
                          className={`text-left p-2.5 rounded-xl text-xs border transition-all ${
                            isSelected
                              ? "border-[#DB2777] bg-[#FFF5F5] text-[#9D174D] font-medium"
                              : "border-[#FBCFE8] bg-white text-[#6B4F4F] hover:border-[#F472B6]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-serif font-bold text-[#9D174D] mb-1">
                5. Special Accommodations or Notes
              </h2>
              <textarea
                rows={3}
                {...register("specialNotes")}
                placeholder="Let us know if you require absolute room isolation, specific Halal nail configurations, or organic wax alternatives..."
                className="border border-[#FBCFE8] bg-white rounded-xl p-4 outline-none focus:border-[#DB2777] text-[#4A2828] text-sm transition-colors resize-none"
              />
            </div>

            {/* Premium Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#DB2777] text-white font-medium py-4 rounded-xl hover:bg-[#BE185D] transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-sm"
            >
              {isSubmitting ? "Securing Your Luxury Space..." : "Request Sanctuary Reservation"}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}