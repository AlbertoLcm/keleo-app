import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Platillo } from "../types";

export function generarTicketPDF(
  orden: Platillo[],
  restaurante: string,
  nombreArchivo: string
) {
  const doc = new jsPDF();

  const now = new Date();
  const año = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, "0");
  const dia = String(now.getDate()).padStart(2, "0");
  const horas = String(now.getHours()).padStart(2, "0");
  const minutos = String(now.getMinutes()).padStart(2, "0");

  const fechaTexto = `${año}-${mes}-${dia} ${horas}-${minutos}`;

  // Encabezado dinámico
  doc.setFontSize(14);
  doc.text(restaurante, 10, 10);
  doc.setFontSize(10);
  doc.text("Ticket de consumo", 10, 16);
  doc.text(`Fecha: ${now.toLocaleDateString()}`, 10, 22);

  // Tabla con pedidos
  autoTable(doc, {
    head: [["Platillo", "Cantidad", "Precio", "Total"]],
    body: orden.map(item => [
      item.name,
      item.quantity.toString(),
      `$${item.priceUnitary.toFixed(2)}`,
      `$${(item.priceUnitary * item.quantity).toFixed(2)}`
    ]),
    startY: 28,
    theme: "striped",
    styles: { fontSize: 10 },
  });

  // Calcular total
  const total: number = orden.reduce(
    (acc, item) => acc + item.priceUnitary * item.quantity,
    0
  );

  const finalY = (doc as any).lastAutoTable.finalY || 28;

  // Total y mensaje de cierre
  doc.text(`TOTAL: $${total.toFixed(2)}`, 10, finalY + 10);

  doc.setFontSize(9);
  doc.text("¡Gracias por su compra!", 10, finalY + 20);

  // Guardar PDF con nombre dinámico
  doc.save(`${nombreArchivo} ${fechaTexto}.pdf`);
}
