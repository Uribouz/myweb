import React, { Component } from "react";
import "./App.css";
import { Input, Button, Card, List, Checkbox } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const URL = "http://localhost:1323/";

// Step-2. Setup AntDesign

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      todos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  async fetchAsync(url, opts) {
    this.setState({ isLoading: true });

    const resp = await fetch(url, opts);

    if (resp.status !== 200) {
      return;
    }

    this.setState({ isLoading: false });
    return resp.json();
  }

  async getTodos() {
    let todos = await this.fetchAsync(URL);

    this.setState({ todos });
  }

  render() {
    return (
      <div className="App">
        <Card>
          <h1>To-do-list</h1>

          <div style={{ marginBottom: "10px" }}>
            <Input.Search
              placeholder="input search text"
              enterButton="Add"
              size="large"
            />
          </div>

          <List
            bordered
            dataSource={this.state.todos}
            style={{ height: 300, overflow: "auto" }}
            loading={this.state.isLoading}
            header={
              <div style={{ position: "relative", height: 20 }}>
                <Checkbox
                  style={{ marginRight: 10, position: "absolute", left: 0 }}
                >
                  Select All
                </Checkbox>
                <Button.Group style={{ position: "absolute", right: 0 }}>
                  <Button type="dashed" size="small" style={{ marginRight: 5 }}>
                    All
                  </Button>
                  <Button type="dashed" size="small" style={{ marginRight: 5 }}>
                    Active
                  </Button>
                  <Button
                    type="danger"
                    size="small"
                    style={{
                      display: this.state.isLoading ? "none" : " ",
                      marginLeft: 10
                    }}
                  >
                    Clear completed
                  </Button>
                </Button.Group>
              </div>
            }
            renderItem={todo => (
              <List.Item
                actions={[
                  <CloseCircleOutlined
                    style={{ fontSize: 16, color: "rgb(255, 145, 0)" }}
                  />
                ]}
                style={{
                  textDecorationLine: todo.completed ? "line-through" : "none"
                }}
              >
                <Checkbox checked={todo.selected} style={{ marginRight: 10 }} />
                <h4>{todo.title}</h4>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default App;