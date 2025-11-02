interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <section className="max-w-[1200px] mx-auto py-6 px-4 md:px-8">
      {children}
    </section>
  )
}