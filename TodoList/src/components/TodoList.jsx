import { useEffect, useState } from "react";
import { axiosApi } from "./../api/axiosApi";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [newTodoData, setNewTodoData] = useState([]);

  // todoList 조회
  const getTodoList = async () => {
    try {
      const resp = await axiosApi.get("/todo/show");
      console.log(resp.data);

      if (resp.status === 200) {
        setNewTodoData(resp.data);
      }
    } catch (error) {
      console.log("TodoList 조회 중 예외 발생 : ", error);
    }
  };

  const [form, setForm] = useState({
    todoTitle: "",
    todoContent: "",
    complete: "",
  });

  // 객체형태 상태 변경 함수
  const handleChange = (e) => {
    const { id, value } = e.target; // 대상의 id 속성값, value값을 꺼내옴
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // addTodo 버튼 클릭 시
  const handleAddTodo = async () => {
    const { todoTitle, todoContent } = form;

    if (todoTitle.length === 0 || todoContent.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const response = await axiosApi.post("/todo/addTodo", {
        todoTitle: todoTitle,
        todoContent: todoContent,
        complete: "N",
      });

      if (response.status === 200) {
        getTodoList();
      }

      setForm({
        todoTitle: "",
        todoContent: "",
        complete: "",
      });
    } catch (err) {
      alert(err.response.data);
    }
  };

  // 완료 / 미완료 상태 변환
  const handleToggleTodo = async (todoNo, complete) => {
    const resp = await axiosApi.put("/todo/complete", {
      todoNo: todoNo,
      complete: complete,
    });

    setNewTodoData((prevData) =>
      prevData.map((todo) =>
        todo.todoNo === todoNo ? { ...todo, complete: complete } : todo
      )
    );
  };

  // todo 삭제
  const handleDeleteTodo = async (todoNo) => {
    try {
      const resp = await axiosApi.delete("/todo/delete", {
        data: { todoNo: todoNo },
      });

      if (resp.status === 200) {
        getTodoList();
      }
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getTodoList();
    handleToggleTodo();
  }, []);

  return (
    <div>
      <h1>나의 TodoList</h1>

      <input
        id="todoTitle"
        type="text"
        value={form.todoTitle || ""}
        onChange={handleChange}
        placeholder="제목을 입력하세요"
      />

      <textarea
        id="todoContent"
        value={form.todoContent || ""}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
      />

      <button onClick={handleAddTodo}>Add Todo</button>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>등록일</th>
            <th>완료여부</th>
            <th>삭제버튼</th>
          </tr>
        </thead>
        <tbody>
          {newTodoData.map((todo, index) => (
            <tr key={index}>
              <td id="todoNo">{todo.todoNo}</td>
              <td>{todo.todoTitle}</td>
              <td>{todo.todoContent}</td>
              <td>{todo.regDate}</td>
              <td>
                <button
                  className={todo.complete === "Y" ? "complete-yes" : ""}
                  onClick={() =>
                    handleToggleTodo(
                      todo.todoNo,
                      todo.complete === "Y" ? "N" : "Y"
                    )
                  }
                >
                  {todo.complete}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteTodo(todo.todoNo)}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
