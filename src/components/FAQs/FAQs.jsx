import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FAQ = () => {
  
  const [faq, setFaq] = useState([]);

 
  useEffect(() => {
    axios
      .get('/api/articles/3')  // TODO change article id to match FAQ ID 
      .then((response) => {
        setFaq(response.data);  
      })
      .catch((error) => {
        console.log('Error fetching FAQ:', error);
      });
  }, []); 

  return (
    <div>
      <h1>FAQ</h1>
      <>
      <ul>
      <li> {faq.title} </li>
      <li> {faq.body} </li>
    
      </ul>
      </>
    </div>
  );
};

export default FAQ;
