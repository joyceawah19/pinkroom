
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Range, getTrackBackground } from "react-range";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

const MIN_BUDGET = 5000;
const MAX_BUDGET = 100000;

export const bookingSchema = z.object({
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

export type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => Promise<void>;
  register: any;
  handleSubmit: any;
  errors: any;
  isSubmitting: boolean;
  watch: any;
  setValue: any;
}

export default function BookingForm({
  onSubmit,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  watch,
  setValue,
}: BookingFormProps) {
  
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

  const selectedServices = watch("services") || [];
  const budgetRange = watch("budget") || [25000, 60000];
  const activeTimeSlot = watch("timeSlot");

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((item: string) => item !== service)
      : [...selectedServices, service];
    setValue("services", updated, { shouldValidate: true });
  };

  return (
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
                          <span className="text-white text-[8px]">✓</span>
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
            } }
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
          Scheduling & Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-1">
              <FaCalendarAlt size={11} /> Preferred Date *
            </label>
            <input
              {...register("date")}
              type="date"
              className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.date.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider flex items-center gap-1">
              <FaClock size={11} /> Preferred Time Window *
            </label>
            <select
              {...register("timeSlot")}
              className="border-b border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] text-[#4A2828] py-2 transition-colors text-sm cursor-pointer"
            >
              <option value="" disabled>Select a window</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.timeSlot && (
              <p className="text-red-500 text-xs mt-1">
                {errors.timeSlot.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#6B4F4F] uppercase tracking-wider">
            Special Privacy Setup or Notes (Optional)
          </label>
          <textarea
            {...register("specialNotes")}
            rows={3}
            placeholder="e.g., Curtain configurations, specific room temp, or skin allergies..."
            className="border border-[#FBCFE8] bg-transparent outline-none focus:border-[#DB2777] rounded-xl p-3 text-[#4A2828] text-sm resize-none focus:ring-1 focus:ring-[#DB2777]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#DB2777] hover:bg-[#BE185D] disabled:bg-[#FBCFE8] text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Secure My Private Session"
        )}
      </button>
    </form>
  );
}