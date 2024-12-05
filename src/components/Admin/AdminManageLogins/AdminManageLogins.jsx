import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";

export default function AdminManageLogins() {
  const dispatch = useDispatch();
  const allPendingUsers = useSelector(
    (store) => store.userLogins.allPendingUsers
  );
  const allApprovedUsers = useSelector(
    (store) => store.userLogins.allApprovedUsers
  );

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [dispatch]);

  const handleApprove = (userId, email) => {
    const data = { id: userId, email: email };
    dispatch({ type: "APPROVE_LOGIN", payload: data });
  };

  const handleAdmin = (userId) => {
    dispatch({ type: "ADMIN_TOGGLE", payload: userId });
  };

  const handleRemove = (userId) => {
    dispatch({ type: "REMOVE_USER", payload: userId });
  };

  return (
    <Box component={"main"} sx={{ padding: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Manage Logins
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Pending Logins
          </Typography>
          {allPendingUsers.map((user) => (
            <Card key={user.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography component="p">
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography component="p">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    onClick={() => handleApprove(user.id, user.email)}
                    variant="contained"
                    sx={{ marginRight: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleRemove(user.id)}
                    variant="outlined"
                    color="error"
                  >
                    Remove User
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Approved Logins
          </Typography>
          {allApprovedUsers.map((user) => (
            <Card key={user.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography component="p">
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography component="p">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography component="p">
                  <strong>Access Level:</strong>{" "}
                  {user.role === 1 ? "User" : "Administrator"}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    onClick={() => handleAdmin(user.id)}
                    variant={user.role === 1 ? "contained" : "outlined"}
                    sx={{ marginRight: 1 }}
                  >
                    {user.role === 1
                      ? "Grant Admin Privileges"
                      : "Revoke Admin Privileges"}
                  </Button>
                  <Button
                    onClick={() => handleRemove(user.id)}
                    variant="outlined"
                    color="error"
                  >
                    Remove User
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
