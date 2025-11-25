"use client";

import "cally";
import { useEffect, useRef, useState } from "react";

const reserved = [
  [new Date(2025, 11, 26), new Date(2025, 11, 28)],
  [new Date(2025, 12, 1), new Date(2025, 12, 3)],
  [new Date(2025, 12, 5), new Date(2025, 12, 7)],
]

export default function Calendar({ value, setValue }) {
  const onChange = (e) => setValue(e.target.value)

  const isDateDisallowed = (date: Date) => reserved.some(([start, end]) => start <= date && date <= end)
  const getDayParts = (date: Date): string => isDateDisallowed(date) ? "disallowed" : "";

  return (
    <div className="inline-block p-6">
      <style>
        {`calendar-range calendar-month::part(disallowed) {
          color: #ccc;
          background-color: #f9f9f9;
          cursor: not-allowed;
        }`}
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
