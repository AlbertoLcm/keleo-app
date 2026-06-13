import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { DailySummary, BlindCount, CashRegisterDifferences } from "../types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    padding: 32,
    backgroundColor: "#ffffff",
    color: "#1a1a2e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: "1.5px solid #e2e8f0",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#7c3aed",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
  headerInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  reportTitle: {
    fontSize: 11,
    color: "#7c3aed",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  reportDate: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 3,
  },
  badge: {
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#7c3aed",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },

  // Section
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottom: "0.5px solid #e2e8f0",
  },

  // Summary metrics row
  metricsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    border: "0.5px solid #e2e8f0",
    borderRadius: 6,
    padding: 8,
  },
  metricLabel: {
    fontSize: 7,
    color: "#94a3b8",
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  metricValueSmall: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },

  // Table
  table: {
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottom: "0.5px solid #f1f5f9",
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#fafafa",
    borderBottom: "0.5px solid #f1f5f9",
  },
  colMethod: { flex: 2, fontSize: 8 },
  colAmount: { flex: 1, fontSize: 8, textAlign: "right" },
  colHeaderText: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
  },
  colText: { color: "#334155" },
  colTextBold: { color: "#0f172a", fontFamily: "Helvetica-Bold" },

  // Difference row colors
  positiveText: { color: "#16a34a", fontFamily: "Helvetica-Bold" },
  negativeText: { color: "#dc2626", fontFamily: "Helvetica-Bold" },
  neutralText: { color: "#64748b", fontFamily: "Helvetica-Bold" },

  // Total row
  totalRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    backgroundColor: "#f3e8ff",
    borderRadius: 4,
    marginTop: 4,
  },

  // Notes box
  notesBox: {
    backgroundColor: "#fffbeb",
    border: "0.5px solid #fcd34d",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
  },
  notesLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#92400e",
    marginBottom: 4,
    letterSpacing: 0.8,
  },
  notesText: {
    fontSize: 8,
    color: "#78350f",
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    marginTop: 20,
    paddingTop: 12,
    borderTop: "1px solid #e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    alignItems: "center",
    width: "40%",
  },
  signatureLine: {
    width: "100%",
    borderTop: "0.5px solid #334155",
    marginBottom: 4,
  },
  signatureLabel: {
    fontSize: 7,
    color: "#64748b",
    textAlign: "center",
  },
  footerNote: {
    fontSize: 7,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 12,
  },
});

interface ReporteZDocumentProps {
  summary: DailySummary;
  blindCount: BlindCount;
  differences: CashRegisterDifferences;
  cashierName?: string;
  notes?: string;
  showDifferences: boolean; // hidden for cashier, visible for admin/owner
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Efectivo",
  credit_card: "Tarjeta Crédito",
  debit_card: "Tarjeta Débito",
  bank_transfer: "Transferencia",
  complimentary: "Cortesía",
  other: "Otros",
};

