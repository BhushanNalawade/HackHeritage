import './authentication.styles.css'
import RegisterForm from '../../register-form/register-form.component';
import SignIn from '../../sign-in/sign-in.component';

const Authentication = () => {
    return (
        <div>
            <RegisterForm />
            <SignIn />
        </div>
    )
}

export default Authentication;