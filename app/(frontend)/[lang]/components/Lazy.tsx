"use client";

import dynamic from "next/dynamic";
import { FunctionComponent, PropsWithChildren } from "react";

const Lazy: FunctionComponent<PropsWithChildren> = ({ children }) => children;

export default dynamic(() => Promise.resolve(Lazy), {
  ssr: false,
});
