import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "./AdminAddArticle.css";

import { Button, Modal, Box, Typography } from "@mui/material";  // Material UI Modal and Button


export default function AdminAddArticle() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // State for modal visibility

  const [title, setTitle] = useState();
  // const [subtitle, setSubtitle] = useState();
  const [body, setBody] = useState();

  const allFiles = useSelector((store) => store.files.allFiles);

  const [selectedFiles, setSelectedFiles] = useState();

  const handleSelection = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedFiles(selectedValues);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_FILES" });
  }, [dispatch]);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  // const handleSubtitle = (event) => {
  //   setSubtitle(event.target.value);
  // };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSave = () => {
    const articleData = {
      title: title,
      // subtitle: null,
      body: body,
      fileIds: selectedFiles,
    };
    dispatch({ type: "ADD_ARTICLE", payload: articleData });
    history.push("/adminManageResources");
  };

  // resets the store after they leave the page
  const handleCancel = () => {
    history.goBack();
  };


// Open modal
const handleOpen = () => setOpen(true);
  
// Close modal
const handleClose = () => setOpen(false);


  return (
    <div className="container">
      <div className="inputForm">
        <form>
          
          <Button variant= "contained" color="primary" type="submit" onClick={handleSave}>
            Save New Article
          </Button>
          <Button type="button" onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
          <div>
            <label htmlFor="title">Title:</label>
            <textarea
              rows="2"
              cols="75"
              type="text"
              name="title"
              value={title}
              onChange={handleTitle}
            />
          </div>
          {/* <div>
            <label htmlFor="subtitle">Subtitle:</label>
            <textarea
              rows="2"
              cols="75"
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={handleSubtitle}
            />
          </div> */}
          <div>
            <label htmlFor="body">Body {`(markdown)`}:</label>
            <textarea
              rows="20"
              cols="75"
              type="text"
              name="body"
              value={body}
              onChange={handleBody}
            />
          </div>
        </form>
        <form>
          <label htmlFor="files">
            Choose files to associate with this article:
          </label>
          <select
            onChange={handleSelection}
            name="files"
            id="files"
            multiple={true}
          >
            {allFiles.map((file) => {
              return <option value={file.id}>{file.filename}</option>;
            })}
          </select>
        </form>
        {/* Button to trigger the modal */}
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Preview Article
        </Button>

        <h3 className="note">
          Note for my devs - use command click to select multiple options and
          also to unselect options. We can swap this out with an npm package if
          we want it to look nice 😺
        </h3>
      </div>
      <div className="preview">
        <h1>Preview of the Article Body:</h1>
        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
      </div>
    

     {/* Modal Component */}
     <Modal
     open={open}
     onClose={handleClose} // Close modal when clicked outside
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
     <Box sx={{ ...style }}>
       <Typography id="modal-modal-title" variant="h6" component="h2">
         Article Preview
       </Typography>
       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         <h2>{title}</h2>
         <h3>{subtitle}</h3>
         <div>
           <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
         </div>
       </Typography>
       <Button onClick={handleClose} variant="contained" color="secondary">
         Close Preview
       </Button>
     </Box>
   </Modal>
 </div>

  );
}
// Modal style
const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
p: 4,
};



