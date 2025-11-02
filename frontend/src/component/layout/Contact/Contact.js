import React from "react";
import "./Contact.css";
import { Button, Typography } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const Contact = () => {
  return (
    <div className="contactContainer">
      <div className="contactCard">
        <Typography variant="h3" className="contactTitle">
          Get in Touch 💬
        </Typography>
        <Typography variant="body1" className="contactText">
         “Have a question about our products or services? We’d love to help — reach out anytime and we’ll get back to you soon!”
        </Typography>

        <a className="mailBtn" href="mailto:bsrajput05052006@gmail.com">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EmailIcon />}
            className="contactButton"
          >
            Email Me
          </Button>
        </a>

        <div className="socialLinks">
          <a href="https://instagram.com/BuntySingh" target="_blank" rel="noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://linkedin.com/in/BuntySingh" target="_blank" rel="noreferrer">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/BuntySingh" target="_blank" rel="noreferrer">
            <GitHubIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
