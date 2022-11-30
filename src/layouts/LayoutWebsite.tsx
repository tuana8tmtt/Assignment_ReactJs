import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

type Props = {};

const LayoutWebsite = (props: Props) => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default LayoutWebsite;
