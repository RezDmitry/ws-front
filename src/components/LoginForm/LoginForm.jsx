import React, {useState} from 'react';
import './styles.scss'

const LoginForm = ({onClickHandler}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="loginForm">
      <h1>Войти в учетную запись</h1>
      <p>Логин</p>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text_input'/>
      <p>Пароль</p>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text_input'/>
      <button onClick={() => onClickHandler({ username, password })} className='button success'>Login</button>
    </div>
  );
};

export default LoginForm;