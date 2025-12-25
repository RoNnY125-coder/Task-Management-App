import { useState } from 'react';
import { Task, Status } from '@/types/task';
import { useTasks } from '@/contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { statusConfig } from './StatusBadge';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: Status;
  onEditTask: (task: Task) => void;
  onAddTask: (status: Status) => void;
}

export function KanbanColumn({ status, onEditTask, onAddTask }: KanbanColumnProps) {
  const { getTasksByStatus, moveTask } = useTasks();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const tasks = getTasksByStatus(status);
  const config = statusConfig[status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, status);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  return (
    <div 
      className={cn(
        "flex flex-col min-w-[300px] max-w-[350px] rounded-2xl bg-muted/30 border border-border/50",
        "transition-all duration-200",
        isDragOver && "border-primary/50 bg-primary/5"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2.5 h-2.5 rounded-full",
            status === 'todo' && "bg-status-todo",
            status === 'in-progress' && "bg-status-progress",
            status === 'review' && "bg-status-review",
            status === 'done' && "bg-status-done"
          )} />
          <h3 className="font-semibold text-foreground">{config.label}</h3>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask(status)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Tasks List */}
      <div className="flex-1 p-2 pt-0 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-thin">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">No tasks yet</p>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onAddTask(status)}
            >
              Add a task
            </Button>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <TaskCard task={task} onEdit={onEditTask} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
