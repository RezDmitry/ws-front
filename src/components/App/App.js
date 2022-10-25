import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import './styles.scss'
import LoginForm from "../LoginForm/LoginForm";
import axios from "axios";

const socket = io('http://localhost:5000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials)
      setJwt(response.data.access_token)
    } catch (e) {

    }
  }

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
      setIsConnected(true);

    });
    socket.on('events', function(data) {
      console.log(data);
      setLastPong(data)
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
    socket.emit('events', 'kek!');
  }

  const closeConnect = () => {
    socket.close();
  }

  return (
    <div className='app'>
      <div className='container'>
        {!jwt && <LoginForm onClickHandler={login} />}
        <div>
          <p>Connected: { '' + isConnected }</p>
          <p>Last pong: { lastPong || '-' }</p>
          <button onClick={ sendPing }>Send ping</button>
          <button onClick={ closeConnect }>Close connect</button>
        </div>
      </div>
    </div>
  );
}

export default App;
