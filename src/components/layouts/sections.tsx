// components/Section.tsx
import { forwardRef } from "react";

type SectionProps = React.ComponentPropsWithRef<"section">;

const Section = forwardRef<HTMLOptionElement, SectionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-6 w-full px-0 md:px-8 mb-8 ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
export default Section;