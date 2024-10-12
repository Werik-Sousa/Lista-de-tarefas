import React, {useState, useEffect} from "react";
import './TodoList.css';
import Icone from './assets/icone.png';

function TodoList() {
const listaStorage = localStorage.getItem('Lista');
const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
const [novoItem, setnovoItem] = useState ("");

useEffect(() => {
  localStorage.setItem('Lista', JSON.stringify(lista));
},[lista])

function adicionaItem(form) {
  form.preventDefault();
  if(!novoItem){
    return;
  }
  setlista([...lista, {text:novoItem, isCompleted: false}])
  setnovoItem("");
  document.getElementById('input-entrada').focus();
}

function clicou(index) {
  const listaAux = [...lista];
  listaAux[index].isCompleted = !listaAux[index].isCompleted;
  setlista(listaAux);
}
function deletar(index) {
  const listaAux = [...lista];
  listaAux.splice(index, 1);
  setlista(listaAux);
}
function deletarTodos() {
  setlista([])
}

  return (
    <div>
      <h1>Lista de tarefas <span><i class='bx bx-bookmark-alt'></i></span></h1>
      <form onSubmit={adicionaItem}>
        <input 
          id="input-entrada"
          type="text"
          value = {novoItem}
          onChange={(e) => {setnovoItem(e.target.value)}}
          placeholder="Adicione uma tarefa"
        />
        <button className="add" type="submit">
          <i className='bx bx-plus-medical'></i>
        </button>
      </form>

      <div className="listaTarefas">
        <div className="imagemSemTarefas">
        {
          lista.length < 1
          ?
          <img src = {Icone}/>
          :
          lista.map((item, index) =>(
            <div 
            key={index}
            className= {item.isCompleted ? "item completo" : "item"}>
            <span onClick={() => {clicou(index)}}>{item.text}</span>
            <button onClick={() => {deletar(index)}} className="del">Excluir</button>
          </div>
          ))
        }
        </div>
        {
           lista.length > 0 &&
           <button onClick={() => {deletarTodos()}} className="deleteAll">Deletar todos</button>
        }
       
      </div>
    </div>
  );
}


export default TodoList;
