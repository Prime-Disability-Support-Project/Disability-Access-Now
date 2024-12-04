import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
            <button onClick={() => handleApprove(user.id, user.email)}>Approve</button>
            <button onClick={() => handleRemove(user.id)}>Remove User</button>
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
              <button onClick={() => handleAdmin(user.id)}>
                Grant Admin Privileges
              </button>
            ) : (
              <button onClick={() => handleAdmin(user.id)}>
                Revoke Admin Privileges
              </button>
            )}
            <button onClick={() => handleRemove(user.id)}>Remove User</button>
          </ul>
        );
      })}
    </div>
  );
}
