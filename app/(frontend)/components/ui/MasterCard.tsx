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
      <div className="group relative overflow-hidden">
        <img
          src={image}
          className="absolute top-0 left-0 transition duration-400 first:group-hover:opacity-0"
        />
        <img
          src={on_hover_image}
          className="transition duration-200 last:group-hover:scale-110"
        />
      </div>
      <div className="space-y-4 p-4">
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
