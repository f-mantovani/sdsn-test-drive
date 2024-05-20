import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid-rows-[auto, 1fr, auto] mx-auto grid min-h-screen w-4/5 pt-4">
      {children}
    </div>
  );
};
