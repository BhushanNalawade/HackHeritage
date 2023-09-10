
import { useState } from "react";
import { useContext } from 'react';
import { UserContext } from '../../../contexts/user.context';
import { enterDataIntoDatabase } from "../../utils/firebase.utils";

const defaultFormFields = {
    studentName: '',
    birthDate: '',
    dropYear: 0,
    caste: '',
    ageAtDrop: 0,
    category: 'general',
    gender: 'male',
    reason: 'financial',
    orgName: '',
    orgState:'',
    orgCity: '',
    course: 'bachelors'
}

const Data = (props) => {
    const {currentUser }= useContext(UserContext);
    const [formFields , setFormFields] = useState(defaultFormFields)
    const {studentName ,  birthDate , dropYear , 
        caste ,  category ,ageAtDrop , 
        gender , reason ,orgName , orgState , orgCity , course} = formFields

    const handleChange = (event) => {
        const {name , value} = event.target
        setFormFields({...formFields , [name]:value})
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        const fieldsToEnter = {...formFields , id: currentUser.uid}
        enterDataIntoDatabase(fieldsToEnter)
        resetFormFields()
    }

    return(
        <div>
            {props.unlocked && <form onSubmit={handleSubmit}>
                <div >
                    <h1>Enter Student Details</h1>
                    <div className="input">
                        <label>Enter Student Name</label>
                        <input type="text" name="studentName" required value={studentName} onChange={handleChange}/>
                    </div>

                    <div className="input">
                        <label>Enter Bith date</label>
                        <input type="date" name="birthDate" required value={birthDate} onChange={handleChange}/>
                    </div>

                    <div className="input">
                        <label>Enter Age at dropout</label>
                        <input type="number" name="ageAtDrop" required value={ageAtDrop} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Enter year of dropout</label>
                        <input type="number" name="dropYear" required value={dropYear} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Enter Caste</label>
                        <input type="text" name="caste" required value={caste} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Select category</label>
                        <select name="category" required value={category} onChange={handleChange}>
                            <option value="general">General</option>
                            <option value="obc">obc</option>
                            <option value="scst">sc/st</option>
                        </select>
                    </div>

                    <div className="input">
                        <label>Select Gender</label>
                        <select name="gender" required value={gender} onChange={handleChange}>
                            <option value="male">male</option>
                            <option value="female">female</option>
                         </select>
                    </div>

                    <div className="reason">
                        <label>Select Reason for drop</label>
                        <select name="reason" required value={reason} onChange={handleChange}>
                            <option value="financial">financial issues</option>
                            <option value="examPrep">preparing for exam</option>
                            <option value="cannotFollowUp">cannot follow up course curriculam </option>
                        </select>
                    </div>
                </div>

                <div>
                    <h1>Enter Organisation Details</h1>
                    <div className="input">
                        <label>Enter Students organisation name</label>
                        <input type="text" name="orgName" required value={orgName} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Enter State</label>
                        <input type="text" name="orgState" required value={orgState} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Enter City</label>
                        <input type="text" name="orgCity" required value={orgCity} onChange={handleChange}/>
                    </div>
                    <div className="input">
                        <label>Select course dropped out from</label>
                        <select name="course" required value={course} onChange={handleChange}>
                            <option value="bachelors">Bachelors</option>
                            <option value="masters">Masters</option>
                            <option value="phd">phd</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>}
            {!props.unlocked &&
                <h1>You dont have access to the page</h1>
            }
        </div>
    )
}

export default Data;