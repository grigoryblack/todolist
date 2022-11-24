import React from "react";
import './title.scss'
import Todo from "../Todo/Todo";
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Modal from "../modal/Modal";

export default function Title(){
    // Константы для создания задачи и активации модального окна.
    const [todos, setTodos] = React.useState([]);
    const [modalActive,setModalActive] = React.useState(false);

    // Получаю задачу через useEffect из бд.
    React.useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let todosArray = [];
            querySnapshot.forEach((doc) => {
                todosArray.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todosArray);
        });
        return () => unsub();
    }, []);
    // Функции для редактирования бд, обращаюсь к ним через кнопки, здесь логику прописываю.

    const handleEdit = async (todo, title) => {
        await updateDoc(doc(db, "todos", todo.id), { title: title });
    };
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };
    //Основной рендеринг страницы с заголовком и модальным окном, сюда передаю
    // id задачи и все остальные пропсы, а так же функции для редактирования.
    return(
        <div className="container">
            <div className="container_items">
                <div className="title">Список задач</div>
                {/*Кнопка, которая открывает модальное окно*/}
                <button className="add_button" onClick={()=>setModalActive(true)}> Добавить задачу</button>
                {/*Контейнер с задачами и функциями редактирования.*/}
                <div className="todo_container">
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            toggleComplete={toggleComplete}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
                {/*Рендеринг модального окна.*/}
                <Modal active = {modalActive} setActive = {setModalActive}/>
            </div>
        </div>
    );
}
