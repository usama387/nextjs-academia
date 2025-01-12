"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  // state to hold selected date value
  const [value, onChange] = useState<Value>(new Date());

  // using router for navigation
  const router = useRouter();

  // passing date in url params
  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value.toLocaleString("en-US")}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
