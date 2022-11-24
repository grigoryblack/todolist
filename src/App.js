import './App.scss';
import React from 'react';
import Title from './components/Title/title'
function App() {
  return (
   <>
       {/*Рендерю компонент title, в последствии буду загружать материал в него.*/}
           <Title/>
   </>
  );
}

export default App;
