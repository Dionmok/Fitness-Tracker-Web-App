import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../components/Navigation';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(m => m._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("/edit-exercise");

    }

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }
        
    useEffect(() => {
        loadExercises();
    }, []);

    

    return (
        <>
            <div className="rectangle">
                <header>
                    <h1 className="headerhome">Exercise Tracker</h1>
                    <p className="descriptionhome">Full Stack MERN App Demonstration</p>
                </header>
                <div className="homeaddhome">
                    <Navigation/>
                </div>
                <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
                <div>
                <footer >
                    <p className="footerhome">© 2022 Dion Mokhtari</p>
                </footer>
                </div>
            </div>
        </>
    );
}

export default HomePage;