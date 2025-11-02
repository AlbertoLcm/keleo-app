import { Button } from "@/shared";
import type { Platillo } from "../types";
import { generarTicketPDF } from "../utils/generateTicketPDF";
import { ROUTES } from "@/routes/paths";
import { useNavigate } from "react-router";

interface FinishOrderProps {
  platillos: Platillo[];
  setModalFinish: (val: boolean) => void;
}

export default function FinishOrder({ platillos, setModalFinish }: FinishOrderProps) {
  const navigate = useNavigate();

  const finishOrder = (platillos: Platillo[]) => {
    // Generamos el Ticket

    // TODO: Obtenemos los datos del backend / context o cualquier cosa que implemente
    const nameRestaurante = 'Restaurante prueba'
    const nameMesa = 'Mesa 4'

    generarTicketPDF(platillos, nameRestaurante, nameMesa)
  
    /* 
      TODO: Aqui va ir la logica para mandar los datos al backend
      limpiar la mesa, ponerla en modo Disponible y regresar a la pantalla de las mesas
    */
  
    navigate(ROUTES.TABLES.LIST);
  };
  
  return (
    <section>
      <h2>Resumén de los pedidos</h2>

      <div className="mt-4 max-h-[400px] overflow-y-auto">
        <table className="min-w-full bg-white mb-8">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-1 py-4 text-start text-sm text-gray-500">
                Prod.
              </th>
              <th className="px-1 py-4 text-start text-sm text-gray-500">
                Cant.
              </th>
              <th className="px-1 py-4 text-start text-sm text-gray-500">
                Unit.
              </th>
              <th className="px-1 py-4 text-start text-sm text-gray-500">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {platillos.map((platillo) => (
              <tr key={platillo.id} className="border-b border-gray-200">
                <td className="px-1 py-3 text-sm text-gray-900">
                  {platillo.name}
                </td>
                <td className="px-1 py-3 text-sm text-gray-900">
                  {platillo.quantity}
                </td>
                <td className="px-1 py-3 text-sm text-gray-900">
                  ${platillo.priceUnitary.toFixed(2)}
                </td>
                <td className="px-1 py-3 text-sm">
                  ${(platillo.quantity * platillo.priceUnitary).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="px-1 py-3 font-bold">
                Total
              </td>
              <td className="px-1 py-3 font-bold">
                $
                {platillos
                  .reduce(
                    (total, platillo) =>
                      total + platillo.quantity * platillo.priceUnitary,
                    0
                  )
                  .toFixed(2)}
              </td>
              <td className="px-1 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-6 justify-end">
          <Button variant="secondary" onClick={() => setModalFinish(false)}>
            Cancelar
          </Button>
          <Button onClick={() => finishOrder(platillos)}>
            Confirmar
          </Button>
        </div>
    </section>
  );
}
