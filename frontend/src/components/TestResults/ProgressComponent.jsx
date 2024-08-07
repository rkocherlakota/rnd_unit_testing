import { useState } from "react";
import { useUser } from "../UserContext";
import { Spin } from "antd";
export default function ProgressComponent({ progressInfo }) {
  // const {t}=useUser();

  return (
    <div className="extraction" ref={progressInfo.progressRef}>
      <h3>
        {" "}
        {progressInfo.icon} {progressInfo.heading} {progressInfo.type ?"": <Spin size="small"/>}
      </h3>
      <div className="discription">
        {progressInfo.type && (
          <p>
            {" "}
            {/* <i className="fa-solid fa-circle-check"></i> */}
            {progressInfo.subHeading}{" "}
            <span
              className={`show-hide-link ${
                progressInfo.handleType ? "hide" : "show"
              }`}
              onClick={progressInfo.handleOnClick}
            >
              {progressInfo.handleType ? "Hide" : "Show"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
