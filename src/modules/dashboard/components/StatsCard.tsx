type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
};

export default function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-xl ring-1 ring-gray-200">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
    </div>
  );
}
