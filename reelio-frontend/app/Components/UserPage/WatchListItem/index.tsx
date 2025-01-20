
interface WatchlistItem {
  id: string;
  title: string;
  status: string;
  rating: number;
  review: string;
}

interface WatchlistItemCardProps {
  item: WatchlistItem;
  onEdit: (item: WatchlistItem) => void;
  onDelete: (item: WatchlistItem) => void;
  expanded: boolean;
  onToggleExpand: () => void;
}

const WatchlistItemCard = ({ item, onEdit, onDelete, expanded, onToggleExpand }: WatchlistItemCardProps) => {
    return (
      <li
        key={item.id}
        onClick={onToggleExpand}
        className="cursor-pointer bg-gray-200 p-4 rounded shadow-sm"
      >
        <div className="flex items-center">
          <div className="ml-4">
            <h4 className="text-lg font-bold">{item.title}</h4>
            <p>{item.status === "watched" ? "Watched" : "Plan to watch"}</p>
          </div>
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering expansion
              onEdit(item);
            }}
          >
            Edit
          </button>
          <button
            className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click from triggering expansion
              onDelete(item);
            }}
          >
            Delete
          </button>
        </div>
  
        {expanded && (
          <div className="mt-4">
            <p>
              <strong>Rating:</strong> {item.rating}
            </p>
            <p>
              <strong>Review:</strong> {item.review}
            </p>
          </div>
        )}
      </li>
    );
  };

  export default WatchlistItemCard;