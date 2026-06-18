import type { CollectionConfig, CollectionSlug } from 'payload';

type RelationshipId = string | null | undefined;
type MasterWithAvailability = {
  availability?: Array<{ from: string; to: string }>;
};

function normalizeRelationshipId(value: unknown): RelationshipId {
  if (value === null || value === undefined) return value;

  if (typeof value === 'object') {
    const relationValue = (value as { value?: unknown }).value;
    return normalizeRelationshipId(relationValue);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';
    return trimmed;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return null;
}

function startOfUtcDay(input: string | Date) {
  const date = new Date(input);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}

function endOfUtcDay(input: string | Date) {
  const date = new Date(input);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
}

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
      required: false,
    },
    {
      name: 'masterRef',
      type: 'text',
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

          const { master, masterRef: incomingMasterRef, startDate, endDate } = data;

          // "master" can come as a primitive ID or as relation object.
          // Normalize to a single primitive ID for all downstream checks.
          const masterId = normalizeRelationshipId(incomingMasterRef ?? master);
          data.masterRef = masterId;

          // Diagnostics: log raw master and normalized ID (use payload logger if available)
          try {
            const logger = req?.payload?.logger || console;
            if (logger.info) {
              logger.info(`Reserves beforeChange: incoming master value: ${JSON.stringify(master)}`);
              logger.info(`Reserves beforeChange: normalized masterId: ${JSON.stringify(masterId)}`);
            }
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

        const masterAvailability = (masterDoc as MasterWithAvailability | null)?.availability;
        if (!masterDoc || !masterAvailability) {
          throw new Error('El maestro no tiene disponibilidad configurada.');
        }

        const start = startOfUtcDay(startDate);
        const end = endOfUtcDay(endDate);

        // ------------------------------------------
        // 2. Validar que el rango está dentro de disponibilidad
        //    Aquí usamos "from" y "to" que es como lo definiste
        // ------------------------------------------
        const isInsideAvailability = masterAvailability.some((a: { from: string; to: string }) => {
          const availableFrom = startOfUtcDay(a.from);
          const availableTo = endOfUtcDay(a.to);

          return (
            start >= availableFrom &&
            end <= availableTo
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
              {
                or: [
                  { masterRef: { equals: masterId } },
                  { master: { equals: masterId } },
                ],
              },
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
