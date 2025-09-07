import { CollectionConfig } from 'payload';

const Maestros: CollectionConfig = {
  slug: 'maestros',
  admin: {
    useAsTitle: 'nombreCompleto',
  },
  access: {
    read: () => true, // agregar accesos  / está genérico, hay que actualizar los campos
  },
  fields: [

    //Cambiar por key,image,title,country,city,price,days
    {
      name: 'nombreCompleto',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'especialidad',
      type: 'text',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ubicacion',
      type: 'text',
    },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default Maestros;
