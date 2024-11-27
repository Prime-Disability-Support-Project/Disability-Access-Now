import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminManageLogins() {
  const dispatch = useDispatch();
  const history = useHistory();

  // this store contains all users still pending approval
  const allPendingUsers = useSelector(
    (store) => store.userLogins.allPendingUsers
  );
  // this store contains all users that have been approved
  const allApprovedUsers = useSelector(
    (store) => store.userLogins.allApprovedUsers
  );

  // fetch all user information
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  const handleApprove = (userId) => {
    dispatch({type: "APPROVE_LOGIN", payload: userId})
  }

  return (
    <div>
      <h1>Manage Logins</h1>
      <h2>Pending Logins</h2>
      {allPendingUsers.map((user) => {
        return (
          <div>
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email Address: {user.email}</li>
            </ul>
            <button onClick={() => handleApprove(user.id)}>Approve</button>
          </div>
        );
      })}
      <h2>Approved Logins</h2>
      {allApprovedUsers.map((user) => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email Address: {user.email}</li>
            <li>Current Role: {user.role === 1 ? "User" : "Administrator"}</li>
          </ul>
        );
      })}
    </div>
  );
}
