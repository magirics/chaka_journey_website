import { ReactNode } from "react";

type PageTitleProps = {
  children: ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className="m-20 text-5xl">{children}</h1>;
}
