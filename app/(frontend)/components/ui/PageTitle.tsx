import { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className="m-20 text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-neutral-900 md:text-6xl">{children}</h1>;
}
