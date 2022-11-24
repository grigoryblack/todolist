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
    const [time,setTime] = React.useState("");
    const [file,setFile] = React.useState(null)
    //Функция которая передает переменные в бд.
    const hendleSubmit = async (e) =>{
        e.preventDefault();
        if (title !== ""){
            await addDoc(collection(db,"todos"),{
                title,
                time,
                file,
                completed: false,
            });
            setTitle("")
        }
    }
    const hiddenFileInput = React.useRef(null);

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
            <label>
                Добавить файл
                <input className="file_upload_style" ref={hiddenFileInput} type="file" onChange = {(e)=> setFile(e.target.value)}/>
            </label>
            {/*Кнопка, передающая значение.*/}
            <div className="button_container">
                <button>Добавить <AddIcon sx={{ fontSize: 20 }}/></button>
            </div>
        </form>
    );
}
