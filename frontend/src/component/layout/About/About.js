import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/anxrudh_28";
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>

      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="images/Profile.png"
              alt="Founder"
            />
            <Typography>Bunty Singh</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample website made by @buntysingh and @anirudha only for the
              purpose of learning how to deal with big projects.
            </span>
          </div>

          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect with Us</Typography>

            <div className="socialIcons">
              <a href="https://instagram.com/anxrudh_28" target="blank">
                <InstagramIcon className="instagramSvgIcon" />
              </a>
              <a href="https://www.linkedin.com/in/bunty-singh-431389332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="blank">
                <LinkedInIcon className="linkedinSvgIcon" />
              </a>
              <a href="https://github.com/bunty031" target="blank">
                <GitHubIcon className="githubSvgIcon" />
              </a>
              <a href="https://youtube.com/@BuntySingh-e2n" target="blank">
                <YouTubeIcon className="youtubeSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
