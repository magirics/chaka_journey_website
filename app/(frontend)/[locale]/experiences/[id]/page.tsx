import { RichText } from '@payloadcms/richtext-lexical/react';

const images = [
  "/draft/experiences/experience/image_1.avif",
  "/draft/experiences/experience/image_2.avif",
  "/draft/experiences/experience/image_3.avif",
  "/draft/experiences/experience/image_4.avif",
  "/draft/experiences/experience/image_5.avif",
  "/draft/experiences/experience/image_6.avif",
];

const jsxConverters = ({ defaultConverters }: { defaultConverters: any }) => ({
  ...defaultConverters,

  "upload": ({ node }: { node: any }) => {
    const url = node.value.url;
    const alt = node.value.alt;
    return (
      <img src={url} alt={alt} width='100%' className="mx-auto my-1 max-w-150" />
    );
  },

});

export default async function Experience({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:3000/api/experiences/${id}`)
  const body = await response.json()

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

        <RichText converters={jsxConverters} data={body.content} />
      </main>
    </>
  );
}
