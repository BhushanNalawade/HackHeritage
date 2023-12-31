import './register-form.styles.css'
import FormInput from '../form-input/form-input.component';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase.utils';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: '',
    idproof: ''
}

const RegisterForm = () => {
    const [formFields , setFormFields] = useState(defaultFormFields)
    const { email , password , confirmPassword, idproof} = formFields;

    const handleChange = (event) => {
        // setting the form fields
        const {name , value} = event.target;
        setFormFields({...formFields , [name]:value})
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword){
            alert('password do not match');
            return ;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email , password);
            await createUserDocumentFromAuth(user , { idproof })
            resetFormFields()
            navigate("/")
        } catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user , email already in use')
            }
            else{
                console.log('user creation encouter an error' , error)
            }
        }

    }
    return(
        <div className="register-container">
            <h2>If you haven't Registered youself. Register Now !</h2>
            <span>Register Yourself with your email and password</span>

            <form onSubmit={handleSubmit}>
                
                <FormInput label="Email"  type="email" required onChange={handleChange} name="email" value={email}/>
                
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label="confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <FormInput label="Any govt ID proof" type="idproof" required onChange={handleChange} name="idproof" value={idproof}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default RegisterForm;