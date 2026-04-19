import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case "TODO":
        return "border-l-blue-400";
      case "IN_PROGRESS":
        return "border-l-amber-400";
      case "DONE":
        return "border-l-green-400";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${getStatusBorderColor(
        task.status,
      )} border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-grab active:cursor-grabbing group`}
    >
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}
      {task.assignedTo && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-7 h-7 bg-linear-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {task.assignedTo.name.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm text-gray-700 font-medium">
              {task.assignedTo.name}
            </span>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            {task.status.replace("_", " ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
