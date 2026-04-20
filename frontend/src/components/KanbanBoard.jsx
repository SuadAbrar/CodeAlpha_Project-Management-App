import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Column from "./Column";
import TaskCard from "./TaskCard";
import TaskDetailModal from "./TaskDetailModal";
import { taskService } from "../services/taskService";

const KanbanBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await taskService.getTasksByProject(projectId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];

    if (!validStatuses.includes(newStatus)) return;

    // Find the task
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    const updatedTasks = tasks.map((t) =>
      t._id === taskId ? { ...t, status: newStatus } : t,
    );
    setTasks(updatedTasks);

    try {
      await taskService.moveTask(taskId, newStatus);
    } catch (error) {
      console.error("Error moving task:", error);
      // Revert on error
      setTasks(tasks);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Kanban Board
          </h1>
          <p className="text-gray-600">
            Drag and drop tasks to organize your workflow
          </p>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6 px-2">
            <Column id="TODO" title="To Do" tasks={getTasksByStatus("TODO")} onTaskClick={handleTaskClick} />
            <Column
              id="IN_PROGRESS"
              title="In Progress"
              tasks={getTasksByStatus("IN_PROGRESS")}
              onTaskClick={handleTaskClick}
            />
            <Column id="DONE" title="Done" tasks={getTasksByStatus("DONE")} onTaskClick={handleTaskClick} />
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskDetailModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={projectId}
      />
    </div>
  );
};

export default KanbanBoard;
