export default function RequestCard({ request, onResolve, onDelete }) {
  return (
    <div className="card request-card">
      <div>
        <h3>{request.studentName} <span className={`priority-badge ${request.priority.toLowerCase()}`}>{request.priority}</span></h3>
        <p>{request.concern}</p>
        <small>Status: {request.status}</small>
      </div>
      <div className="request-actions">
        {request.status === "Waiting" && (
          <button className="success" onClick={() => onResolve(request.id)}>Resolve</button>
        )}
        <button className="danger" onClick={() => onDelete(request.id)}>Delete</button>
      </div>
    </div>
  );
}