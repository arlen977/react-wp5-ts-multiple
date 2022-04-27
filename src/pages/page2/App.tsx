import React from "react";
import { getQueryVariable } from "@/utils";

import "./App.less";

const App = () => {
    console.log(getQueryVariable);
    return (
        <>
            <h1 className="warning">第二页</h1>
        </>
    );
};

export default App;
