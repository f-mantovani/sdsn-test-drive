import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto, 1fr, auto] min-h-screen w-4/5 mx-auto">
      {children}
    </div>
  );
};
