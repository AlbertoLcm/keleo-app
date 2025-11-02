import { Avatar } from "@/shared";
import { CaretRightIcon } from "@phosphor-icons/react";
import type { UUID } from "crypto";

type CardRestaurantProps = {
  cardId: UUID;
  name: string;
  address: string;
  logo: string;
  onClick?: (cardId: UUID) => void;
};

export default function CardRestaurant({
  cardId,
  name,
  address,
  logo,
  onClick,
}: CardRestaurantProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(cardId);
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className="bg-white group ring-1 ring-gray-200 rounded-xl p-4 flex flex-col gap-4 cursor-pointer hover:ring-blue-500 transition-all duration-200 h-[250px] relative"
    >
      <Avatar name={name} src={logo} />

      <div className="flex flex-col justify-between">
        <p className="text-gray-800">{name}</p>
        <span className="truncate block text-sm text-gray-500 max-w-[250px]">
          {address}
        </span>
      </div>

      <div>
        <span className="rounded-full text-xs text-blue-700 bg-blue-100 px-2 py-1">
          4 Mesas Activas
        </span>
      </div>

      <span
        className="text-gray-400 absolute bottom-4 right-4 transition-colors duration-200 group-hover:text-blue-500"
      >
        <CaretRightIcon size={24} />
      </span>
    </div>
  );
}
