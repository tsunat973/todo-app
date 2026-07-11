import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    if (text.trimRight() === "") {
      return;
    }
    setTodos([...todos, text]);
    setText("");
  };
  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <>
      <h1> Todoアプリ</h1>
      <input
        // だからReactでは通常、valueを指定してStateで入力欄を管理します。
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      <p>入力中： {text}</p>
      {todos.map((todo, index) => (
        <div key={index}>
          <p>{todo}</p>
          <button onClick={() => deleteTodo(index)}>
            削除
          </button>
        </div>

      ))}


    </>

  );
}

export default App;