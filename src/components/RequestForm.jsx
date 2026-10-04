import { useState, useRef, useEffect } from 'react';

export default function RequestForm({ onAddRequest }) {
  
  const [studentName, setStudentName] = useState("");
  const [concern, setConcern] = useState("");
  const [priority, setPriority] = useState("Normal"); 
  
  const nameInputRef = useRef(null);
  const concernInputRef = useRef(null);

  useEffect(() => {~
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    
    event.preventDefault();
    
    const trimmedName = studentName.trim();
    const trimmedConcern = concern.trim();
    
    if (!trimmedName) {
      nameInputRef.current?.focus();
      return;
    }
    if (!trimmedConcern) {
      concernInputRef.current?.focus();
      return;
    }

    const newRequest = {
      id: crypto.randomUUID(),
      studentName: trimmedName,
      concern: trimmedConcern,
      priority,
      status: "Waiting",
      createdAt: Date.now() 
    };

    onAddRequest(newRequest);

    setStudentName("");
    setConcern("");
    setPriority("Normal");
    nameInputRef.current?.focus();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Request Assistance</h2>
      <div className="form-group">
        <label htmlFor="studentName">Name</label>
        <input
          id="studentName"
          ref={nameInputRef}
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="concern">Concern</label>
        <textarea
          id="concern"
          ref={concernInputRef}
          value={concern}
          onChange={e => setConcern(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
}