import React from "react";
import { FaCoffee } from "react-icons/fa";
// import { serviceCategories } from './data'; // Path to your data array

export default function TreatmentMenu() {
  const serviceCategories = [
    {
      name: "Manicure",
      options: [
        { name: "Gel Removal", price: "5,000" },
        { name: " Aerylie Removal", price: "10,000" },
        { name: "Classic Mani", price: "15,000" },
        { name: " Delux", price: "20,000" },
        { name: " Aerylie Refill", price: "25,000" },
        { name: " Aerylie Full Set", price: "35,000" },
        { name: " Russian/Dry", price: "30,000" },
        { name: "BLAB", price: "20,000" },
      ],
    },
    {
      name: "Body & Wellness",
      options: [
        { name: "Eyebrow", price: "15,000" },
        { name: " Chin", price: "15,000" },
        { name: " Lips and Chin", price: "20,000" },
        { name: " Full Face", price: "30,000" },
        { name: " Face & Neck", price: "40,000" },
      ],
    },
     {
      name: "Nails Extension",
      options: [
        { name: "Nails Art(2 Nails) ", price: "5,000" },
        { name: "Full Nail Art Set", price: "25,000" },
        { name: "Chrome", price: "15,000" },
        { name: " 3D | Rhinestones", price: "20,000" },
      ],
    },
     {
      name: "Pedicure",
      options: [
        { name: "Classic Pedicure", price: "15,000" },
        { name: "Deluxe Pedicure", price: "20,000" },
        { name: "Deluxe with Gel Pedi", price: "25,000" },
        { name: " Deluxe Gel/Design", price: "30,000" },
        { name: " Deluxe Gel/Extension", price: "35,000" },
                { name: "Foot Treatment", price: "40,000" },
        { name: "Gel Polish Removal", price: "5,000" },
        { name: "Natural Nail Polish", price: "5,000" },
        { name: "Gel Nail Polish", price: "10,000" },

      ],
    },
    {
      name: "Body Waxing",
      options: [
        { name: "Under Arm", price: "15,000 " },
        { name: "Full Face", price: "20000 " },
        { name: "Lips $ Chine", price: "15000 " },
        { name: "Eyebrown ", price: " 10,000" },
        { name: "Full Legs", price: "30,000" },
        { name: "Half Legs", price: "20,000 " },
        { name: "Half Arms", price: "20,000 " },
        { name: "Full Arms", price: "30,000" },
        { name: "Bikini Line", price: "25,000 " },
        { name: "Brazilian", price: "30,000 " },
        { name: "Chest or Back ", price: "40,000 " },
        { name: " Belly", price: "40,000" },
      ],
    },
  ];

  return (
    <div id="menu" className="lg:col-span-5 space-y-8 scroll-mt-28">
      <div className="bg-white border border-[#FBCFE8] p-6 sm:p-8 rounded-3xl shadow-xl shadow-[#9D174D]/5 space-y-8 relative overflow-hidden">
        {/* Soft decorative background tint blend */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FBCFE8] via-[#DB2777] to-[#9D174D]" />

        {/* Header Block */}
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#9D174D] tracking-tight">
            The Treatment Menu
          </h2>
          <p className="text-xs text-[#8C6D6D] mt-1.5 leading-relaxed">
            Tap services on the right form block to build your custom
            reservation box.
          </p>
        </div>

        {/* Dynamic Categories Map */}
        <div className="space-y-8">
          {serviceCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              {/* Category Section Header */}
              <div className="flex items-center justify-between border-b border-[#FFF5F5] pb-1.5">
                <span className="lg:text-[16px] text-xs font-extrabold uppercase tracking-[0.2em] text-[#9D174D]">
                  {category.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#DB2777]/60 font-semibold">
                  {category.options.length} Services
                </span>
              </div>

              {/* Category Options List */}
              <ul className="space-y-3.5">
                {category.options.map((item) => (
                  <li
                    key={item.name}
                    className="group flex items-baseline justify-between gap-4 text-sm transition-all duration-200 hover:translate-x-0.5"
                  >
                    {/* Left: Indicator & Service Name */}
                    <div className="flex flex-col flex-shrink-0 max-w-[70%]">
                      <div className="flex items-center gap-2 text-[#4A2828] font-medium group-hover:text-[#DB2777] transition-colors">
                        <span className="text-[#DB2777] text-[10px] scale-75 group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300">
                          ✦
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {/* {item.duration && (
                        <span className="text-[11px] text-[#8C6D6D] pl-4 italic font-light">
                          {item.duration}
                        </span>
                      )} */}
                    </div>

                    {/* Middle: Luxury Menu Dot Connectors */}
                    <div className="flex-grow border-b border-dotted border-[#FBCFE8] h-1 opacity-40 group-hover:opacity-80 transition-opacity" />

                    {/* Right: Dynamic Pricing Tag */}
                    <div className="text-right flex-shrink-0 font-serif font-bold text-[#9D174D] group-hover:scale-105 transition-transform">
                      {item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Premium Complimentary Footer Banner */}
        <div className="pt-5 border-t border-[#FFF5F5] flex items-start gap-3 text-xs text-[#6B4F4F] bg-[#FFF5F5]/60 p-4 rounded-2xl border border-[#FBCFE8]/30">
          <FaCoffee className="text-[#DB2777] shrink-0 mt-0.5" size={16} />
          <span className="leading-relaxed">
            All appointments include tailored{" "}
            <span className="font-semibold text-[#9D174D]">
              aromatic tea blends
            </span>
            , freshly filtered{" "}
            <span className="font-semibold text-[#9D174D]">
              espresso coffee
            </span>
            , and premium biscuit trays.
          </span>
        </div>
      </div>
    </div>
  );
}
