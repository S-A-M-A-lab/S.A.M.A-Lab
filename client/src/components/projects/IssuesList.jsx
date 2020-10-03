import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
class IssuesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issue: {
        title: "",
        description: "",
        posterID: "1",
        state: "open",
        projectID: this.props.projectID,
      },

      issues: [],
    };
    this.getIssues = this.getIssues.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.addIssue = this.addIssue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getIssues() {
    let id = this.props.projectID;
    console.log(id)
    axios.get(`/get_Issue/${id}`).then((res) => {
      this.setState({
        issues: res.data,
      });
    });
  }

  componentDidMount() {
    this.getIssues();
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.state.issue[name] = value;
    this.setState({
      issue: this.state.issue,
    });
  }

  addIssue(e) {
    e.preventDefault();

    axios.post("/issues/add", this.state.issue).then((res) => {
      this.getIssues();
    });
  }

  update(id) {
    axios.put(`/update_Issue/${id}`).then((res) => {
      console.log(res.data);
    });
  }

  delete(id) {
    axios.post(`/delete_issue/${id}`).then((res) => {
      this.getIssues();
    });
  }
  render() {
    let issues = this.state.issues;
    return (
      <div>
        <div>
          <form>
            <h2>add issues</h2>
            <label>title</label>
            <input type="text" name="title" onChange={this.handleChange} />
            <label>description</label>

            <input
              type="textarea"
              name="description"
              onChange={this.handleChange}
            />
            <input type="submit" onClick={this.addIssue} />
          </form>
        </div>
        <div>
          <ul className="list-group">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/issue/${issue.id}`} >{issue.title} </Link>
                <span className="badge badge-success badge-pill">
                  {issue.state}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default IssuesList;
