import React from "react";
import { db } from "../../firebase";
import { collection, addDoc} from "firebase/firestore";
import './addtodo.scss'
import AddIcon from '@mui/icons-material/Add';


export default function AddTodo() {

    const [title,setTitle] = React.useState("");
    const hendleSubmit = async (e) =>{
        e.preventDefault();
        if (title !== ""){
            await addDoc(collection(db,"todos"),{
                title,
                completed: false,
            });
            setTitle("")
        }
    }

    return(
        <form onSubmit={hendleSubmit}>
            <div className="input_container">
                <input type="text"
                placeholder="Введите задачу..."
                value={title}
                onChange = {(e)=>setTitle(e.target.value)}
                />
            </div>
            <div className="button_container">
                <button>Добавить задачу <AddIcon sx={{ fontSize: 20 }}/></button>
            </div>
        </form>
    );
}
