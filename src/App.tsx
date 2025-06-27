import { Input } from "./components/ui/input";
import { useArray } from "./hooks/useArray";
import type { Task } from "./types/task";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/appSidebar";

/**
 * Task
 * (none) -> (suggested) -> (doing) -> (completed)
 */

function App() {
  const [localTasks, setLocalTasks] = useLocalStorage<Task[]>("tasks", []);
  const [tasks, { push, update }] = useArray([localTasks, setLocalTasks]);
  return (
    <SidebarProvider>
      <SidebarInset>
        <main className="h-screen flex flex-col p-4 w-full">
          <SidebarTrigger className="-mr-1 ml-auto rotate-180" />
          <form
            action={(form) => {
              const input = String(form.get("input"));
              push({
                id: window.crypto.randomUUID(),
                name: input,
                createdAt: new Date(),
              });
            }}
            className="h-full items-center justify-center flex"
          >
            <Input
              name="input"
              placeholder="write down your tasks"
              className="w-1/3"
            />
          </form>
        </main>
      </SidebarInset>
      <AppSidebar tasks={tasks} update={update} />
    </SidebarProvider>
  );
}

export default App;
