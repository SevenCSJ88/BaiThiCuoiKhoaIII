import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import TodoList from "./TodoList";
import TodoHeader from "./TodoHeader";
import TodoFooter from "./TodoFooter";
import "../App.css";

const formatDate = () => {
  const date = new Date();
  const day = date.getDate() + 3;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Todo = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [Todo, setTodo] = useState({
    name: "",
    isCompleted: false,
    date: formatDate(),
  });

  const [Todos, setTodos] = useState([]);
  const [showIncompleteTodos, setShowIncompleteTodos] = useState(false);
  const [sortBy, setSortBy] = useState("0");

  const sortTodos = (todosToSort) => {
    switch (sortBy) {
      case "1":
        return todosToSort.sort((a, b) => a.name.localeCompare(b.name));
      case "2":
        return todosToSort.sort((a, b) => b.name.localeCompare(a.name));
      case "3":
        return todosToSort.sort((a, b) => a.isCompleted - b.isCompleted);
      case "4":
        return todosToSort.sort((a, b) => b.isCompleted - a.isCompleted);
      default:
        return todosToSort;
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedTodos = sortTodos([...Todos]);

  const getIncompleteTodoCount = () => {
    return Todos.filter((todo) => !todo.isCompleted).length;
  };

  const handleChange = (e) => {
    setTodo({ ...Todo, name: e.target.value });
  };

  const getAllTodos = () => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const handleSubmit = () => {
    setTodos((prev) => {
      const newTodos = [...prev, Todo];

      const jsonTodos = JSON.stringify(newTodos);
      localStorage.setItem("todos", jsonTodos);

      return newTodos;
    });

    setTodo({
      name: "",
      isCompleted: false,
      date: formatDate(),
    });
  };

  const toggleTodo = (item) => {
    const updatedTodos = Todos.map((todo) => {
      if (todo.name === item.name) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const getIncompleteTodos = () => {
    return Todos.filter((todo) => !todo.isCompleted);
  };

  const handleShowIncompleteTodos = () => {
    setShowIncompleteTodos(!showIncompleteTodos);
  };

  return (
    <>
      <div>
        <label htmlFor="sort">Sắp xếp: </label>
        <select
          onChange={handleSortChange}
          name="sort"
          value={sortBy}
          id="sort"
        >
          <option value="0">Mặc định</option>
          <option value="1">Tăng (A - Z)</option>
          <option value="2">Giảm (Z - A)</option>
          <option value="3">Chưa hoàn thành - Đã hoàn thành</option>
          <option value="4">Đã hoàn thành - Chưa hoàn thành</option>
        </select>
      </div>

      <div className="todo-list">
        <TodoHeader
          getIncompleteTodoCount={getIncompleteTodoCount}
          handleShowIncompleteTodos={handleShowIncompleteTodos}
          t={t}
          showIncompleteTodos={showIncompleteTodos}
        />
        <TodoList
          todos={showIncompleteTodos ? getIncompleteTodos() : sortedTodos}
          toggleTodo={toggleTodo}
        />
        <div className="enter-todo">
          <input
            className="txt-todo"
            value={Todo.name}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder={t("placeholder1")}
          />
          <div className="btn-submit" onClick={(e) => handleSubmit()}>
            {t("buttonSubmit")}
          </div>
        </div>
      </div>
      <TodoFooter changeLanguage={changeLanguage} t={t} />
    </>
  );
};

export default Todo;