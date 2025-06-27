import type { Task } from "@/types/task";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { CircleCheckIcon, CircleIcon } from "lucide-react";
import { humanize } from "@/lib/humanize";

export function TaskCard({
  completedAt,
  createdAt,
  name,
  onToggle,
}: Task & { onToggle: () => void }) {
  return (
    <Card className="relative">
      <span
        className="absolute top-4 right-3 cursor-pointer"
        role="button"
        onClick={onToggle}
      >
        {completedAt ? (
          <CircleCheckIcon className="size-5" />
        ) : (
          <CircleIcon className="size-5" />
        )}
      </span>
      <CardContent>
        <h4
          className={cn({
            "text-lg font-semibold": !completedAt,
            "text-muted-foreground": completedAt,
          })}
        >
          {name}
        </h4>
        {!completedAt && (
          <p className="text-sm text-muted-foreground">{humanize(createdAt)}</p>
        )}
      </CardContent>
    </Card>
  );
}
