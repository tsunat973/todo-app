import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [editText, setEditText] = useState("");
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    const newText = text.trim();

    if (newText === "") return;

    fetch(`${import.meta.env.VITE_API_URL}/todos`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text: newText }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
    setText("");
  };
  const deleteTodo = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  //   i → 今見ているTodoの番号
  // index → クリックされたTodoの番号
  const toggleTodo = (id) => {
    const target = todos.find((todo) => todo.id === id); //対象のTodoを取得 

    fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !target.completed }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  //編集保存
  const saveTodo = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
    setEditingIndex(null);
    setEditText("");

  };




  //filter機能実装
  const [display, setDisplay] = useState("all");

  return (
    <div className="container">
      <h1> Todoアプリ</h1>
      {/* Enterキーでも追加できるように */}
      <div className="input-area">
        <input
          // Reactでは通常、valueを指定してStateで入力欄を管理します。
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <p>入力中： {text}</p>
      <p>
        残り:
        {todos.filter((todo) => !todo.completed).length}
        件
      </p>
      <div className="filter-area">
        <button
          className={display === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setDisplay("all")}
        >全部</button>
        <button className={display === "active" ? "filter-btn active" : "filter-btn"}
          onClick={() => setDisplay("active")}>未完了</button>
        <button className={display === "completed" ? "filter-btn active" : "filter-btn"}
          onClick={() => setDisplay("completed")}>完了済み</button>
      </div>

      {todos.length === 0 && <p>まだTodoがありません</p>}

      {todos
        .filter((todo) =>
          display === "all"
            ? true
            : display === "active"
              ? !todo.completed
              : display === "completed"
                ? todo.completed
                : false
        )
        .map((todo, index) => (
          <div
            key={index}
            className="todo-item">
            {editingIndex === index ? (
              <>
                <input value={editText}
                  onChange={(e) => setEditText(e.target.value)} />

                <button onClick={() => saveTodo(todo.id)}>保存</button>
              </>) : (
              <>
                <p
                  className={todo.completed
                    ? "todo-text completed"
                    : "todo-text"
                  }
                >{todo.text}</p>
                <div>
                  <button onClick={() => deleteTodo(todo.id)}>
                    削除
                  </button>
                  <button onClick={() => toggleTodo(todo.id)}>完了</button>
                  <button onClick={() => {
                    setEditingIndex(index);
                    setEditText(todo.text);
                  }}>
                    編集
                  </button>
                </div>

              </>

            )}
          </div>
        ))}
    </div>



  );
}

export default App;