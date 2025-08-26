import { useState } from "react";

// Types
interface Mesa {
  id: number;
  ocupada: boolean;
}

interface CategoriaMenu {
  categoria: string;
  items: string[];
}

// Mock Data
const mesas: Mesa[] = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, ocupada: i % 3 === 0 }));
const menu: CategoriaMenu[] = [
  { categoria: "Carnitas", items: ["Tacos surtidos", "Torta de carnitas"] },
  { categoria: "Barbacoa", items: ["Tacos barbacoa", "Consomé chico"] },
  { categoria: "Bebidas", items: ["Refresco", "Café"] },
];

export default function RestauranteApp() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null);
  const [ordenes, setOrdenes] = useState<string[]>([]);
  const [menuAbierto, setMenuAbierto] = useState<boolean>(false);

  const agregarPlatillo = (platillo: string): void => {
    setOrdenes([...ordenes, platillo]);
    setMenuAbierto(false);
  };

  const total: number = ordenes.length * 40; // Mock precio base

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#333", color: "#fff", padding: "10px" }}>
        <h2>Restaurante POS</h2>
      </header>

      <main style={{ padding: "20px" }}>
        {!mesaSeleccionada ? (
          <>
            <h3>Selecciona una mesa</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "10px" }}>
              {mesas.map((mesa) => (
                <div
                  key={mesa.id}
                  onClick={() => setMesaSeleccionada(mesa.id)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: mesa.ocupada ? "#ffebee" : "#e8f5e9",
                  }}
                >
                  <h4>Mesa {mesa.id}</h4>
                  <p>{mesa.ocupada ? "Ocupada" : "Libre"}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setMesaSeleccionada(null)} style={{ marginBottom: "10px" }}>
              Volver a Mesas
            </button>

            <h3>Mesa #{mesaSeleccionada}</h3>

            <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", marginBottom: "20px" }}>
              <h4>Orden Actual</h4>
              {ordenes.length === 0 ? (
                <p>No hay órdenes aún</p>
              ) : (
                <ul>
                  {ordenes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              )}
              <p><strong>TOTAL:</strong> ${total}</p>
            </div>

            <button onClick={() => setMenuAbierto(true)} style={{ marginRight: "10px" }}>Agregar Platillo</button>
            <button>Generar Cuenta</button>

            {/* Dialog menú */}
            {menuAbierto && (
              <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
                  <h4>Menú</h4>
                  {menu.map((cat) => (
                    <div key={cat.categoria} style={{ marginBottom: "10px" }}>
                      <p><strong>{cat.categoria}</strong></p>
                      {cat.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => agregarPlatillo(item)}
                          style={{ display: "block", width: "100%", margin: "5px 0" }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                  <button onClick={() => setMenuAbierto(false)} style={{ marginTop: "10px" }}>Cerrar</button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
