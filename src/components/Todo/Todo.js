import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import './todo.scss';
export default function Todo({ todo, toggleComplete, handleDelete, handleEdit,}) {
    // Создаю константу для нового заголовка.
    const [newTitle, setNewTitle] = React.useState(todo.title);
    // Функция для редактирования задачи.
    const handleChange = (e) => {
        e.preventDefault();
        if (todo.complete === true) {
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
    };
    // Функция для сравнивания времени.
    const handleTime = (e) => {
        let cursDate = Date.now();
        let finalDate = Date.parse(todo.time);
        console.log(cursDate)
        console.log(finalDate)
        if (cursDate >= finalDate){
            return  true
        } else {
            return false
        }
    }



    // В этом файле рендерятся заполненные задачи и отображаются вместе с кнопками редактирования.
    return (
        <div className="todo">
            <div className="time_task">
                {/*Инпут с выводом задачи и условием рендеринга*/}
                <input
                    style={{ textDecoration: todo.completed && "line-through"  }}
                    type="text"
                    value={todo.title === "" ? newTitle : todo.title}
                    className="list"
                    onChange={handleChange}
                />
                {/*Инпут с выводом времени и условием рендеринга для класса*/}
                <div className="under_todo_container">
                    <input type="text"
                       value={todo.time}
                       className={handleTime() ? 'date_input active' : 'date_input'}
                    />
                    <div className="file_container">{todo.file}</div>
                </div>
            </div>
            <div>
                {/*Кнопки для воздействия на задачу с соответствующей функцией.*/}
                <button
                    className="button-complete"
                    onClick={() => toggleComplete(todo)}
                >
                    <CheckCircleIcon id="i" />
                </button>
                <button
                    className="button-edit"
                    onClick={() => handleEdit(todo, newTitle)}
                >
                    <EditIcon id="i" />
                </button>
                <button className="button-delete" onClick={() => handleDelete(todo.id)}>
                    <DeleteIcon id="i" />
                </button>
            </div>
        </div>
    );
}