import PageTitle from "@/ui/PageTitle";

const images = [
  "/draft/us/image (1).jpg",
  "/draft/us/image (2).jpg",
  "/draft/us/image (3).jpg",
  "/draft/us/image (4).jpg",
  "/draft/us/image (5).jpg",
  "/draft/us/image (6).jpg",
  "/draft/us/image (7).jpg",
];

let text = `
Nuestra web está en construcción...
Pero el viaje ya ha comenzado. 🌱

Chaka Journey es una plataforma dedicada a las experiencias de aprendizaje vivencial con maestros de saberes tradicionales en América Latina.
Talleres de tejido, cocina, cerámica, agroecología, construcción natural... y mucho más.

🔜 Muy pronto podrás:
✔️ Descubrir experiencias por región o temática
✔️ Reservar directamente desde nuestra web
✔️ Conectarte con saberes vivos, de forma auténtica y sostenible
`;
text = text.trim();

export default function Us() {
  return (
    <>
      <PageTitle>Nuestra experiencia</PageTitle>

      <div className="grid w-full justify-items-center gap-1 md:grid-cols-6 md:grid-rows-6">
        <img
          src={images[0]}
          className="bg-sky-100 md:col-span-2 md:row-span-4"
        />
        <img
          src={images[2]}
          className="bg-red-100 md:col-span-2 md:row-span-2"
        />
        <img
          src={images[5]}
          className="bg-orange-100 md:col-span-2 md:row-span-3"
        />
        <img
          src={images[3]}
          className="bg-emerald-100 md:col-span-2 md:row-span-2"
        />
        <img
          src={images[6]}
          className="bg-amber-100 md:col-span-2 md:row-span-3"
        />
        <img
          src={images[1]}
          className="bg-yellow-100 md:col-span-2 md:row-span-2"
        />
        <img
          src={images[4]}
          className="bg-teal-100 md:col-span-2 md:row-span-2"
        />
      </div>

      <div className="max-w-150 p-10">
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </>
  );
}
