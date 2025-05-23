// React만을 이용한 TodoList 예제
import { useState } from "react";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add Todo 버튼 클릭 시 todoList 상태에 업데이트 이벤트 핸들러 함수
  const handleAddTodo = () => {
    setTodoList([...todoList, { title: inputValue, isDone: false }]);
    setInputValue(""); // input 창 값 비우기
  };

  // 완료/미완료 상태 업데이트 이벤트 핸들러 함수
  const handleToggleTodo = (index) => {
    const newTodoList = todoList.map((todo, i) =>
      // 현재 배열의 i와 매개변수 index가 같으면 변경된 내용으로,
      // 같지 않으면 기존 todo 그대로 적용하여
      // 새로운 배열을 만들어 반환
      i === index ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodoList(newTodoList);
  };

  // todoList에 있는 현재 상태(todo요소)를 삭제하는 이벤트 핸들러 함수
  const handleDeleteTodo = (index) => {
    // 1. React는 상태 원본을 변경해서는 안된다
    // 2. splice 함수 : mutates 함수라서 원본이 변경되는 함수이므로
    // state인 todoList에 직접적 사용 안됨(불면성의 법칙)

    // const newTodoList = [...todoList]; // todoList와 똑같은 배열 만들기 (복사)
    // splice(어디서부터 잘라낼 것인지 index, 몇개 자를 것인지)
    // newTodoList.splice(index, 1);

    // filter는 새로운 배열을 반환하므로 직접 원본 배열을 복사할 필요 x
    const newTodoList = todoList.filter((todo, i) => i !== index);
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>나의 TodoList</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleToggleTodo(index)}>
              {todo.isDone ? "미완료" : "완료"}
            </button>
            <button onClick={() => handleDeleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
