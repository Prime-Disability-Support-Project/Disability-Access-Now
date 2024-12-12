import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFileHandler } from "../Blob/downloadFile";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";


// This, again, is a specific article named ILIKE "Forms You Should Start With"
// This article has no body, just associated articles that are displayed here as "forms you should start with"
export default function FormsYouShouldStartWith() {
  const dispatch = useDispatch();

  const associatedFiles = useSelector((store) => store.files.associatedFiles);

  useEffect(() => {
    axios
      .get("/api/articles/forms")
      .then((response) => {
        const articleData = response.data;
        dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleData.id });
      })
      .catch((error) => {
        console.log(
          "Error fetching Forms You Should Start With article:",
          error
        );
      });
  }, []);

  return (
    <Box component="main" id="content" tabIndex="-1" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        component={"h1"}
        gutterBottom
      >
        Forms You Should Start With
      </Typography>{" "}
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold" }}
          component={"h2"}
          gutterBottom
        >
          Just getting started? We recommend checking out these forms:
        </Typography>
        <List>
          {associatedFiles.length > 0 ? (
            associatedFiles.map((file) => {
              return (
                <ListItem
                  key={file.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary={file.filename} />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      onClick={() => downloadFileHandler(file.filename)}
                      variant="contained"
                    >
                      Download PDF
                    </Button>
                  </Box>
                </ListItem>
              );
            })
          ) : (
            <p>No Associated Files</p>
          )}
        </List>
      </Box>
    </Box>
  );
}
