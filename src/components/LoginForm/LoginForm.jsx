import React, {useState} from 'react';
import './styles.scss'

const LoginForm = ({onClickHandler}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="loginForm">
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={() => onClickHandler({ username, password })}>Войти</button>
    </div>
  );
};

export default LoginForm;