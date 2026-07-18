"use client";

type AvailabilityRange = { from: string; to: string };

function parseDateOnly(value: string): Date {
  if (typeof value !== "string" || value.length < 10) {
    return new Date(NaN);
  }

  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function getUtcDayTime(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export default function Calendar({
  value,
  setValue,
  availability,
}: {
  value: string;
  setValue: (v: string) => void;
  availability?: AvailabilityRange[];
}) {
  const onChange = (e: Event) => {
    const target = e.currentTarget as HTMLElement & { value?: string };
    const nextValue = typeof target?.value === "string" ? target.value : "";
    setValue(nextValue);
  };

  const isWithinAvailability = (date: Date): boolean => {
    if (!availability || availability.length === 0) return false;

    const currentDay = getUtcDayTime(date);

    return availability.some(({ from, to }) => {
      const startDate = parseDateOnly(from);
      const endDate = parseDateOnly(to);
      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return false;
      }

      const startDay = getUtcDayTime(startDate);
      const endDay = getUtcDayTime(endDate);
      return currentDay >= startDay && currentDay <= endDay;
    });
  };

  const isDateDisallowed = (date: Date): boolean => {
    const today = getUtcDayTime(new Date());
    const currentDay = getUtcDayTime(date);

    if (currentDay < today) return true;

    if (availability && availability.length > 0) {
      return !isWithinAvailability(date);
    }

    return false;
  };

  const getDayParts = (date: Date): string => {
    const parts: string[] = [];

    if (isDateDisallowed(date)) parts.push("disallowed");
    if (isWithinAvailability(date)) parts.push("available");

    return parts.join(" ");
  };

  return (
    <div className="inline-block p-6">
      <style>
        {`calendar-range calendar-month::part(disallowed) {
          color: #ccc;
          background-color: #f9f9f9;
          cursor: not-allowed;
        }
        `}
      </style>
      <calendar-range months={2} value={value} onchange={onChange} isDateDisallowed={isDateDisallowed} getDayParts={getDayParts}>
        <svg
          aria-label="Previous"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="bg-base-100 -m-1 h-4"
        >
          <path d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <svg
          aria-label="Next"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="bg-base-100 -m-1 h-4"
        >
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

        <div className="flex flex-col gap-8 md:flex-row">
          <calendar-month></calendar-month>
          <calendar-month offset={1}></calendar-month>
        </div>
      </calendar-range>
    </div>
  );
}
