import React, { Component } from "react";
import axios from "axios";
import "../Group.css";

class GroupBox extends Component {
  state = {
    groupName: "",
    src: ""
  };

  componentDidMount = () => {
    this.groupInfo();
    this.arrayPics();
  };
  groupInfo = () => {
    axios
      .get("/api/getGroupData", { params: { groupID: this.props.groupID } })
      .then(response => {
        const groupName = response.data.groupName;
        this.setState({
          groupName
        });
      });
  };

  renderGroup = () => {
    this.props.history.push(`/group/${this.props.groupID}`);
  };
  arrayPics = () => {
    const pics = [
      "https://farm9.staticflickr.com/8358/8339167050_1c20778fd1_o.jpg",
      "https://fortunedotcom.files.wordpress.com/2011/02/monopoly_man.png",
      "https://hanslodge.com/images/di486EKie.png",
      "https://i.pinimg.com/236x/44/5e/ab/445eab2bb8c7d70419e912c9ca1ecad8--monopoly-man-pixel-art.jpg",
      "http://seo-focus.com/wp-content/uploads/2017/07/The-SEO-Monopoly-Hangover.png",
      "https://res.cloudinary.com/teepublic/image/private/s--o7w_2NEj--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_484849,e_outline:48/co_484849,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1512021715/production/designs/2121155_1.jpg",
      "http://www.stonecoldmagicmagazine.com/images/free-tricks/monopoly-man2.png",
      "https://img.etsystatic.com/il/0fae98/1228478536/il_340x270.1228478536_j3s8.jpg?version=0",
      "https://i.ytimg.com/vi/UFy4dcOtNm0/maxresdefault.jpg"
    ];
    const number = Math.floor(Math.random()*9);
    const chosenPic = pics[number]
    this.setState({
      src: chosenPic
    })
  }

  render = () => {
    return (
      <div className= "individualbox col s3">
        <div className="groupBox" onClick={this.renderGroup}>
          <div className="row">
            <div className="col s12">
              <div className="card medium">
                <div className="card-image">
                  <img
                    src={this.state.src}
                    alt="wallpaper"
                  />
                  <span className="card-title groupBox-name">
                    <p>
                      {this.state.groupName.length > 0
                        ? this.state.groupName
                        : null}
                    </p>
                  </span>
                  {/* <a className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons">add</i>
                  </a> */}
                </div>
                <div className="card-content">
                  <p>
                    I am a very simple card. I am good at containing small bits of
                    information. I am convenient because I require little markup
                    to use effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default GroupBox;
