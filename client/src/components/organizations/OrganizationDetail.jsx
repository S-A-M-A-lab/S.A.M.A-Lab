import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
class OrganizationDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  delete(e) {
    e.preventDefault();
    $.ajax({
      url: "/deleteOrg",
      data: JSON.stringify({
        userID: this.props.org.userID,
        id: this.props.org.id,
      }),
      type: "POST",
      contentType: "application/json",
    }).done(this.props.f());
  }

  render() {
    return (
      <div>
        <li className="list-group-item">
          <Link to="/organizations/1">{this.props.org.name}</Link>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.delete.bind(this)}
          >
            delete
          </button>
        </li>
      </div>
    );
  }
}

export default OrganizationDetail;
