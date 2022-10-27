import {useState} from "react";
import './styles.scss'
import LoginForm from "../LoginForm/LoginForm";
import axios from "axios";
import ChatConnector from "../ChatConnector/ChatConnector";
import Chat from "../Chat/Chat";

function App() {
  const [jwt, setJwt] = useState(null);
  const [chat, setChat] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials)
      setJwt(response.data.access_token)
    } catch (e) {
      console.log('==========>error on login')
    }
  }

  const connect = async (roomId) => {
    try {
      const response = await axios.post(`http://localhost:5000/rooms/${roomId}/connect`, {}, {
        headers: {
          authorization: `Bearer ${jwt}`
        }
      })
      setChat(response.data)
    } catch (e) {
      console.log('==========>error on connect')
    }
  }

  return (
    <div className='app'>
      <div className='container'>
        {!jwt && <LoginForm onClickHandler={login} />}
        {chat
          ? <Chat chat={chat} jwt={jwt} />
          : jwt
            ? <ChatConnector onClick={connect} />
            : null
        }
      </div>
    </div>
  );
}

export default App;
