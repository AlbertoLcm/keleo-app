import type { DashboardStats } from "../services/dashboard.service";

interface SalesChartProps {
  chartData: DashboardStats["chartData"];
}

const SalesChart: React.FC<SalesChartProps> = ({ chartData }) => (
  <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 flex flex-col">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-bold text-gray-800 dark:text-white">Rendimiento de Ventas</h2>
      <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-gray-300 outline-none focus:ring-1 focus:ring-keleo-500">
        <option>Hoy</option>
        <option>Esta Semana</option>
      </select>
    </div>

    <div className="flex-grow flex items-end justify-between gap-2 md:gap-4 h-48 px-2">
      {chartData.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2 w-full group">
          <div className="w-full bg-keleo-100 dark:bg-keleo-900/20 rounded-t-md relative h-32 flex items-end justify-center group-hover:bg-keleo-200 dark:group-hover:bg-keleo-900/40 transition-all cursor-pointer">
            <div
              className="w-full bg-keleo-500 rounded-t-md bar-animate relative"
              style={{ height: `${item.value}%` }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition z-10 whitespace-nowrap">
                {item.amount}
              </div>
            </div>
          </div>
          <span className="text-[10px] text-gray-400">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SalesChart;
