import { useState, useEffect } from "react";
import axios from "axios";
import Markdown from "react-markdown";

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
    <div>
      <h1>{aboutUs.title}</h1>
      <Markdown>{aboutUs.founderText}</Markdown>
      <div>
        <ul key={founderBio.id}>
          {founderBio.name}
          <li>{founderBio.bio}</li>
          {founderBio.link && (
            <li>
              Connect with {founderBio.name} at {founderBio.link}
            </li>
          )}
        </ul>
      </div>
      <Markdown>{aboutUs.devText}</Markdown>
      <div>
        {studentBios.map((bio) => {
          return (
            <ul key={bio.id}>
              {bio.name}
              {bio.bio && <li>{bio.bio}</li>}
              {bio.link && (
                <li>
                  Connect with {bio.name} on <a href={bio.link} target="blank">LinkedIn</a>
                </li>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
