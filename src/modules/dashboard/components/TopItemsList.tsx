import type { DashboardStats } from "../services/dashboard.service";

interface TopItemsListProps {
  items: DashboardStats["topItems"];
}

const TopItemsList: React.FC<TopItemsListProps> = ({ items }) => (
  <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 h-full">
    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Más Vendidos Hoy</h3>
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-4">
          No hay ventas registradas hoy
        </div>
      ) : (
        items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl transition cursor-pointer group"
          >
            <div
              className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 bg-cover bg-center shadow-sm"
              style={{
                backgroundImage: `url('${item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200"}')`,
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-keleo-600 transition line-clamp-1">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{item.count} unidades</p>
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-white">
              ${item.revenue.toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TopItemsList;
