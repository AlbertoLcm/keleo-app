import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area } from "recharts";

type SalesData = {
  date: string;
  sales: number;
};

interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="w-full h-70 bg-white rounded-xl ring-1 ring-gray-200 p-4">
      <h2 className="text-lg mb-2 text-gray-700">Ventas diarias</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 10, right: 5, left: -30, bottom: 0 }}>
          {/* 🔹 Definición del gradiente */}
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#155DFC" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#155DFC" stopOpacity={1}/>
            </linearGradient>
          </defs>
  
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#99A1AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#99A1AF" }}
            axisLine={false}
            tickLine={false}
          />
  
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              borderColor: "#FFF",
            }}
          />
  
          {/* 🔹 Línea principal */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#155DFC"
            strokeWidth={2}
            dot={{ r: 3, fill: "#155DFC" }}
            activeDot={{ r: 6 }}
          />
  
          {/* 🔹 Área degradada */}
          <Area
            type="monotone"
            dataKey="sales"
            stroke="none"
            fill="url(#colorSales)"
            fillOpacity={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  
}
