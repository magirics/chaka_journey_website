const masters = [
  {
    image: "draft/masters/master_1.avif",
    on_hover_image: "draft/masters/master_1_on_hover.avif",
    name: "Viviana",
    craft: "Tango Argentino",
    city: "Buenos Aires",
    country: "Argentina",
    price: 575,
    days: 3,
  },
  {
    image: "draft/masters/master_2.avif",
    on_hover_image: "draft/masters/master_2_on_hover.avif",
    name: "Chikako",
    craft: "Caligrafía Japonesa",
    city: "Japon",
    country: "Kyoto",
    price: 700,
    days: 3,
  },
  {
    image: "draft/masters/master_3.avif",
    on_hover_image: "draft/masters/master_3_on_hover.avif",
    name: "Pum Pum",
    craft: "Arte Callejero",
    city: "Argentina",
    country: "Buenos aires",
    price: 885,
    days: 3,
  },
  {
    image: "draft/masters/master_4.avif",
    on_hover_image: "draft/masters/master_4_on_hover.avif",
    name: "Takaoka",
    craft: "Encerado Tradicional",
    city: "Japon",
    country: "Kyoto",
    price: 3365,
    days: 3,
  },
];

export default function MasterCarousel() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      {masters.map((master) => (
        <MasterCard key={master.name} {...master} />
      ))}
    </div>
  );
}
