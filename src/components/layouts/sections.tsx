// components/Section.tsx
interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className = "" }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-16 px-6 md:py-24 md:px-12 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </section>
  );
}