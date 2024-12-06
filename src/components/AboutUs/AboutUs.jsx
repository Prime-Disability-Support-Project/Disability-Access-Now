import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import Markdown from "react-markdown";
import "./AboutUs.css";

export default function AboutUs() {
  const [aboutUs, setAboutUs] = useState();
  const [studentBios, setStudentBios] = useState([]);
  const [founderBio, setFounderBio] = useState([]);

  useEffect(() => {
    axios
      .get("/api/about")
      .then((response) => {
        const aboutResponse = response.data;
        console.log(aboutResponse);
        setAboutUs(aboutResponse[0]);
      })
      .catch((error) => {
        console.log("Error fetching AboutUs:", error);
      });
    axios
      .get("/api/about/bios")
      .then((response) => {
        const bios = response.data;
        const studentResponse = bios.filter((bio) => bio.type === 2);
        const founderResponse = bios.filter((bio) => bio.type === 1);
        setStudentBios(studentResponse);
        setFounderBio(founderResponse[0]);
      })
      .catch((error) => {
        console.log("Error fetching Bios:", error);
      });
  }, []);

  if (!aboutUs || !founderBio || !studentBios) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="main" id="content" tabIndex="-1" sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold" }}
        component={"h1"}
        gutterBottom
      >
        {aboutUs.title}
      </Typography>
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Markdown>{aboutUs.founderText}</Markdown>
        <section aria-label="Founder's Bio">
          <ul key={founderBio.id} className="bios">
            <li className="founder-name">{founderBio.name}</li>
            <li>{founderBio.bio}</li>
            {founderBio.link && (
              <li className="founder-link">
                Connect with {founderBio.name} at {founderBio.link}
              </li>
            )}
          </ul>
        </section>
      </Box>
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Markdown>{aboutUs.devText}</Markdown>
        <section aria-label="Dev Team Bios">
          {studentBios.map((bio) => {
            return (
              <ul key={bio.id} className="bios">
                <li className="student-name">{bio.name}</li>
                {bio.bio && <li>{bio.bio}</li>}
                {bio.link && (
                  <li className="student-link">
                    Connect with {bio.name} on{" "}
                    <a href={bio.link} target="blank">
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            );
          })}
        </section>
      </Box>
    </Box>
  );
}
