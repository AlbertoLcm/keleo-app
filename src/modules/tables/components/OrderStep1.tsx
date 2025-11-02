import { InputSearch } from "@/shared";
import type { ItemMenu } from "../types";

interface OrderStep1Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filteredItems: { categoria: string; items: ItemMenu[] }[];
  onSelectItem: (item: ItemMenu) => void;
}

export default function OrderStep1({
  searchTerm,
  setSearchTerm,
  filteredItems,
  onSelectItem,
}: OrderStep1Props) {
  return (
    <>
      <InputSearch onSearch={setSearchTerm} value={searchTerm} />
      <section className="mt-4 max-h-[400px] overflow-y-auto">
        {filteredItems.map((cat) => (
          <div key={cat.categoria}>
            <p className="text-lg font-semibold mt-4 mb-2">
              {cat.categoria}
            </p>
            <section className="flex flex-wrap">
              {cat.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSelectItem(item)}
                  className="text-sm text-gray-800 m-1 p-3 border border-gray-300 rounded-2xl hover:bg-gray-100 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </section>
          </div>
        ))}
      </section>
    </>
  );
}
