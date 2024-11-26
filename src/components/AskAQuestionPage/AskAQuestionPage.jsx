import React, { useState } from 'react';
import axios from 'axios';

import './AskAQuestionPage.css'

const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleQuestionChange = (even) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/new-question-without-article', {


                
                question,
                questionDate: new Date().toISOString(),
            });
            setQuestion('');
            setError(null)
        } catch (err) {
            setError('Error submitting your question. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
          <div className="ask-title">
            <h2>Ask A Question</h2>
            <button className="ask-button">Click here to ask a question</button>
            </div>
        <main>
          
            <div className="questions-container">
                <div className="tabs">
                    <button>Unanswered Questions</button>
                    <button>Answered Questions</button>
                </div>
                
               
               
            </div>
            <form onSubmit={handleSubmit} className="question-form">
                <textarea
                value={question}
                onChange={handleQuestionChange}
                placeholder="Enter your question here..."
                required

                ></textarea>
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