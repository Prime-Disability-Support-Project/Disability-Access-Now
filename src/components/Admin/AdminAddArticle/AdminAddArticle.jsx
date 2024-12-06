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

  const magicTitle = () => {
    setTitle("SSI vs. SSDI: The Differences, Benefits, and How to Apply");
  };

  const magicMarkdown = () => {
    setBody(`# SSI vs. SSDI: The Differences, Benefits, and How to Apply
=========================================================

## What Is Supplemental Security Income (SSI)?
-------------------------------------------

SSI provides minimum basic financial assistance to older adults and persons with disabilities (regardless of age) with very limited income and resources. Federal SSI benefits from the Social Security Administration are often supplemented by state programs.

## What Is Social Security Disability Insurance (SSDI)?
----------------------------------------------------

SSDI supports individuals who are disabled and have a qualifying work history, either through their own employment or a family member (spouse/parent).

## What Is the difference between SSI and SSDI?
--------------------------------------------

The major difference is that SSI determination is based on age/disability and limited income and resources, whereas SSDI determination is based on disability and work credits.

In addition, in most states, an SSI recipient will automatically qualify for health care coverage through Medicaid. A person with SSDI will automatically qualify for Medicare after 24 months of receiving disability payments (individuals with amyotrophic lateral sclerosis [ALS] are eligible for Medicare immediately).

## Can I receive both SSI and SSDI?

Yes, it is possible that if you have both limited income/resources and a work history, you can qualify for both benefits.

## How do I apply for SSI or SSDI?

You can apply for SSI online only if you are an adult with a disability. SSI applications are not available online for people applying for a child under age 18 with a disability or a non-disabled senior aged 65+.

You can apply for SSDI benefits online at any age. You also can apply by calling Social Security at the number above or at your local office.`);
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
          <Typography variant="h6" gutterBottom onClick={magicTitle}>
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
          <Typography variant="h6" gutterBottom onClick={magicMarkdown}>
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
