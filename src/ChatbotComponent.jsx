// ChatbotComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatbotComponent.css'

const ChatbotComponent = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const apiUrl = 'http://13.37.212.240:8081/chat/searchChatGPT';
      const requestBody = {
      /*model: 'text-davinci-003',
      prompt: 'English: ' + query, // Utilisez la valeur de la question entrée par l'utilisateur
      temperature: 1,
      max_tokens: 100,*/
      query: query
      };
      
      const chatGptToken = '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';

      const response = await axios.post(apiUrl,requestBody, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${chatGptToken}`,
          'Content-Type': 'application/json',
        },
       // body: JSON.stringify(requestBody),
       
      });
      console.log(response.data);
 
     // const responseData = await response.json();
    //  console.log(responseData);
   

  setResponse(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div  id="chatContainer">
    <h1>Chatbot</h1>
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
    {response && (
      <div>
        <p className="user-message">User: {query}</p>
        <p className="chatbot-message">Chatbot: {response}</p>
      </div>
    )}
 
    </div>
  );}

export default ChatbotComponent;
