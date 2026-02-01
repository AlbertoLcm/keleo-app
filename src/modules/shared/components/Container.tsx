interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <section className={`container mx-auto px-4 py-6 md:px-6 md:py-6 ${className ? className : ""}`}>
      {children}
    </section>
  )
}

export default Container;