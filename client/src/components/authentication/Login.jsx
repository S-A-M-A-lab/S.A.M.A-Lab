import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      username: null,
      password: null,
      nextpath: "/home",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    axios
      .get("/name")
      .then((res) => {
        this.setState({
          allUsers: res.data.map((element) => Object.values(element)).flat(),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.allUsers.indexOf(this.state.username) === -1) {
      alert("name or password are wrong");
      return false;
    }
    axios
      .post("/login", this.state)
      .then((res) => {
        if (res.data === true) {
          this.props.func(this.state.username, this.state.nextpath);
        } else {
          this.props.func(null, "/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required="required"
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required="required"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
        </form>
        <p className="text-center">
          <a href="/users" onClick={() => {}}>
            Create an Account
          </a>
        </p>
      </div>
    );
  }
}

export default Login;
