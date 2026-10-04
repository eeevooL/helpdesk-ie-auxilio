export default function QueueSummary({ waitingCount, resolvedCount, totalCount }) {
  return (
    <div className="card summary">
      <div><strong>Waiting:</strong> {waitingCount}</div>
      <div><strong>Resolved:</strong> {resolvedCount}</div>
      <div><strong>Total:</strong> {totalCount}</div>
    </div>
  );
}