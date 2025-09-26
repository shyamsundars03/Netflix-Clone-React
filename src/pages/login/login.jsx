import React,{useState, useEffect} from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'; // import navigation
import { onAuthStateChanged } from 'firebase/auth'; // import session listener
import  logo from '../../assets/logo.png'
import {login,signUp,auth} from "../../firebase"
import netflix_spinner from '../../assets/netflix_spinner.gif';


const Login = () => {

  const [signState,setSignState]=useState("Sign In")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();





  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (signState === 'Sign Up' && !name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };












  const user_auth = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signUp(name, email, password);
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };






  return loading ? (
    <div className='login-spinner'>
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className='login'>
      <img src={logo}  className='login-logo' alt="" />
          <div className="login-form">
              <h1>{signState}</h1>
              <form >
                  {signState==="Sign Up" && ( <>  <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Your Name'  className={errors.name ? 'input-error' : ''}        />  {errors.name && <p className="error-text">{errors.name}</p>} </>)}
                <input type="email" placeholder='Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  className={errors.email ? 'input-error' : ''}       ></input>  {errors.email && <p className="error-text">{errors.email}</p>}
                <input type="password" placeholder='Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  className={errors.email ? 'input-error' : ''}      ></input>  {errors.email && <p className="error-text">{errors.email}</p>}
                <button  onClick={user_auth}  type='submit'   >{signState}</button>
                <div className="from-help">
                    <div className="remember">
                      <input  type='checkbox' />
                      <label htmlFor=''   >Remember Me</label>
                    </div>
                <p>Need Help?.</p>
                </div>
              </form>
              <div className='form-switch'>
                   {signState==="Sign Up"?<p>Already Have Account? <span onClick={()=>{setSignState("Sign In")}}   >Sign In Now</span></p>:<p>New to Netflix? <span  onClick={()=>{setSignState("Sign Up")}} >Sign Up Now</span></p>}
              </div>


            
          </div>
    </div>
  )
}

export default Login
