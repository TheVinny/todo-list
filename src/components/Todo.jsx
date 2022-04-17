/* eslint-disable no-prototype-builtins */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import List from './List';

function Todo() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState();
  function HandleValues({ target }) {
    const { name, value } = target;
    setTask({ ...task, [name]: value });
  }
  function AddTask({ target }) {
    const valueTitle = target.previousElementSibling.previousElementSibling.value;
    if (valueTitle.length !== 0) {
      setList([...list, { ...task, id: list.length, check: false }]);
    }
    target.previousElementSibling.previousElementSibling.value = '';
    target.previousElementSibling.value = '';
  }
  useEffect(() => {
    if (localStorage.hasOwnProperty('Tasks')) {
      const saveList = JSON.parse(localStorage.getItem('Tasks'));

      setList([...saveList]);
    } else {
      localStorage.setItem('Tasks', JSON.stringify(list));
    }
  }, []);
  useEffect(() => {
    const newList = list;
    if (newList.length > 0) {
      localStorage.setItem('Tasks', JSON.stringify(newList));
    }
  }, [list]);

  return (
    <div className="Todo">
      <div className="titleMain">
        <span>Todo List</span>
      </div>
      <div className="Header">
        <input
          type="text"
          name="Title"
          onChange={ HandleValues }
          placeholder="Insira o titulo da task"
          maxLength="14"
          className="InputTask"
        />
        <input
          type="text"
          name="Description"
          onChange={ HandleValues }
          placeholder="Descrição (Opcional)"
          maxLength="18"
          className="InputTask"
        />
        <button
          type="button"
          id="Button"
          className="addButton"
          onClick={ AddTask }
        >
          +
        </button>
      </div>
      <div className="titleList">
        <div>
          <span>Titulo</span>
        </div>
        <div>
          <span>Descrição</span>
        </div>
        <div>
          <span>Remover</span>
        </div>
      </div>
      <div className="taskList">
        <List list={ list } setList={ setList } />
      </div>
      <div className="buttonClearArea">
        <button
          type="button"
          className="clearButton"
          onClick={ () => {
            setList([]);
            localStorage.setItem('Tasks', JSON.stringify([]));
          } }
        >
          Limpar Tasks
        </button>
      </div>
    </div>
  );
}

export default Todo;
