import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const Container = ({ children, title, className }: ContainerProps) => {
  return (
    <div className={cn("bg-dark_bg_sec px-5 py-4 rounded-lg", className)}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  );
};

export default Container;
