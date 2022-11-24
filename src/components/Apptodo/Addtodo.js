import React from "react";
import { db } from "../../firebase";
import { collection, addDoc} from "firebase/firestore";
import './addtodo.scss'
import AddIcon from '@mui/icons-material/Add';
import 'react-calendar/dist/Calendar.css';
import TextField from '@mui/material/TextField';


export default function AddTodo() {
    // Константы для создания заголовка и времени.
    const [title,setTitle] = React.useState("");
    const [time,setTime] = React.useState("")
    //Функция которая передает переменные в бд.
    const hendleSubmit = async (e) =>{
        e.preventDefault();
        if (title !== ""){
            await addDoc(collection(db,"todos"),{
                title,
                time,
                completed: false,
            });
            setTitle("")
        }
    }
    // Этот документ рендерит окно для ввода задачи.
    return(
        // Форма для создания задачи.
        <form onSubmit={hendleSubmit}>
            <div className="input_container">
                <input type="text"
                placeholder="Введите задачу..."
                value={title}
                onChange = {(e)=>setTitle(e.target.value)}
                />
            </div>
            {/*Календарь, который передает значение даты.*/}
            <TextField type="date" margin='small' required size="small" onChange = {(e) => setTime(e.target.value)}/>
            {/*Кнопка, передающая значение.*/}
            <div className="button_container">
                <button>Добавить <AddIcon sx={{ fontSize: 20 }}/></button>
            </div>
        </form>
    );
}
