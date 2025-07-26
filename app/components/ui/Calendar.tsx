"use client";

import "cally";

export default function Calendar() {
  return (
    <div className="inline-block p-6">
      <calendar-range months={2}>
        <svg
          aria-label="Previous"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 bg-base-100 -m-1"
        >
          <path d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <svg
          aria-label="Next"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 bg-base-100 -m-1"
        >
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

        <div className="flex gap-8">
          <calendar-month></calendar-month>
          <calendar-month offset={1}></calendar-month>
        </div>
      </calendar-range>
    </div>
  );
}
