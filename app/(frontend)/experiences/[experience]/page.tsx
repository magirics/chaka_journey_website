const images = [
  "/draft/experiences/experience/image_1.avif",
  "/draft/experiences/experience/image_2.avif",
  "/draft/experiences/experience/image_3.avif",
  "/draft/experiences/experience/image_4.avif",
  "/draft/experiences/experience/image_5.avif",
  "/draft/experiences/experience/image_6.avif",
];

export default function Experience() {
  const { user, master } = {
    user: {
      name: "Samantha",
      country: "Estados Unidos",
    },
    master: {
      name: "Merlyn",
      country: "Reino Unido",
    },
  };

  const text =
    "I wanted to share a special learning experience in a medium that I love, printmaking, with one of my dearest and oldest friends, who never has time to do enough art making, but has so much to bring to it! It was very satisfying, and inspirational on a few levels: great to see a fully realized artist living her life, and pursuing her path as she uniquely has made for herself- and great to have her input on our own production, bringing her eye to bear on it. Very cool stuff!";

  return (
    <>
      <main className="mx-8 my-16 md:w-160">
        <h1 className="text-5xl">{user.name}</h1>
        <small className="inline-block pb-4">
          {user.country} | con {master.name} en {master.country}
        </small>

        <p className="pb-6">{text}</p>

        <ul className="mx-auto flex max-w-150 flex-col gap-1">
          {images.map((image) => (
            <li key={image}>
              <img src={image} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
