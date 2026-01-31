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
      className={`py-8 w-full px-0 md:px-12 lg:max-w-7xl lg:mx-auto mb-16 ${className}`}
    >
      {children}
    </section>
  );
}