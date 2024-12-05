import axios from "axios";
import { useEffect, useState } from "react";

export default function PendingApproval() {
  const [pending, setPending] = useState();

  useEffect(() => {
    axios
      .get("/api/pending")
      .then((response) => {
        const pendingResponse = response.data;
        setPending(pendingResponse[0]);
      })
      .catch((error) => {
        console.log("Error fetching Pending:", error);
      });
  }, []);

  if (!pending) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>Registration Pending Approval</h1>
      <p>{pending.body}</p>
      <p>Thank you for your patience!</p>
      <p>
        Questions? Please contact us at{" "}
        <a href={`mailto:` + pending.email}>{pending.email}</a>
      </p>
    </main>
  );
}
