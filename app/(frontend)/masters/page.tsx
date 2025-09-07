"use client";

import { NavIcon } from "@/layout/Navbar";
import MasterCard from "@/ui/MasterCard";
import PageTitle from "@/ui/PageTitle";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

const masters = [
  {
    image: "draft/masters/master_5.avif",
    on_hover_image: "draft/masters/master_5_on_hover.avif",
    name: "Viviana",
    craft: "Tango Argentino",
    city: "Buenos Aires",
    country: "Argentina",
    price: 575,
    days: 3,
  },
  {
    image: "draft/masters/master_6.avif",
    on_hover_image: "draft/masters/master_6_on_hover.avif",
    name: "Chikako",
    craft: "Caligrafía Japonesa",
    city: "Japon",
    country: "Kyoto",
    price: 700,
    days: 3,
  },
  {
    image: "draft/masters/master_7.avif",
    on_hover_image: "draft/masters/master_7_on_hover.avif",
    name: "Pum Pum",
    craft: "Arte Callejero",
    city: "Argentina",
    country: "Buenos aires",
    price: 885,
    days: 3,
  },
  {
    image: "draft/masters/master_8.avif",
    on_hover_image: "draft/masters/master_8_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
  {
    image: "draft/masters/master_9.avif",
    on_hover_image: "draft/masters/master_9_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
  {
    image: "draft/masters/master_10.avif",
    on_hover_image: "draft/masters/master_10_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
];

export default function Masters() {
   const handleClick = async () => {
    const res = await fetch('/stripe/create-checkout-session', { method: 'POST' })
    const data = await res.json()
    window.location.href = data.url
  }
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((ev: React.SyntheticEvent) => {
    const searchText = (ev.target as HTMLInputElement).value.toLowerCase();
    console.log(searchText);

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
      <label
        className="input my-10 md:w-120"
        onChange={handleChange}
        defaultValue={searchText}
      >
        <NavIcon href="" icon="search" />
        <input />
      </label>
      <div className="mb-16 flex w-full flex-wrap justify-center gap-8">
        {filteredMasters.map((master) => (
          <MasterCard key={master.image} {...master} />
        ))}
      </div>
    </>
  )
}