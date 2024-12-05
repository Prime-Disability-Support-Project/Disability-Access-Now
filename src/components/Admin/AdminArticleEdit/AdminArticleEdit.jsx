import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AdminArticleEdit() {
  const history = useHistory();
  const dispatch = useDispatch();

  const specificArticle = useSelector(
    (store) => store.articles.specificArticle
  );

  const associatedFiles = useSelector((store) => store.files.associatedFiles);
  const allFiles = useSelector((store) => store.files.allFiles);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState(specificArticle?.title || "");
  const [body, setBody] = useState(specificArticle?.body || "");

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    const url = window.location.href;
    const articleId = url.split("/").pop();
    dispatch({
      type: "FETCH_SPECIFIC_ARTICLE",
      payload: articleId,
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: articleId });
    dispatch({ type: "FETCH_ALL_FILES" });
  }, []);

  useEffect(() => {
    if (specificArticle) {
      setTitle(specificArticle.title);
      setBody(specificArticle.body);
    }
  }, [specificArticle]);

  const handleSelection = (event) => {
    setSelectedFiles(event.target.value);
  };

  const handleSave = (articleId) => {
    const articleData = {
      articleId: articleId,
      title: title,
      body: body,
    };
    dispatch({ type: "EDIT_ARTICLE", payload: articleData });
    dispatch({ type: "RESET_SPECIFIC_ARTICLE" });
    history.push("/adminManageResources");
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_SPECIFIC_ARTICLE" });
    history.goBack();
  };

  const handleAssociated = (e) => {
    e.preventDefault();
    dispatch({
      type: "EDIT_ASSOCIATED",
      payload: { articleId: specificArticle.id, fileIds: selectedFiles },
    });
    dispatch({ type: "FETCH_ASSOCIATED_FILES", payload: specificArticle.id });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4, p: 4 }}>
      {/* Main Content (Editing the Article) */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component={"h1"} gutterBottom>
          Edit Article
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button onClick={() => handleSave(specificArticle.id)} variant="contained">
            Save Changes
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

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Current Associated Files:
          </Typography>
          <Box>
            {associatedFiles.map((file) => (
              <Chip key={file.id} label={file.filename} sx={{ marginRight: 1, marginBottom: 1 }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Choose New Files to Associate (these will replace the current associated files)
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="files-label">Choose Files</InputLabel>
            <Select
              labelId="files-label"
              multiple
              value={selectedFiles}
              onChange={handleSelection}
              input={<OutlinedInput label="Choose Files" />}
              sx={{ bgcolor: "background.paper" }}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const file = allFiles.find((f) => f.id === value);
                    return file ? <Chip key={value} label={file.filename} /> : null;
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

        <Button onClick={handleAssociated} variant="contained">
          Save Changes to Associated Files
        </Button>
      </Box>

      {/* Preview Section */}
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
