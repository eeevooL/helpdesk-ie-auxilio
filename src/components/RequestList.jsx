import RequestCard from './RequestCard';
import { sortRequests } from '../queue';

export default function RequestList({ requests, filter, onResolve, onDelete }) {
  const filteredRequests = requests.filter(req => {
    if (filter === "All") return true;
    return req.status === filter;
  });

  const sortedRequests = sortRequests(filteredRequests);

  return (
    <div className="request-list">
      {sortedRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        sortedRequests.map(req => (
          <RequestCard
            key={req.id}
            request={req}
            onResolve={onResolve}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}