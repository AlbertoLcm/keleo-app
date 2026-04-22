interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <section className={`container mx-auto max-w-7xl p-4 md:p-6 ${className ? className : ""}`}>
      {children}
    </section>
  )
}

export default Container;