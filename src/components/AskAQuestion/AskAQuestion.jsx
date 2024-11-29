import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import './AskAQuestion.css'


const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
       
        console.log('Question:', question)
        console.log('Question Date:', new Date().toISOString());

        try {
            // Sends POST request to submit user question
             const response = await axios.post("/api/questions/new-question-without-article", {
                question,
                questionDate: new Date().toISOString(),
            });
            // // If request is successful, dispatch to add question to state
            // dispatch({
            //     type: 'SET_USER_UNANSWERED',
            //     payload: {
            //     question,
            //     answer: null,
            //     answered: false,
            //     unread: true,
            //     associated_article_url: null,
            //     questionDate: new Date().toISOString(),
            //     flagged: false,
            //     user_id: 1,
            //     },
            // });

            setQuestion('');
            setError(null)
            setSuccessMessage('Your question has been submitted successfully!')
        } catch (err) {
            setError('Error submitting your question. Please try again later.');
        } finally {
            setIsLoading(false);
            
        }
    };

    return (
        <>
        <main>
          
            <form onSubmit={handleSubmit} className="question-form">
                <h2>Ask A Question!</h2>
                <h3>Ask a question to our admins and they will respond as soon as possible. These questions and answers are private to you. </h3>
                <textarea
                value={question}
                onChange={handleQuestionChange}
                placeholder="Enter your question here..."
                required

                ></textarea>
                {successMessage && <div className='success'>{successMessage}</div>}
                {error && <div className="error">{error}</div>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Question'}
                </button>
            </form>
        </main>
        
    </>
  );
};

export default AskQuestion;