import signinStyles from '../pages/Signin.module.css'
import { useState } from 'react'
import { SigninInput, SignupInput } from '@sudhanshugau12/blog-common'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Oval } from 'react-loader-spinner'

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [postInputs, setPostInputs] = useState<SigninInput | SignupInput>({
    username: "",
    password: "",
    name: (type === "signup") ? "" : undefined
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs)
      const jwt = res.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs")
    } catch (error) {
      alert('Check credentials');
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className={signinStyles.formContainer}>
      <div className={signinStyles.header}>
        {type === "signin" && <h1>Sign up with email</h1>}
        {type === "signup" && <h1>Create an account</h1>}
        {type === "signin" &&
          <p>No account? {" "}
            <Link to="/signup">
              Create one
            </Link>
          </p>}
        {type === "signup" &&
          <p>Already have an account? {" "}
            <Link to="/signin">
              Sign in
            </Link>
          </p>}
      </div>
      <form onSubmit={handleSubmitAuth}>
        {type === "signup" &&
          <LabelledInput
            label="Name"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        }
        <LabelledInput
          label="Username"
          name="username"
          placeholder="m@example.com"
          onChange={handleChange}
        />
        <LabelledInput
          label="Password"
          name="password"
          type='password'
          placeholder=""
          onChange={handleChange}
        />
        {
          type === "signup" ? (
            <button type='submit'>
              {
                loading ? (
                  <Oval
                    height={20}
                    strokeWidth={5}
                  />
                ) : "Sign Up"
              }
            </button>
          ) : (
            <button type='submit'>
              {
                loading ? (
                  <Oval
                    height={20}
                    strokeWidth={5}
                  />
                ) : "Sign In"
              }
            </button>
          )
        }
      </form>
    </div>
  )
}

interface LabelledInputType {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({ label, name, type, placeholder, onChange }: LabelledInputType) => (
  <label>
    {label}:
    <input type={type || "text"} name={name} placeholder={placeholder} onChange={onChange} />
  </label>
);

export default LabelledInput;

