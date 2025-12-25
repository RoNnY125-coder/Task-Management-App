import { KanbanBoard } from '@/components/board/KanbanBoard';
import { TaskProvider } from '@/contexts/TaskContext';

const Board = () => {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
};

export default Board;
