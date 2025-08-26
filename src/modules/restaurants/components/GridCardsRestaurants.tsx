export default function GridCardsRestaurants({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {children}
    </section>
  );
}
