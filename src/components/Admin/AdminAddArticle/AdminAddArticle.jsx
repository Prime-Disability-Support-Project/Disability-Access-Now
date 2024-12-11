import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminAddArticle() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const allFiles = useSelector((store) => store.files.allFiles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
  }, [dispatch]);

  const handleSelection = (event) => {
    setSelectedFiles(event.target.value);
  };

  const handleSave = () => {
    const articleData = {
      title,
      body,
      fileIds: selectedFiles,
    };
    dispatch({ type: "ADD_ARTICLE", payload: articleData });
    history.push("/adminManageResources");
  };

  const handleCancel = () => {
    history.goBack();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 2,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component={"h1"} gutterBottom>
          Add New Article
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button onClick={handleSave} variant="contained">
            Save New Article
          </Button>
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Title (name of the article):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            placeholder="Enter the article title"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Body (use markdown):
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={20}
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            variant="outlined"
            placeholder="Enter the article body in Markdown format"
            sx={{ bgcolor: "background.paper" }}
          />
        </Box>
        <FormControl fullWidth sx={{ zIndex: 1 }}>
          <InputLabel id="files-label">Choose Files</InputLabel>
          <Select
            labelId="files-label"
            multiple
            value={selectedFiles}
            onChange={handleSelection}
            input={<OutlinedInput label="Choose Files" />}
            MenuProps={MenuProps}
            sx={{ bgcolor: "background.paper" }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  const file = allFiles.find((file) => file.id === value);
                  return file ? (
                    <Chip key={value} label={file.filename} />
                  ) : null;
                })}
              </Box>
            )}
          >
            {allFiles.map((file) => (
              <MenuItem key={file.id} value={file.id}>
                {file.filename}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Preview of the Article Body:
        </Typography>
        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
      </Box>
    </Box>
  );
}
