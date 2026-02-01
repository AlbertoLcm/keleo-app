import React, { type ReactNode } from 'react';

export type StatusBadgeColor = 'yellow' | 'green' | 'blue' | 'keleo' | 'orange' | 'red';

interface StatusBadgeProps {
  color: StatusBadgeColor;
  text: string | ReactNode;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ color, text }) => {
  const styles: Record<StatusBadgeColor, string> = {
    yellow:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    blue:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    keleo:
      "bg-keleo-100 dark:bg-keleo-900/30 text-keleo-700 dark:text-keleo-400 border-keleo-200 dark:border-keleo-800",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    red:
      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  };

  return (
    <div
      className={`w-fit flex items-center px-2 py-1 rounded-lg text-xs font-semibold border ${styles[color]}`}
    >
      {text}
    </div>
  );
};

export default StatusBadge;