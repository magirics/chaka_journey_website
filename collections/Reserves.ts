import type { CollectionConfig, CollectionSlug } from 'payload';

export const Reserves: CollectionConfig = {
  slug: 'reserves',
  admin: {
    useAsTitle: 'id',
  },

  fields: [
    {
      name: 'master',
      type: 'relationship',
      relationTo: 'masters' as CollectionSlug,
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'stripeSessionId',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: ['paid', 'cancelled'],
      defaultValue: 'paid',
      required: true,
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') return;

          const { master, startDate, endDate } = data;

          // "master" can come as a string ID, or as a polymorphic relation
          // object { relationTo: 'masters', value: 'id' } depending on how
          // the client submitted the value (admin UI vs REST body).
          // Normalize to a single ID string here.
          const masterId = (typeof master === 'object' && master?.value) ? master.value : master;

          // Diagnostics: log raw master and normalized ID (use payload logger if available)
          try {
            const logger = req?.payload?.logger || console;
            logger.info && logger.info('Reserves beforeChange: incoming master value:', master);
            logger.info && logger.info('Reserves beforeChange: normalized masterId:', masterId);
          } catch (err) {
            console.log('Reserves beforeChange: logger error', err);
          }

          // If a polymorphic object was passed, ensure the relationTo slug is correct
          if (typeof master === 'object' && master?.relationTo && master.relationTo !== 'masters') {
            throw new Error(`El campo master debe relacionarse con 'masters', pero se recibió '${master.relationTo}'.`);
          }

        if (!masterId || !startDate || !endDate) return;

        // ------------------------------------------
        // 1. Traer la disponibilidad del master
        // ------------------------------------------
        const masterDoc = await req.payload.findByID({
          collection: 'masters' as CollectionSlug, // 👈 correcto
          id: masterId,
        });

        const masterAvailability = (masterDoc as any)?.availability;
        if (!masterDoc || !masterAvailability) {
          throw new Error('El maestro no tiene disponibilidad configurada.');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // ------------------------------------------
        // 2. Validar que el rango está dentro de disponibilidad
        //    Aquí usamos "from" y "to" que es como lo definiste
        // ------------------------------------------
        const isInsideAvailability = masterAvailability.some((a: { from: string; to: string }) => {
          return (
            start >= new Date(a.from) &&
            end <= new Date(a.to)
          );
        });

        if (!isInsideAvailability) {
          throw new Error('La fecha seleccionada está fuera de la disponibilidad del maestro.');
        }

        // ------------------------------------------
        // 3. Validación de solapamiento de reservas
        // ------------------------------------------
        const overlapping = await req.payload.find({
          collection: 'reserves' as CollectionSlug,
          where: {
            and: [
              { master: { equals: masterId } },
              { startDate: { less_than_equal: endDate } },
              { endDate: { greater_than_equal: startDate } },
            ],
          },
        });

        if (overlapping.totalDocs > 0) {
          throw new Error('Ya existe una reserva que se solapa en estas fechas.');
        }
      },
    ],
  },
};
