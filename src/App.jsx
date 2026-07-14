import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos =
      localStorage.getItem("todos");

    return savedTodos
      ? JSON.parse(savedTodos)
      : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const [editText, setEditText] = useState("");
  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    );
  }, [todos]);
  const addTodo = () => {
    const newText = text.trim();

    if (newText === "") return;
    setTodos([...todos, {
      text: newText,
      completed: false,
    },
    ]);
    setText("");
  };
  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  //   i → 今見ているTodoの番号
  // index → クリックされたTodoの番号
  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      })
    );
  };

  //編集保存
  const saveTodo = (index) => {
    setTodos(
      todos.map((todo, i) => {
        if ( i === index) {
          return {
            ...todo,
            text: editText,
          };
        }
        return todo;
      })
    );

    setEditingIndex(null);
    setEditText("");
  }

  return (
    <>
      <h1> Todoアプリ</h1>
      {/* Enterキーでも追加できるように */}
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
      <p>入力中： {text}</p>
      <p>
        残り:
        {todos.filter((todo) => !todo.completed).length}
        件
      </p>
      {todos.map((todo, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <>
              <input value={editText}
                onChange={(e) => setEditText(e.target.value)} />

              <button  onClick={() => saveTodo(index)}>保存</button>
            </>) : (
            <p style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}>{todo.text}</p>
          )}

          {/* クリックされたときに deleteTodo(index) を実行する関数を渡している */}
          <button onClick={() => deleteTodo(index)}>
            削除
          </button>
          <button onClick={() => toggleTodo(index)}>完了</button>
          <button onClick={() => {
            setEditingIndex(index);
            setEditText(todo.text);
          }}>
            編集
          </button>
        </div>


      ))}
    </>
  );
}

export default App;