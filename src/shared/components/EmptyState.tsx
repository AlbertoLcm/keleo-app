import type { ReactNode } from "react";
import { Button } from "@/shared";
import { PlusIcon } from "@phosphor-icons/react";

type EmptyStateProps = {
  title: string;
  description: string;
  /** Ícono a mostrar (por ejemplo: <ShrimpIcon size={80} />) */
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  icon,
  actionLabel = "Crear el primero",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="text-center text-gray-500 text-lg flex flex-col items-center">
      {icon && <div className="mb-2 text-gray-500">{icon}</div>}
      <p className="mb-2 text-gray-800 font-medium">{title}</p>
      <span className="mb-8 text-gray-500">{description}</span>

      {onAction && (
        <Button onClick={onAction}>
          <PlusIcon size={20} /> {actionLabel}
        </Button>
      )}
    </div>
  );
}
