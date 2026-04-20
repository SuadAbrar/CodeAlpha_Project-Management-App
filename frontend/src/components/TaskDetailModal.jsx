import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, Send, User } from "lucide-react";
import { commentService } from "../services/commentService";

const TaskDetailModal = ({ task, isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!task) return;
    try {
      setLoading(true);
      const fetchedComments = await commentService.getCommentsByTask(task._id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [task]);

  useEffect(() => {
    if (isOpen && task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchComments();
    }
  }, [isOpen, task, fetchComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const comment = await commentService.createComment(
        task._id,
        newComment.trim(),
      );
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {task.title}
            </h2>
            {task.description && (
              <p className="text-gray-600">{task.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === "TODO"
                    ? "bg-blue-100 text-blue-800"
                    : task.status === "IN_PROGRESS"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {task.status.replace("_", " ")}
              </span>
              {task.assignedTo && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {task.assignedTo.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {task.assignedTo.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="flex flex-col h-96">
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
              <span className="ml-2 text-sm text-gray-500">
                ({comments.length})
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                      {comment.userId?.name ? (
                        <span className="text-sm font-medium text-gray-700">
                          {comment.userId.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <User className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {comment.userId?.name || "Unknown User"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSubmitComment} className="flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{submitting ? "Posting..." : "Post"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
