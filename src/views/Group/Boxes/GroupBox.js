import React, { Component } from "react";
import axios from "axios";

class GroupBox extends Component {
  state = {
    groupName: "",
    groupDescription: "",
    src:
      "https://i.pinimg.com/originals/70/f5/43/70f5434216f0fb0a45c4d75d83f41b5b.jpg"
  };

  componentDidMount = () => {
    this.groupInfo();
  };

  groupInfo = () => {
    axios
      .get("/api/getGroupData", { params: { groupID: this.props.groupID } })
      .then(response => {
        this.setState({
          groupName: response.data.groupName,
          groupDescription: response.data.groupDescription
        });
      });
  };

  renderGroup = () => {
    this.props.history.push(`/group/${this.props.groupID}`);
  };

  //  <h1 className="group-title">{this.state.groupName}</h1>
  // <h4 className="group-description">{this.state.groupDescription}</h4>

  render = () => {
    return (
      <div className="group-box back-color">
        <div className="card">
          <div className="card__side card__side--front">
            <div className="card__heading">
              <span className="card__heading-span">{this.state.groupName}</span>
            </div>

            <div className="card__details">
              <h6 className="card__details-span">
                {this.state.groupDescription}
              </h6>
            </div>
          </div>
          <div className="card__side card__side--back card__side--back-1">
            <div className="card__cta">
              <div className="card-button" onClick={this.renderGroup}>
                View Group
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

// <div class="card">
// <div class="card__side card__side--front">

//   <div class="card__picture card__picture--1">
//     &nbsp;
//   </div>
//   <h4 class="card__heading">
//     <span class="card__heading-span card__heading-span--1">
//       The Sea Explorer
//     </span>
//   </h4>

//   <div class="card__details">
//     <ul>
//       <li>3 day tours</li>
//       <li>Up to 30 people</li>
//       <li>2 tour gudies</li>
//       <li>Sleep in cozy hotels</li>
//       <li>Difficulty: easy</li>
//     </ul>
//   </div>

// </div>
// <div class="card__side card__side--back card__side--back-1">
//   <div class="card__cta">
//     <div class="card__price-box">
//       <p class="card__price-only">only</p>
//       <p class="card__price-value">$297</p>
//     </div>
//     <a href="#popup" class="btn btn--white">Book now!</a>
//   </div>
// </div>
//           </div>

export default GroupBox;
