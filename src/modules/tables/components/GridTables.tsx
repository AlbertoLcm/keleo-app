export default function GridTables({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {children}
    </section>
  );
}
