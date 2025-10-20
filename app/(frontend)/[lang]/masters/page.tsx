"use client";

import { NavIcon } from "@/layout/Navbar";
import MasterCard from "@/ui/MasterCard";
import Pricing from "@/ui/Pricing";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React from "react";

const masters = [
  {
    image: "/draft/masters/master_5.avif",
    on_hover_image: "/draft/masters/master_5_on_hover.avif",
    name: "Viviana",
    craft: "Tango Argentino",
    city: "Buenos Aires",
    country: "Argentina",
    price: 575,
    days: 3,
  },
  {
    image: "/draft/masters/master_6.avif",
    on_hover_image: "/draft/masters/master_6_on_hover.avif",
    name: "Chikako",
    craft: "Caligrafía Japonesa",
    city: "Japon",
    country: "Kyoto",
    price: 700,
    days: 3,
  },
  {
    image: "/draft/masters/master_7.avif",
    on_hover_image: "/draft/masters/master_7_on_hover.avif",
    name: "Pum Pum",
    craft: "Arte Callejero",
    city: "Argentina",
    country: "Buenos Aires",
    price: 885,
    days: 3,
  }, {
    image: "/draft/masters/master_8.avif",
    on_hover_image: "/draft/masters/master_8_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
  {
    image: "/draft/masters/master_9.avif",
    on_hover_image: "/draft/masters/master_9_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
  {
    image: "/draft/masters/master_10.avif",
    on_hover_image: "/draft/masters/master_10_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
];

export default function Masters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 🔹 Checkout handler
  const handleClick = async (master: typeof masters[0]) => {
    const res = await fetch("/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: master.name,
        price: master.price,
        days: master.days,
      }),
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    } else {
      console.error("Error en checkout:", data);
    }
  };

  // 🔹 Search handler
  const handleChange = useDebouncedCallback((ev: React.SyntheticEvent) => {
    const searchText = (ev.target as HTMLInputElement).value.toLowerCase();

    const params = new URLSearchParams(searchParams);
    if (searchText) params.set("search", searchText);
    else params.delete("search");

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const searchText = searchParams.get("search")?.toString() || "";

  const filteredMasters = masters.filter((master) => {
    const allFields =
      master.name +
      master.craft +
      master.city +
      master.country +
      master.price +
      master.days;

    return allFields.toLowerCase().includes(searchText);
  });

  return (
    <>
      {/* 🔍 Search bar */}
      <label className="input my-10 md:w-120">
        <NavIcon href="" icon="search" />
        <input
          placeholder="Buscar..."
          onChange={handleChange}
          defaultValue={searchText}
        />
      </label>

      {/* 🔹 Cards + Pricing */}
      <div className="mb-16 flex w-full flex-wrap justify-center gap-12">
        {filteredMasters.map((master) => (
          <div
            key={master.image}
            className="flex flex-col items-center gap-6 border rounded-lg p-4 shadow-md"
          >
            <MasterCard {...master} />
            <Pricing
              price={master.price}
              guestPrice={230}
              maxGuests={4}
              onReserve={() => handleClick(master)}
            />
          </div>
        ))}
      </div>
    </>
  );
}