import React from "react";
import vi from '../assests/vi.png';
import en from '../assests/en.png';

const TodoFooter = ({ changeLanguage, t }) => {
  return (
    <div style={{ fontSize: "14px", fontWeight: "500" }}>
      {t("footer1")}
      <img
        onClick={() => changeLanguage("vi")}
        width={20}
        src={vi}
        style={{ cursor: "pointer", margin: "0 8px" }}
        alt="Vietnamese Flag"
      />
      <img
        onClick={() => changeLanguage("en")}
        width={20}
        src={en}
        style={{ cursor: "pointer" }}
        alt="English Flag"
      />
    </div>
  );
};

export default TodoFooter;