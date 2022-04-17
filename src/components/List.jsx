/* eslint-disable radix */
import React from 'react';
import { BsTrash } from 'react-icons/bs';

function List({ list, setList }) {
  const checkItem = ({ target }) => {
    const { checked } = target;
    const id = parseInt(target.id);
    const newList = [...list];
    newList[id] = { ...newList[id], check: checked };
    setList([...newList]);
  };
  const removeItem = (id) => {
    const itens = [...list];
    itens.splice(id, 1);
    setList(itens);
    if (list.length === 1) {
      localStorage.setItem('Tasks', JSON.stringify([]));
    }
  };
  return list.map((item, index) => (
    <div className={ item.check ? 'listTrue' : 'list' } key={ index }>
      <div className="Title">
        <div>{item.Title}</div>
      </div>
      <div className="Description">
        <div>{item.Description}</div>
      </div>
      <div className="RemoveButton">
        <button
          type="button"
          className="removeButton"
          onClick={ () => { removeItem(index); } }
        >
          <BsTrash />
        </button>
      </div>
      <div className="checkItem">
        <input
          type="checkbox"
          id={ item.id }
          checked={ item.check }
          onChange={ checkItem }
        />
      </div>
    </div>
  ));
}
export default List;
