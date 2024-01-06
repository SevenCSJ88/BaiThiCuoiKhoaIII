import React from "react";
const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div className="list-todo">
      {todos.map((item, index) => (
        <div className="item" key={index}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <input
                type="checkbox"
                style={{ marginRight: '12px' }}
                checked={item.isCompleted}
                onChange={() => toggleTodo(item)}
              />
              <span className="text-value" style={{ textDecoration: item.isCompleted === true ? 'line-through' : 'none' }}>{item.name}</span>
            </div>
            <span className="text-date">{item.date}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default TodoList;