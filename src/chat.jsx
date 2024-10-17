import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [data, setData] = useState("");
  const [answer, setAnswer] = useState("This is Lokesh, ask me anything");
  const [loading, setLoading] = useState(false);
  const [k, setK] = useState(0); // Use state for triggering the API call

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCHBX463q9aLOYU-eXXxvE8kxeVwxCWVV8", // Replace API_KEY with your actual key
          method: "post",
          data: {
            contents: [{ parts: [{ text: data }] }],
          },
        });
        setAnswer(response.data.candidates[0].content.parts[0].text);
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (k > 0) {
      fetchData();
    }
  }, [k]); // Trigger useEffect when 'k' changes

  const handleClick = () => {
    setK(k + 1); // Trigger API call by updating 'k'
  };

  return (
    <>
      <h1 className="text-white text-6xl text-center p-10">ChatBot</h1>
      <div>
        <textarea
          className="w-full md:w-3/4 lg:w-1/2 h-32 p-4 border rounded-lg  text-center content-center bg-zinc-600 text-white"
          placeholder="Ask Anything"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate
      </button>
      <div className=" flex justify-center items-center min-h-[100px]">
        {loading ? (
          <img  className="h-20" src="3.gif" alt="Loading..." />
        ) : (
          <pre className="text-white">{answer}</pre>
        )}
      </div>

    </>
  );
}

export default Chat;
