"use client";
/** @jsxImportSource react */

import React from "react";
import { useForm } from "react-hook-form";

type BookingFormData = {
  fullName: string;
  phone: string;
  email?: string;
  services: string[];
  date: string;
  time: string;
  membership: string;
  notes?: string;
  consent: boolean;
};

const services = [
  "Classic Manicure",
  "Gel Manicure",
  "Classic Pedicure",
  "Gel Pedicure",
  "Luxury Pedicure",
  "Facial",
  "Henna",
  "Threading",
  "Waxing",
];

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    console.log(data);

    // Example API Call
    // await fetch("/api/booking", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    alert("Appointment Request Sent!");
  };

  return (
    <section className="bg-[#FFF7FB] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-pink-700">
            Book Your Appointment
          </h2>

          <p className="text-gray-600 mt-4">
            Reserve your self-care experience at The Pink Room Kigali.
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Monday – Saturday | 9:00 AM – 9:00 PM
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label className="font-medium">
              Full Name
            </label>

            <input
              {...register("fullName", {
                required: "Name is required",
              })}
              className="w-full mt-2 border rounded-xl p-4"
              placeholder="Enter your name"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Phone Number
            </label>

            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="w-full mt-2 border rounded-xl p-4"
              placeholder="0793 146 005"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Email Address (Optional)
            </label>

            <input
              type="email"
              {...register("email")}
              className="w-full mt-2 border rounded-xl p-4"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="font-medium block mb-3">
              Select Services
            </label>

            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <label
                  key={service}
                  className="flex items-center gap-2 bg-pink-50 p-3 rounded-xl"
                >
                  <input
                    type="checkbox"
                    value={service}
                    {...register("services", {
                      required:
                        "Select at least one service",
                    })}
                  />

                  {service}
                </label>
              ))}
            </div>

            {errors.services && (
              <p className="text-red-500 text-sm mt-2">
                Select at least one service
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">
                Preferred Date
              </label>

              <input
                type="date"
                {...register("date", {
                  required: true,
                })}
                className="w-full mt-2 border rounded-xl p-4"
              />
            </div>

            <div>
              <label className="font-medium">
                Preferred Time
              </label>

              <select
                {...register("time", {
                  required: true,
                })}
                className="w-full mt-2 border rounded-xl p-4"
              >
                <option value="">
                  Select Time
                </option>

                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>01:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
                <option>05:00 PM</option>
                <option>06:00 PM</option>
                <option>07:00 PM</option>
                <option>08:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium block mb-3">
              Membership Status
            </label>

            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  value="Existing Member"
                  {...register("membership")}
                />{" "}
                Existing Member
              </label>

              <label className="block">
                <input
                  type="radio"
                  value="Interested in Membership"
                  {...register("membership")}
                />{" "}
                Interested in Membership
              </label>

              <label className="block">
                <input
                  type="radio"
                  value="Not Yet"
                  {...register("membership")}
                />{" "}
                Not Yet
              </label>
            </div>
          </div>

          <div>
            <label className="font-medium">
              Special Requests
            </label>

            <textarea
              rows={4}
              {...register("notes")}
              className="w-full mt-2 border rounded-xl p-4"
              placeholder="Tell us anything that will help us prepare..."
            />
          </div>

          <label className="flex gap-3 items-start">
            <input
              type="checkbox"
              {...register("consent", {
                required: true,
              })}
            />

            <span>
              I agree to be contacted regarding my
              appointment request.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition"
          >
            {isSubmitting
              ? "Submitting..."
              : "Book My Appointment"}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-600">
          <p>📍 Opposite St. Ignace Primary School</p>
          <p>Kibagabaga, Kigali</p>

          <a
            href="tel:+250793146005"
            className="text-pink-600 font-semibold block mt-4"
          >
            📞 0793 146 005
          </a>
        </div>
      </div>
    </section>
  );
}