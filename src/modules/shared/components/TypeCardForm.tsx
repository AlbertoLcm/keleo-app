const TypeCardForm = ({
  icon,
  label,
  selected,
  onClick,
}: {
  key: string;
  icon?: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border transition-all duration-200
      ${
        selected
          ? "bg-keleo-50 dark:bg-keleo-900/20 border-keleo-500 text-keleo-600 dark:text-keleo-500 shadow-sm scale-105"
          : "bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
      }
    `}
  >
    {icon}
    <span className="text-sm font-bold">{label}</span>
  </div>
);

export default TypeCardForm;