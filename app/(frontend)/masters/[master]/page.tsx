import Calendar from "@/ui/Calendar";
import Pricing from "@/ui/Pricing";

export default function Master() {
  const { name, craft, city, country, hours, days } = {
    name: "Viviana",
    craft: "Tango Argentino",
    city: "Buenos Aires",
    country: "Argentina",
    hours: 12,
    days: 3,
  };

  const overview =
    "Apasionarse mientras te expresas a través del tango en las calles de Buenos Aires junto a la maestra de tango Viviana. Experimente la vida cotidiana en la capital mundial del tango, luego pase sus noches bailando en las milongas de la ciudad. Realmente no hay nada como experimentar el tango en esta vibrante ciudad.";

  const meet_the_master =
    "Tango is in Viviana’s genes. Born and raised in Buenos Aires, mecca of tango, Viviana has been a tango instructor and performer since 1993. She has founded tango groups, taught classes, organized milongas and performed across Argentina, US and Europe. Between Argentine stage and social styles of tango, Viviana specializes in social tango. As a teacher, she is known to make this dance form accessible to a wide audience by distilling the essentials of tango. She focuses on connecting with one's own expression and discovering the relationship with others through a musical and emotional body language. As neuroscience suggests, she feels tango has the unique ability to produce large amounts of brain activity while maintaining a zen state of mind. It is sophisticated and challenging and can only be decrypted by getting immersed in Buenos Aires and understanding its culture, origin and constant evolution. Viviana’s passion will get you addicted to tango and Buenos Aires. She may even make you love Fernet!";

  const experience_includes = `
▪ Experiencing Viviana’s everyday life in Buenos Aires, the tango capital.
▪ One hour of private instruction everyday.
▪ Two group classes to practice with other dance partners.
▪ Two evenings dancing in Viviana’s favorite milongas in the city - one underground and one upscale. Includes entrance fees.
▪ Visiting local cafes that are known for their tango history.
▪ Visiting Viviana’s musician friends for their regular tango music jams, if possible.
▪ Option to visit Viviana’s favorite tango shoe store if you need to buy a pair.
  `;

  const explore_city =
    "The many cultures that have filtered into Buenos Aires via its ports have led to French architecture, English lifestyle, Spanish culture, and Italian flair. Made up of bits and pieces from around the world, Buenos Aires nevertheless has an identity of its own. Its urban art scene, in particular, is one of the best in the world, due to relaxed laws that enable artists to leave their mark just about everywhere in the city. Meanwhile, the neighborhood of Palermo is a hip, bohemian network of bars, outdoor cafes, and trendy shops housed in elegant old houses and repurposed warehouses.";

  const additional_details =
    "This VAWAA is available for a longer duration. If interested in extending your time, let us know by how many days and we will do our best to accommodate you.";

  return (
    <>
      <Hero />

      <main className="mx-8 md:w-200">
        <span>
          {city}, {country} {hours} horas por {days} días
        </span>

        <div className="divider" />

        <div className="space-x-16 md:flex">
          <div>
            <h1 className="mb-4 text-4xl">
              {craft} con {name}
            </h1>
            <p>{overview}</p>
          </div>

          <div>
            <div className="divider md:hidden" />
            <Pricing />
          </div>
        </div>

        <div className="divider" />

        <Tiles />

        <h2 className="mb-2 text-2xl">Conoce al maestro</h2>
        <p className="mb-16">{meet_the_master}</p>

        <h2 className="mb-2 text-2xl">La experiencia incluye:</h2>
        <p className="mb-16 whitespace-pre-wrap">{experience_includes}</p>

        <h2 className="mb-2 text-2xl">Explora la ciudad</h2>
        <p className="mb-16">{explore_city}</p>

        <h2 className="mb-2 text-2xl">Adicional</h2>
        <p className="mb-16">{additional_details}</p>

        <div className="divider" />

        <h2 className="mb-2 text-2xl">Reservación</h2>
        <div className="mb-8 flex justify-center">
          <Calendar />
        </div>
      </main>
    </>
  );
}

function Hero() {
  return (
    <div className="mb-8 w-screen">
      <img src="/draft/masters/master/hero.avif" />
    </div>
  );
}

function Tiles() {
  return (
    <div className="mb-8 grid justify-center gap-4 md:grid-cols-3 md:grid-rows-3 lg:relative lg:-left-30 lg:w-[130%]">
      <img src="/draft/masters/master/tile_1.avif" />
      <img src="/draft/masters/master/tile_2.avif" />
      <img src="/draft/masters/master/tile_3.avif" />

      <img src="/draft/masters/master/tile_4.avif" />
      <img src="/draft/masters/master/tile_5.avif" />
      <img src="/draft/masters/master/tile_6.avif" />

      <img src="/draft/masters/master/tile_7.avif" />
      <img src="/draft/masters/master/tile_8.avif" />
    </div>
  );
}
