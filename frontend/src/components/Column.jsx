import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ id, title, tasks, className = "", onTaskClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const getColumnHeaderColor = (title) => {
    switch (title) {
      case "To Do":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      case "In Progress":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      case "Done":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  return (
    <div className={`flex flex-col w-80 ${className}`}>
      <div
        className={`${getColumnHeaderColor(title)} p-4 rounded-t-xl shadow-sm`}
      >
        <h2 className="font-bold text-lg flex items-center justify-between">
          {title}
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {tasks.length}
          </span>
        </h2>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-96 p-4 bg-linear-to-b from-gray-50 to-white border-x border-b border-gray-200 rounded-b-xl shadow-sm ${
          isOver
            ? "bg-linear-to-b from-indigo-50 to-blue-50 border-indigo-300 shadow-indigo-100"
            : ""
        } transition-all duration-200`}
      >
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium">No tasks yet</p>
              <p className="text-xs text-gray-300 mt-1">
                Drop tasks here to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onClick={onTaskClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
