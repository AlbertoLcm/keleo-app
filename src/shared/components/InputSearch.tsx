type InputSearchProps = {
  onSearch: (value: string) => void;
  value?: string;
};

export default function InputSearch({ onSearch, value }: InputSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
