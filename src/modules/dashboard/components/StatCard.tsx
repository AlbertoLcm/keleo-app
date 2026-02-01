import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | ReactNode;
  icon: ReactNode;
  color: string;
  trend?: string;
  trendUp?: boolean;
  progress?: number;
  customContent?: ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  trendUp,
  progress,
  customContent,
}) => {
  const colorMap = {
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600",
      bar: "bg-green-500",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600",
      bar: "bg-orange-500",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-500",
      bar: "bg-red-500",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-500",
      bar: "bg-blue-500",
    },
  };

  const theme = colorMap[(color as keyof typeof colorMap) || 'green'] || colorMap.green;

  return (
    <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white/50 dark:border-white/5 flex flex-col justify-between h-32 hover:shadow-lg hover:shadow-keleo-500/5 transition duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
        <div className={`p-2 ${theme.bg} ${theme.text} rounded-xl shadow-sm`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trendUp ? "text-green-500" : "text-red-500"
          }`}
        >
          <i className={`fas fa-arrow-${trendUp ? "up" : "down"}`}></i> {trend}
        </div>
      )}
      {progress !== undefined && (
        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`${theme.bar} h-1.5 rounded-full`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {customContent}
    </div>
  );
};

export default StatCard;
