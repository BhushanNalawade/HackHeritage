import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { useNavigate } from "react-router-dom";



const defaultFormFields = {
    email: '',
    password: ''
}
const SignIn = () => {
    const [formFields , setFormFields] = useState(defaultFormFields);
    const {email , password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()


        try{
            await signInAuthUserWithEmailAndPassword(email , password)
            resetFormFields()
            navigate("/")
        } catch(error){
            if(error.code === 'auth/wrong-password'){
                alert('incorrect password')
            }
            else if(error.code === 'auth/user-not-found'){
                alert('no user associated with this email')
            }
            else{
                console.log(error)            
            }
        }
    }

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields({...formFields , [name]:value})
    }
    return(
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email}/>
                    
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">     
                <button type="submit">Sign In</button>
            </div>
            </form>
        </div>
    )
}

export default SignIn;