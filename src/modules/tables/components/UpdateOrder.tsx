import { Button, InputNumber } from "@/shared";
import type { Platillo } from "../types";
import { useEffect, useState } from "react";

interface UpdateOrderProps {
  updatedItem: Platillo;
}

export default function UpdateOrder({ updatedItem }: UpdateOrderProps) {
  const [platillo, setPlatillo] = useState<Platillo>(updatedItem);

  useEffect(() => {
    setPlatillo(updatedItem);
  }, [updatedItem]);

  const setQuantity = (val: number) => {
    // TODO: Actualizar la cantidad del item en el back
    setPlatillo((prev) => ({ ...prev, quantity: val }));
  };

  const deleteItem = () => {
    // TODO: Eliminar el item del back
  };


  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Actualizar {platillo.name}</h2>
      <label className="mb-2" htmlFor="quantity">Cantidad</label>
      <InputNumber id="quantity" quantity={platillo.quantity} setQuantity={setQuantity} />

      <div className="flex gap-2 mt-6">
        <Button onClick={deleteItem} variant="red">
          Eliminar Orden
        </Button>
        <Button
          disabled={platillo.quantity < 1}
        >
          Actualizar
        </Button>
      </div>
    </div>
  );
}
