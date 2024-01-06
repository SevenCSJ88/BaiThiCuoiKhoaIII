import React from "react";

const TodoHeader = ({ getIncompleteTodoCount, handleShowIncompleteTodos, t, showIncompleteTodos }) => {
  return (
    <header>
      <span>
        {t("header1")} {getIncompleteTodoCount()} {t("header2")}
      </span>
      <div className="btn-finish" onClick={handleShowIncompleteTodos}>
        {!showIncompleteTodos ? t("header3") : t("header4")}
      </div>
    </header>
  );
};

export default TodoHeader;