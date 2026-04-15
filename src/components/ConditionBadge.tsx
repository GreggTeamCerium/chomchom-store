import { Condition } from "@/lib/types";
import { clsx } from "clsx";

const conditionStyles: Record<Condition, string> = {
  NWT: "bg-emerald-100 text-emerald-800 border-emerald-200",
  NWOT: "bg-blue-100 text-blue-800 border-blue-200",
  "Like New": "bg-purple-100 text-purple-800 border-purple-200",
  "Gently Used": "bg-amber-100 text-amber-800 border-amber-200",
};

const conditionLabels: Record<Condition, string> = {
  NWT: "New With Tags",
  NWOT: "New Without Tags",
  "Like New": "Like New",
  "Gently Used": "Gently Used",
};

interface ConditionBadgeProps {
  condition: Condition;
  size?: "sm" | "md";
  showFull?: boolean;
}

export default function ConditionBadge({
  condition,
  size = "sm",
  showFull = false,
}: ConditionBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border font-medium",
        conditionStyles[condition],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {showFull ? conditionLabels[condition] : condition}
    </span>
  );
}
