export function sortRequests(requests) {
    return [...requests].sort((a,b) => {
        if(a.priority !== b.priority) {
            return a.priority === "High" ? -1 : 1;
        }
        return a.createdAt - b.createdAt;
    });
}

export function isRequest(req) {
    return (
    req &&
    typeof req.id === "string" &&
    typeof req.studentName === "string" &&
    typeof req.concern === "string" &&
    (req.priority === "High" || req.priority === "Normal") &&
    (req.status === "Waiting" || req.status === "Resolved") &&
    typeof req.createdAt === "number"
  );
}