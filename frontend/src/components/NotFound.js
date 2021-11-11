import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";
import { getLocalStorage } from "../helpers/localStorage";

const NotFound = () => {
  return (
    <>
      <div class="container">
        <div class="error">
          <p class="p">4</p>
          <span class="dracula">
            <div class="con">
              <div class="hair"></div>
              <div class="hair-r"></div>
              <div class="head"></div>
              <div class="eye"></div>
              <div class="eye eye-r"></div>
              <div class="mouth"></div>
              <div class="blod"></div>
              <div class="blod blod2"></div>
            </div>
          </span>
          <p class="p">4</p>

          <div class="page-ms">
            <p class="page-msg">
              {" "}
              Oops, the page you're looking for Disappeared{" "}
            </p>
            {getLocalStorage() && getLocalStorage().role === 1 ? (
              <button class="go-back">
                {" "}
                <Link to="/admin/home"> Go Back</Link>
              </button>
            ) : (
              <button class="go-back">
                {" "}
                <Link to="/"> Go Back</Link>
              </button>
            )}
          </div>
        </div>
      </div>

      <iframe
        style={{ width: "0", height: "0", border: "0", border: "none" }}
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="https://instaud.io/_/2Vvu.mp3"
      ></iframe>
    </>
  );
};

export default NotFound;
