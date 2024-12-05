import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';

export default function AdminManageLogins() {
  const dispatch = useDispatch();

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

  const handleApprove = (userId, email) => {
    const data = {id: userId, email: email}
    dispatch({ type: "APPROVE_LOGIN", payload: data });
  };

  const handleAdmin = (userId) => {
    dispatch({ type: "ADMIN_TOGGLE", payload: userId });
  };

  const handleRemove = (userId) => {
    dispatch({ type: "REMOVE_USER", payload: userId });
  };

  return (
    <div>
      <h1>Manage Logins</h1>
      <h2>Pending Logins</h2>
      {allPendingUsers.map((user) => {
        return (
          <ul key={user.id}>
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email Address:</strong> {user.email}
            </li>
            <Button onClick={() => handleApprove(user.id, user.email)} variant="contained">Approve</Button>
            <Button onClick={() => handleRemove(user.id)} variant="outlined">Remove User</Button>
          </ul>
        );
      })}
      <h2>Approved Logins</h2>
      {allApprovedUsers.map((user) => {
        return (
          <ul key={user.id}>
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email Address:</strong> {user.email}
            </li>
            <li>
              <strong>Access Level:</strong>{" "}
              {user.role === 1 ? "User" : "Administrator"}
            </li>
            {user.role === 1 ? (
              <Button onClick={() => handleAdmin(user.id)} variant="contained">
                Grant Admin Privileges
              </Button>
            ) : (
              <Button onClick={() => handleAdmin(user.id)} variant="outlined">
                Revoke Admin Privileges
              </Button>
            )}
            <Button onClick={() => handleRemove(user.id)} variant="text">Remove User</Button>
          </ul>
        );
      })}
    </div>
  );
}
