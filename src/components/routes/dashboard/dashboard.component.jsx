const Dashboard = (props) => {
    console.log(props.unlocked)
    return(
        <div>
            {props.unlocked && 
                <h1>You have access</h1>
            }
            {!props.unlocked &&
                <h1>You dont have access</h1>
            }
        </div>
    )
}

export default Dashboard;