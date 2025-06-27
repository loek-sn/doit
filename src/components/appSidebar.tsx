import type { Task } from "@/types/task";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { randomEntry } from "@/lib/utils";
import { TaskCard } from "./taskCard";
import { Separator } from "./ui/separator";

type Props = {
  tasks: Task[];
  update: (index: number, task: Task) => void;
};

export function AppSidebar({ tasks, update }: Props) {
  const randomTask = randomEntry(tasks.filter((task) => !task.completedAt));
  const handleToggle = (task: Task) => {
    const index = tasks.findIndex((t) => t.id === task.id);
    return () => {
      if (!task.completedAt) {
        update(index, { ...task, completedAt: new Date() });
      } else {
        update(index, { ...task, completedAt: undefined });
      }
    };
  };
  return (
    <Sidebar side="right" variant="floating">
      <SidebarHeader>
        <h3 className="text-lg font-semibold">Tasks</h3>
        {randomTask && (
          <TaskCard {...randomTask} onToggle={handleToggle(randomTask)} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <Separator />
        {!tasks.length ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No tasks added</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-2">
            {tasks
              .filter((task) => task.id !== randomTask?.id)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onToggle={handleToggle(task)}
                />
              ))}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
