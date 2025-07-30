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

type MasterCardProps = {
  image: string;
  on_hover_image: string;
  craft: string;
  name: string;
  city: string;
  country: string;
  price: number;
  days: number;
};

// Use 480x480 images
function MasterCard(props: MasterCardProps) {
  const { image, on_hover_image, craft, name, city, country, price, days } =
    props;

  return (
    <div className="inline-block md:w-60">
      <div className="relative group overflow-hidden">
        <img
          src={image}
          className="absolute top-0 left-0 first:group-hover:opacity-0 transition duration-400"
        />
        <img
          src={on_hover_image}
          className="last:group-hover:scale-110 transition duration-200"
        />
      </div>
      <div className="p-4 space-y-4">
        <h2 className="text-xl">
          {craft} con {name}
        </h2>
        <div>
          <p>
            {city}, {country}
          </p>
          <div className="space-x-4">
            <span>${price}</span>
            <span>{days} días</span>
          </div>
        </div>
      </div>
    </div>
  );
}
