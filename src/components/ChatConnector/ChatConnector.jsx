import React, {useState} from 'react';

const ChatConnector = ({ onClick }) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <p>Enter room id:</p>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={() => onClick(inputValue)}>Connect</button>
    </div>
  );
};

export default ChatConnector;