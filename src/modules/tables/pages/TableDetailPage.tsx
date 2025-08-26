import { useParams, useNavigate } from "react-router";
import { ROUTES } from "../../../routes/paths";
import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon, PlusIcon } from "@phosphor-icons/react";
import { Button, Modal, InputSearch } from "../../../shared";
import { useEffect, useState } from "react";

interface Platillo {
  id: number;
  item: string;
  quantity: number;
  priceUnitary: number;
}

interface InfoMesa {
  id: string | undefined;
  status: string | "Disponible" | "Ocupada" | "Reservada";
  capacity: number;
  name: string;
  platillos: Platillo[];
}

interface ItemMenu {
  name: string;
  price: number;
}

interface CategoriaMenu {
  categoria: string;
  items: ItemMenu[];
}

const menu: CategoriaMenu[] = [
  {
    categoria: "Carnitas",
    items: [
      { name: "Taco de carnitas", price: 20.0 },
      { name: "Burrito de carnitas", price: 50.0 },
      { name: "Quesadilla de carnitas", price: 40.0 },
    ],
  },
  {
    categoria: "Vegetariano",
    items: [
      { name: "Taco vegetariano", price: 18.0 },
      { name: "Ensalada verde", price: 35.0 },
      { name: "Sopa de verduras", price: 30.0 },
    ],
  },
  {
    categoria: "Bebidas",
    items: [
      { name: "Agua de jamaica", price: 15.0 },
      { name: "Refresco", price: 20.0 },
      { name: "Cerveza", price: 30.0 },
    ],
  },
  {
    categoria: "Postres",
    items: [
      { name: "Flan", price: 25.0 },
      { name: "Pastel de chocolate", price: 30.0 },
      { name: "Helado", price: 20.0 },
    ],
  }
];

export default function TableDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [infoMesa, setInfoMesa] = useState<InfoMesa>({} as InfoMesa);

  const [modalOrder, setModalOrder] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onCloseModalOrder = () => {
    setModalOrder(false);
    setStep(1);
    setSelectedItem(null);
    setQuantity(1);
    setSearchTerm("");
  }

  // filtro en memoria
  const filteredItems = menu.filter(
    (categoria) =>
      categoria.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoria.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  ).map(categoria => ({
    ...categoria,
    items: categoria.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })
  );

  // === Pasos del modal Agregar Orden ===
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedItem, setSelectedItem] = useState<ItemMenu | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectItem = (item: ItemMenu) => {
    setSelectedItem(item);
    setStep(2);
  };

  const handleAddItem = () => {
    if (!selectedItem) return;
    
    onCloseModalOrder();

    // Simular agregar el platillo a la mesa
    setInfoMesa((prev) => ({
      ...prev,
      platillos: [
        ...prev.platillos,
        {
          id: prev.platillos.length + 1,
          item: selectedItem.name,
          quantity,
          priceUnitary: selectedItem.price,
        },
      ],
    }));
  };

  const statusStyles: Record<string, string> = {
    Disponible: "bg-green-200 text-green-800",
    Ocupada: "bg-orange-200 text-orange-800",
    Reservada: "bg-yellow-200 text-yellow-800",
  };

  useEffect(() => {
    // Simulamos con datos estáticos por ahora
    setInfoMesa({
      id,
      status: "Ocupada",
      capacity: 4,
      name: `Mesa ${id}`,
      platillos: [],
    });
  }, [id]);

  return (
    <>
      <Modal
        isOpen={modalOrder}
        title="Menú de platillos"
        onClose={onCloseModalOrder}
      >
        {step === 1 && (
          <>
            <InputSearch onSearch={(val) => setSearchTerm(val)} value={searchTerm} /> 
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
                        onClick={() => handleSelectItem(item)}
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
        )}

        {step === 2 && selectedItem && (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">{selectedItem.name}</h2>
            <label className="mb-2">Cantidad</label>
            
            <div className="flex items-center gap-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-gray-500 cursor-pointer rounded-full hover:bg-gray-100 p-2 pl-4 pr-4">
                <CaretLeftIcon size={22} />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border bg-transparent border-gray-300 text-gray-800 rounded-4xl p-2 pl-4 pr-4 w-20 text-center"
              />
              <button onClick={() => setQuantity((q) => q + 1)} className="text-gray-800 rounded-4xl hover:bg-gray-100 p-2 pl-4 pr-4">
                <CaretRightIcon size={22} />
              </button>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={() => setStep(1)} variant="secondary">
                Atrás
              </Button>
              <Button onClick={handleAddItem} disabled={quantity < 1}>
                Agregar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.TABLES.LIST)}
            >
              <CaretLeftIcon size={22} />
            </Button>
            <h1 className="text-2xl font-bold">{infoMesa.name}</h1>
            <span
              className={`text-xs font-bold rounded-4xl p-1 px-2 my-2 ${
                statusStyles[infoMesa.status]
              }`}
            >
              {infoMesa.status}
            </span>
          </div>
          <p className="text-gray-500 my-4 text-sm mb-10">
            Mesa con capacidad para {infoMesa.capacity} personas
          </p>

          <Button onClick={() => setModalOrder(true)}>
            <PlusIcon size={22} />
            Agregar orden
          </Button>
        </div>
      </section>

      <section className="py-6 px-4 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-lg p-4 ring ring-gray-900/5">
          <h2 className="text-xl font-semibold mb-2">Órdenes</h2>
          {infoMesa.platillos && infoMesa.platillos.length > 0 ? (
            <>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {infoMesa.platillos.map((platillo) => (
                    <tr key={platillo.id} className="border-b border-gray-200">
                      <td className="px-1 py-3 text-sm text-gray-900">
                        {platillo.item}
                      </td>
                      <td className="px-1 py-3 text-sm text-gray-900">
                        <span className="text-sm font-bold rounded-4xl p-1 px-2 my-2 bg-blue-200 text-blue-800">
                          {platillo.quantity}
                        </span>
                      </td>
                      <td className="px-1 py-3 text-sm text-gray-900">
                        ${platillo.priceUnitary.toFixed(2)}
                      </td>
                      <td className="px-1 py-3 text-sm text-blue-500 font-bold">
                        $
                        {(platillo.quantity * platillo.priceUnitary).toFixed(2)}
                      </td>
                      <td className="px-1 py-3 text-sm text-gray-900 text-right">
                        <button className="text-indigo-500 hover:underline font-bold">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="px-1 py-3 font-bold">
                      Total
                    </td>
                    <td className="px-1 py-3 font-bold text-blue-500">
                      $
                      {infoMesa.platillos
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
              <div className="flex justify-end">
                <Button>
                  Finalizar orden
                  <ArrowRightIcon size={22} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-gray-500">No hay órdenes agregadas.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
