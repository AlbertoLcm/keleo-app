import {
  ArrowRightIcon,
  CaretLeftIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Modal } from "@/shared";
import {
  OrderStep1,
  OrderStep2,
  UpdateOrder,
  FinishOrder,
} from "../../tables";
import type { CategoriaMenu, InfoMesa, ItemMenu, Platillo } from "../types";
import api from "@/api/axios";
import type { UUID } from "crypto";
import SkeletonInfoMesa from "../components/SkeletonInfoMesa";
import SkeletonOrders from "../components/SkeletonOrders";

/* Menú temporal */
const menu: CategoriaMenu[] = [
  {
    categoria: "Carnitas",
    items: [
      { name: "Taco de carnitas", price: 20 },
      { name: "Burrito de carnitas", price: 50 },
      { name: "Quesadilla de carnitas", price: 40 },
    ],
  },
  {
    categoria: "Vegetariano",
    items: [
      { name: "Taco vegetariano", price: 18 },
      { name: "Ensalada verde", price: 35 },
      { name: "Sopa de verduras", price: 30 },
    ],
  },
  {
    categoria: "Bebidas",
    items: [
      { name: "Agua de jamaica", price: 15 },
      { name: "Refresco", price: 20 },
      { name: "Cerveza", price: 30 },
    ],
  },
  {
    categoria: "Postres",
    items: [
      { name: "Flan", price: 25 },
      { name: "Pastel de chocolate", price: 30 },
      { name: "Helado", price: 20 },
    ],
  },
];

export default function TableDetailPage() {
  const { id_table, id_restaurante } = useParams<{ id_table: UUID, id_restaurante: UUID }>();
  const navigate = useNavigate();

  const [infoMesa, setInfoMesa] = useState<InfoMesa | null>(null);
  const [orders, setOrders] = useState<Platillo[]>([]);

  const [loadingMesa, setLoadingMesa] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // === Modales ===
  const [modalOrder, setModalOrder] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalFinish, setModalFinish] = useState(false);

  // === Estados para crear orden ===
  const [searchTerm, setSearchTerm] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedItem, setSelectedItem] = useState<ItemMenu | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [updatedItem, setUpdatedItem] = useState<Platillo | null>(null);

  /* =============================
    Cargar info y pedidos
  ============================== */
  useEffect(() => {
    if (!id_table) return;

    const fetchData = async () => {
      try {
        setLoadingMesa(true);
        setLoadingOrders(true);

        const [mesaRes, ordersRes] = await Promise.all([
          api.get(`/restaurants/${id_restaurante}/tables/${id_table}`),
          api.get(`/restaurants/${id_restaurante}/tables/${id_table}/orders`),
        ]);

        setInfoMesa(mesaRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoadingMesa(false);
        setLoadingOrders(false);
      }
    };

    fetchData();
  }, [id_table]);

  /* =============================
    Filtros del menú
  ============================== */
  const filteredItems = menu
    .filter(
      (cat) =>
        cat.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));

  /* =============================
    Funciones auxiliares
  ============================== */
  const onCloseModalOrder = () => {
    setModalOrder(false);
    setStep(1);
    setSelectedItem(null);
    setQuantity(1);
    setSearchTerm("");
  };

  const handleSelectItem = (item: ItemMenu) => {
    setSelectedItem(item);
    setStep(2);
  };

  const handleAddItem = () => {
    if (!selectedItem) return;
    // TODO: POST al backend
    onCloseModalOrder();
  };

  const handleEditItem = (item: Platillo) => {
    setUpdatedItem(item);
    setModalEdit(true);
  };

  const statusStyles: Record<string, string> = {
    Disponible: "bg-green-200 text-green-800",
    Ocupada: "bg-orange-200 text-orange-800",
    Reservada: "bg-yellow-200 text-yellow-800",
  };

  /* =============================
    Render principal
  ============================== */
  return (
    <>
      {/* Modal Crear Orden */}
      <Modal
        isOpen={modalOrder}
        title="Menú de platillos"
        onClose={onCloseModalOrder}
      >
        {step === 1 ? (
          <OrderStep1
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredItems={filteredItems}
            onSelectItem={handleSelectItem}
          />
        ) : (
          selectedItem && (
            <OrderStep2
              selectedItem={selectedItem}
              quantity={quantity}
              setQuantity={setQuantity}
              onBack={() => setStep(1)}
              onAdd={handleAddItem}
            />
          )
        )}
      </Modal>

      {/* Modal Editar Orden */}
      <Modal
        isOpen={modalEdit}
        title="Editar platillo"
        onClose={() => setModalEdit(false)}
      >
        {updatedItem && <UpdateOrder updatedItem={updatedItem} />}
      </Modal>

      {/* Modal Finalizar Orden */}
      <Modal
        isOpen={modalFinish}
        title="Finalizar orden"
        onClose={() => setModalFinish(false)}
      >
        <FinishOrder platillos={orders} setModalFinish={setModalFinish} />
      </Modal>

      {/* =============================
          Información de la Mesa
      ============================== */}
      {loadingMesa ? (
        <SkeletonInfoMesa />
      ) : infoMesa ? (
        <section className="mb-6">
          <div className="flex items-center gap-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <CaretLeftIcon size={22} />
            </Button>
            <h1 className="text-2xl">{infoMesa.name}</h1>
            <span
              className={`text-xs rounded-4xl p-1 px-2 my-2 ${
                statusStyles[infoMesa.status] || ""
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
        </section>
      ) : (
        <p className="text-gray-500">No se encontró la mesa.</p>
      )}

      {/* =============================
          Órdenes
      ============================== */}
      {loadingOrders ? (
        <SkeletonOrders />
      ) : orders.length > 0 ? (
        <div className="bg-white rounded-2xl p-4 ring-1 ring-gray-100">
          <h2 className="text-xl font-semibold mb-2">Órdenes</h2>

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
            {/* <tbody>
              {orders.map((platillo) => (
                <tr key={platillo.id} className="border-b border-gray-200">
                  <td className="px-1 py-3 text-sm text-gray-900">
                    {platillo.name}
                  </td>
                  <td className="px-1 py-3">
                    <span className="text-sm font-bold rounded-4xl p-1 px-2 bg-blue-200 text-blue-800">
                      {platillo.quantity}
                    </span>
                  </td>
                  <td className="px-1 py-3 text-sm text-gray-900">
                    ${platillo.priceUnitary.toFixed(2)}
                  </td>
                  <td className="px-1 py-3 text-sm text-blue-500 font-bold">
                    ${(platillo.quantity * platillo.priceUnitary).toFixed(2)}
                  </td>
                  <td className="text-right">
                    <button
                      className="text-indigo-500 hover:underline font-bold"
                      onClick={() => handleEditItem(platillo)}
                    >
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
                  {orders
                    .reduce(
                      (total, p) => total + p.quantity * p.priceUnitary,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </tbody> */}
          </table>

          <div className="flex justify-end">
            <Button onClick={() => setModalFinish(true)}>
              Finalizar orden
              <ArrowRightIcon size={22} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-gray-500">No hay órdenes agregadas.</p>
        </div>
      )}
    </>
  );
}
