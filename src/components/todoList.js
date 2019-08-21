import React, { useReducer, useState } from "react";
import { initialState, Reducer } from "../reducers/reducer";
import moment from "moment";
import { Input, Button, Card, Segment, Header } from "semantic-ui-react";

// use reducer hook to get array of todos and display them with .map and TodoItem
function TodoList() {
  const now = moment();

  const [todo, setTodo] = useState({
    item: "",
    due: "",
    tags: []
  });

  const [state, dispatch] = useReducer(Reducer, initialState);

  const handleChanges = e => {
    e.preventDefault();
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const handleTagChanges = e => {
    e.preventDefault();
    setTodo({ ...todo, tags: e.target.value.split(/[ ,]+/) });
  };

  const toggleComplete = id => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  };
  const clearComplete = () => {
    dispatch({ type: "CLEAR_COMPLETE" });
  };

  return (
    <div>
      <Header as="h1" className="head">Todo</Header>
      <div className="form">
        <Input
          type="text"
          name="item"
          value={todo.item}
          onChange={handleChanges}
          placeholder="Todo"
          icon="sticky note outline"
        />
        <Input
          type="text"
          name="tags"
          value={todo.tags}
          onChange={handleTagChanges}
          placeholder="Tags"
          icon="tags"
        />
        <Input
          type="date"
          name="due"
          value={todo.due}
          onChange={handleChanges}
          label="Due"
          labelPosition="right corner"
          size="small"
        />
        <Button
          basic
          color="teal"
          onClick={() => {
            dispatch({ type: "NEW_TODO", payload: todo });
            setTodo({
              item: "",
              due: "",
              tags: []
            });
          }}
        >
          Add Todo
        </Button>
        <Button
          basic
          color="green"
          onClick={e => {
            e.preventDefault();
            clearComplete();
          }}
        >
          Clear Complete
        </Button>
      </div>
      {/* <h1>Todo:</h1> */}
      <Card.Group centered>
        {state.map(todo => (
          <Card
            onClick={e => {
              e.preventDefault();
              // console.log('todo.id', todo.id)
              toggleComplete(todo.id);
            }}
          >
            <Card.Meta textAlign="left">
              Due: {todo.due}{" "}
              {todo.completed && <p>Done: {todo.time_completed}</p>}
            </Card.Meta>

            <Card.Content
              className={`todo${todo.completed ? " complete" : ""}`}
              id={`${moment(todo.due).isBefore(now) ? "overdue" : ""}`}
            >
              {todo.item}
            </Card.Content>

            <Card.Content extra>
              <div style={tagsStyle}>
                {todo.tags.map(tag => (
                  <Segment basic compact size="mini">
                    {tag}
                  </Segment>
                ))}
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

const tagsStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline"
};

export default TodoList;
