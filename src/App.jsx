import { useState, useEffect } from 'react';
import Header from './components/Header';
import RequestForm from './components/RequestForm';
import QueueSummary from './components/QueueSummary';
import RequestList from './components/RequestList';
import { isRequest } from './queue';

export default function App() {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("helpdesk-requests") ?? "[]");
      return Array.isArray(saved) ? saved.filter(isRequest) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("All");
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("helpdesk-requests", JSON.stringify(requests));
      setStorageWarning("");
    } catch {
      setStorageWarning("Warning: Could not save requests to local storage.");
    }
  }, [requests]);

  const waitingCount = requests.filter(req => req.status === "Waiting").length;
  const resolvedCount = requests.filter(req => req.status === "Resolved").length;
  const totalCount = requests.length;

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `HelpDesk — ${waitingCount} waiting`;
    
    return () => {
      document.title = originalTitle;
    };
  }, [waitingCount]);

  const handleAddRequest = (newRequest) => {
    setRequests(previous => [...previous, newRequest]);
  };

  const handleResolve = (requestId) => {
    setRequests(previous =>
      previous.map(request =>
        request.id === requestId
          ? { ...request, status: "Resolved" }
          : request
      )
    );
  };

  const handleDelete = (requestId) => {
    setRequests(previous => previous.filter(req => req.id !== requestId));
  };

  return (
    <div className="app-container">
      <Header />
      {storageWarning && <div className="card" style={{ color: 'red' }}>{storageWarning}</div>}
      <RequestForm onAddRequest={handleAddRequest} />
      <QueueSummary 
        waitingCount={waitingCount} 
        resolvedCount={resolvedCount} 
        totalCount={totalCount} 
      />
      
      <div className="filters">
        <label htmlFor="filterSelect"><strong>Filter: </strong></label>
        <select id="filterSelect" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Waiting">Waiting</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <RequestList 
        requests={requests} 
        filter={filter} 
        onResolve={handleResolve} 
        onDelete={handleDelete} 
      />
    </div>
  );
}