const fmt = (val: number) => `$${val.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;
const fmtDiff = (val: number) => {
  const abs = Math.abs(val).toLocaleString("es-MX", { minimumFractionDigits: 2 });
  if (val > 0.01) return `+$${abs}`;
  if (val < -0.01) return `-$${abs}`;
  return "$0.00";
};

const paymentMethods = ["cash", "credit_card", "debit_card", "bank_transfer", "other"] as const;

export const ReporteZDocument = ({
  summary,
  blindCount,
  differences,
  cashierName,
  notes,
  showDifferences,
}: ReporteZDocumentProps) => {
  const sessionStartDate = new Date(summary.sessionStart);
  const sessionEndDate = new Date(summary.sessionEnd);
  const formatDate = (d: Date) =>
    d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
  const formatTime = (d: Date) =>
    d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

  const countedTotal =
    blindCount.cash +
    blindCount.credit_card +
    blindCount.debit_card +
    blindCount.bank_transfer +
    blindCount.other;

  return (
    <Document title={`Reporte Z — ${summary.restaurantName}`} author="Keleo POS">
      <Page size="A4" style={styles.page}>

        {/* ═══ HEADER ═══ */}
        <View style={styles.header}>
          {summary.restaurantLogo ? (
            <Image src={summary.restaurantLogo} style={styles.logo} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>{summary.restaurantName.charAt(0)}</Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.restaurantName}>{summary.restaurantName}</Text>
            <Text style={styles.reportTitle}>REPORTE Z — CIERRE DE CAJA</Text>
            <Text style={styles.reportDate}>
              {formatDate(sessionStartDate)} {formatTime(sessionStartDate)} — {formatTime(sessionEndDate)}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>OFICIAL</Text>
          </View>
        </View>

        {/* ═══ METRICS ═══ */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Cuentas Cerradas</Text>
            <Text style={styles.metricValue}>{summary.totalAccounts}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Canceladas</Text>
            <Text style={styles.metricValue}>{summary.totalCancelled}</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total del Sistema</Text>
            <Text style={[styles.metricValue, { color: "#7c3aed" }]}>{fmt(summary.systemTotals.total)}</Text>
          </View>
          {showDifferences && (
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Diferencia Total</Text>
              <Text style={[
                styles.metricValue,
                differences.total > 0.01 ? styles.positiveText :
                differences.total < -0.01 ? styles.negativeText :
                styles.neutralText
              ]}>
                {fmtDiff(differences.total)}
              </Text>
            </View>
          )}
        </View>

        {/* ═══ VENTAS POR MÉTODO DE PAGO ═══ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desglose por Método de Pago</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colMethod, styles.colHeaderText]}>Método</Text>
              <Text style={[styles.colAmount, styles.colHeaderText]}>Sistema</Text>
              <Text style={[styles.colAmount, styles.colHeaderText]}>Contado</Text>
              {showDifferences && (
                <Text style={[styles.colAmount, styles.colHeaderText]}>Diferencia</Text>
              )}
            </View>

            {paymentMethods.map((method, idx) => {
              const sysAmount = method === "bank_transfer"
                ? summary.systemTotals.bank_transfer
                : summary.systemTotals[method];
              const cntAmount = blindCount[method === "bank_transfer" ? "bank_transfer" : method];
              const diff = showDifferences ? (differences as any)[method] ?? 0 : 0;

              return (
                <View key={method} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={[styles.colMethod, styles.colText]}>{PAYMENT_LABELS[method]}</Text>
                  <Text style={[styles.colAmount, styles.colText]}>{fmt(sysAmount)}</Text>
                  <Text style={[styles.colAmount, styles.colText]}>{fmt(cntAmount)}</Text>
                  {showDifferences && (
                    <Text style={[
                      styles.colAmount,
                      diff > 0.01 ? styles.positiveText :
                      diff < -0.01 ? styles.negativeText :
                      styles.neutralText
                    ]}>
                      {fmtDiff(diff)}
                    </Text>
                  )}
                </View>
              );
            })}

            {/* Cortesía row (system only, no blind count) */}
            <View style={styles.tableRow}>
              <Text style={[styles.colMethod, styles.colText]}>{PAYMENT_LABELS.complimentary}</Text>
              <Text style={[styles.colAmount, styles.colText]}>{fmt(summary.systemTotals.complimentary)}</Text>
              <Text style={[styles.colAmount, { color: "#94a3b8", fontSize: 8 }]}>N/A</Text>
              {showDifferences && (
                <Text style={[styles.colAmount, { color: "#94a3b8", fontSize: 8 }]}>N/A</Text>
              )}
            </View>

            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={[styles.colMethod, styles.colTextBold, { fontSize: 9 }]}>TOTAL</Text>
              <Text style={[styles.colAmount, styles.colTextBold, { color: "#7c3aed", fontSize: 9 }]}>
                {fmt(summary.systemTotals.total)}
              </Text>
              <Text style={[styles.colAmount, styles.colTextBold, { fontSize: 9 }]}>
                {fmt(countedTotal)}
              </Text>
              {showDifferences && (
                <Text style={[
                  styles.colAmount,
                  { fontSize: 9 },
                  differences.total > 0.01 ? styles.positiveText :
                  differences.total < -0.01 ? styles.negativeText :
                  styles.neutralText
                ]}>
                  {fmtDiff(differences.total)}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* ═══ NOTAS / JUSTIFICACIÓN ═══ */}
        {notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observaciones y Justificación</Text>
            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>⚠ DIFERENCIA JUSTIFICADA</Text>
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          </View>
        )}

        {/* ═══ FOOTER / FIRMAS ═══ */}
        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Cajero(a)</Text>
            {cashierName && <Text style={[styles.signatureLabel, { marginTop: 2 }]}>{cashierName}</Text>}
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Supervisor / Administrador</Text>
          </View>
        </View>

        <Text style={styles.footerNote}>
          Generado por Keleo POS • {new Date().toLocaleString("es-MX")} • Este documento es un comprobante oficial de cierre de turno.
        </Text>

      </Page>
    </Document>
  );
};
