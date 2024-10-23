import { cn } from "@/lib/utils";
import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  classname?: string;
}

const Section: FC<SectionProps> = ({ children, variant, classname }) => {
  return (
    <section
      className={cn(
        `w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center ${classname}`,
        variant === "primary" ? "bg-white" : "bg-black"
      )}
    >
      {children}
    </section>
  );
};

export default Section;
