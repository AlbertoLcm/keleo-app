import { Button, InputNumber } from "@/shared";
import type { ItemMenu } from "../types";

interface OrderStep2Props {
  selectedItem: ItemMenu;
  quantity: number;
  setQuantity: (val: number) => void;
  onBack: () => void;
  onAdd: () => void;
}

export default function OrderStep2({
  selectedItem,
  quantity,
  setQuantity,
  onBack,
  onAdd,
}: OrderStep2Props) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">{selectedItem.name}</h2>

      <label htmlFor="quantity" className="mb-2">Cantidad</label>

      <InputNumber id="quantity" quantity={quantity} setQuantity={setQuantity} />

      <div className="flex gap-2 mt-6">
        <Button onClick={onBack} variant="secondary">
          Atrás
        </Button>
        <Button onClick={onAdd} disabled={quantity < 1}>
          Agregar
        </Button>
      </div>
    </div>
  );
}
