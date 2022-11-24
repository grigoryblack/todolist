import React from 'react';

import './modal.scss';
import AddTodo from "../Apptodo/Addtodo";

const Modal=({active, setActive})=>{
    return(
        <>
            {/*Модальное окно для создания задачи с условиями ее активации*/}
            <div className={active ? "modal active" : "modal"} onClick={()=> setActive(false)}>
                <div className="modal__content" onClick={e =>e.stopPropagation()}>
                    <AddTodo/>
                </div>
            </div>
        </>
    );

}

export default Modal;