import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:bsrajput05052006@gmail.com">
        <Button>Contact: bsrajput05052006@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
