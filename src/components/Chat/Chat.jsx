import React, {useEffect, useState} from 'react';
import './styles.scss'
import {io} from "socket.io-client";

const socket = io('http://localhost:5000');

const Chat = ({ chat }) => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState('');

  const { id, title } = chat;

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
      setIsConnected(true);

    });
    socket.on('events', function(data) {
      setMessages(data)
    });
    socket.on('disconnect', function() {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('events');
    };
  }, []);

  const sendPing = () => {
    socket.emit('events', {
      roomId: id,
      userId: 1,
      text: newMessage
    });
    setNewMessage('');
  }

  const closeConnect = () => {
    socket.close();
  }

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <p>Connected: { '' + isConnected }</p>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={ sendPing }>Send message</button>
      </div>
      <ol>
        {messages.map((message) => {
          return <li>{message.text}</li>
        })}
      </ol>
    </div>
  );
};

export default Chat;