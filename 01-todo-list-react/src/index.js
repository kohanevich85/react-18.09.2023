import React from 'react';
import ReactDOM from 'react-dom/client';

const todoList = [
    { id: 1, text: 'Learn React', isCompleted: true },
    { id: 2, text: 'Learn Redux', isCompleted: false },
    { id: 3, text: 'Learn React Router', isCompleted: false },
    { id: 4, text: 'Learn React Native', isCompleted: false },
    { id: 5, text: 'Learn GraphQL', isCompleted: false },
]

const TodoItem = ({todo}) => (
    <tr>
        <td>{todo.text}</td>
        <td>{todo.isCompleted ? 'Yes' : 'No'}</td>
    </tr>
)

const List = ({todoList}) => (
    <table>
        <thead>
        <tr>
            <th>Title</th>
            <th>Is completed</th>
        </tr>
        </thead>
        <tbody>
        {todoList.map((todo) => <TodoItem key={todo.id} todo={todo}/>)}
        </tbody>
    </table>
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <h1>Hello, world!</h1>

        <List todoList={todoList} />
    </>
);
