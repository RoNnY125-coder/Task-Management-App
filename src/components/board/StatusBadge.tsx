import { Status, Priority } from '@/types/task';
import { cn } from '@/lib/utils';

export const statusConfig: Record<Status, { label: string; color: string; bgClass: string }> = {
  'todo': { 
    label: 'To Do', 
    color: 'text-status-todo',
    bgClass: 'bg-status-todo/10 border-status-todo/20'
  },
  'in-progress': { 
    label: 'In Progress', 
    color: 'text-status-progress',
    bgClass: 'bg-status-progress/10 border-status-progress/20'
  },
  'review': { 
    label: 'Review', 
    color: 'text-status-review',
    bgClass: 'bg-status-review/10 border-status-review/20'
  },
  'done': { 
    label: 'Done', 
    color: 'text-status-done',
    bgClass: 'bg-status-done/10 border-status-done/20'
  },
};

export const priorityConfig: Record<Priority, { label: string; color: string; bgClass: string }> = {
  'low': { 
    label: 'Low', 
    color: 'text-priority-low',
    bgClass: 'bg-priority-low/10 border-priority-low/30'
  },
  'medium': { 
    label: 'Medium', 
    color: 'text-priority-medium',
    bgClass: 'bg-priority-medium/10 border-priority-medium/30'
  },
  'high': { 
    label: 'High', 
    color: 'text-priority-high',
    bgClass: 'bg-priority-high/10 border-priority-high/30'
  },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
      config.bgClass,
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority, className }: { priority: Priority; className?: string }) {
  const config = priorityConfig[priority];
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
      config.bgClass,
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}
