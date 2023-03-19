import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Navigation from '../components/Navigation';


export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <div className="rectangle">
        <table className="editTable">
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
                <td><input  className="inputWeight"  type="number" value={weight} onChange={e => setWeight(e.target.value)} /></td>
                <td>     
                    <form>
                    <select  className="selectUnits" onChange={e => setUnit(e.target.value)}>
                        <option value = "lbs">lbs</option>
                        <option value = "kgs">kgs</option>
                    </select>
                    </form> 
                </td>
                <td><input  className="inputDate" type="text" value={date} onChange={e => setDate(e.target.value)} /></td>
            </tr>
        </tbody>
        </table>
        <div className="rectangle4"></div>
        <div>
        <button className="saveButton" onClick={editExercise}>Save</button>
        </div>
        <div className="editNavigation">
            <Navigation/>
        </div>
        
        <header>
            <h1 className="headeredit">Exercise Tracker</h1>
            <p className="descriptionedit">Full Stack MERN App Demonstration</p>
        </header>
        <footer className="footeredit">
            <p className="generalText">© 2022 Dion Mokhtari</p>
        </footer>
        <div>
            <p className ="editDescription">Edit exercise and save</p>
        </div>
        </div>      
    );
}

export default EditExercisePage;