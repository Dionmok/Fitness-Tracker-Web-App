import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Navigation from '../components/Navigation';



export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState('');

    console.log(unit);


    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        console.log(unit)
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div className="rectangle">
        <table className="createTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input className="inputName" type="text" value={name} onChange={e => setName(e.target.value)}/> </td>
                <td><input className="inputReps" type="number" value={reps} onChange={e => setReps(e.target.value)} /></td>
                <td><input className="inputWeight"  type="number" value={weight} onChange={e => setWeight(e.target.value)} /></td>
                <td>     
                    <form>
                    <select className="selectUnits" value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value = "lbs">lbs</option>
                        <option value = "kgs">kgs</option>
                    </select>
                    </form> 
                </td>
                <td><input className="inputDate" type="text" value={date} onChange={e => setDate(e.target.value)} /></td>
            </tr>
        </tbody>
        </table>
        <div>
            <div className="rectangle3"></div>
        <button className="createButton" onClick={addExercise}>Add</button>
        </div>
        <div className="addNav">
            <Navigation/>
        </div>
        <header>
            <h1 className="headercreate">Exercise Tracker</h1>
            <p className="descriptioncreate">Full Stack MERN App Demonstration</p>
        </header>
        <div className="footercreate">
        <footer>
            <p>© 2022 Dion Mokhtari</p>
        </footer>
        </div>
        
        </div>      
    );

}
export default CreateExercisePage;