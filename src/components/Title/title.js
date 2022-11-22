import React from "react";
import './title.scss'
import AddTodo from "../Apptodo/Addtodo";
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

export default function Title(){
    const [todos, setTodos] = React.useState([]);

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

    const handleEdit = async (todo, title) => {
        await updateDoc(doc(db, "todos", todo.id), { title: title });
    };
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    };
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };
    return(
        <div className="container">
            <div className="container_items">
                <div className="title">Список задач</div>
                <AddTodo/>
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
            </div>
        </div>
    );
}
