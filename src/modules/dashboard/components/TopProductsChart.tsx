import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type ProductData = {
  name: string;
  value: number;
};

export default function TopProductsChart({ data }: { data: ProductData[] }) {
  return (
    <div className="w-full h-70 bg-white rounded-xl ring-1 ring-gray-200 p-4">
      <h2 className="text-lg mb-2 text-gray-700">Top productos</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#99A1AF" }}
            axisLine={false}
            tickLine={false} />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: "#99A1AF" }}
          />
          <Tooltip />
          <Bar dataKey="value" fill="#155DFC" radius={[100, 100, 100, 100]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
