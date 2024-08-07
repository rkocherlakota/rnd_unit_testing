import React, {useState} from "react"

export default function LoginForm(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername]=useState('');
    const [password, setPassword]= useState('');

    const handleLogin =(e)=>{
        e.preventDefault();

        const clientUsername="rahul";
        const clientPassword  ="1234";


        if(username===clientUsername && password===clientPassword){
            setIsLoggedIn(true);
            console.log('logged in')
        }
    }
    return (
      <form className="login-container">
      <label htmlFor="username" className="sr-only">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className={`login-input ${username && 'input-filled'}`}
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password" className="sr-only">
       Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className={`login-input ${password && 'input-filled'}`}
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-login" type="submit" onClick={handleLogin}>
        Sign in now
      </button>
    </form>
    )
}
