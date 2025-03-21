import { cn } from "@/lib/utils";
import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  style?: React.CSSProperties;
}

const Section: FC<SectionProps> = ({ children, variant, className, style }) => {
  return (
    <section
      className={cn(
        `w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center ${className}`,
        variant === "primary" ? "bg-white" : "bg-gray-50 dark:bg-[#1A1A1A]"
      )}
      style={style}
    >
      {children}
    </section>
  );
};

export default Section;
