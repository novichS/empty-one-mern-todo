import React from "react";
import { NavLink } from "react-router-dom";

export const HomePage = () => {

    return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <h1 className="purple-text text-darken-4">Home Page</h1>
                    <div className="card purple lighten-3">
                        <div className="card-content deep-purple-text text-lighten-5">
                            <span className="card-title">Hi, there!</span>
                            <p>
                            In this simple app we will store all your ToDo items.
                            Are you ready to try it?
                            Do you see this button above?
                            Click it!
                            </p>
                        </div>
                        <div className="card-action">
                            <NavLink
                                to="/createit"
                                className="btn purple darken-4 waves-effect waves-light"
                            >
                                Your ToDo
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
    );
};
