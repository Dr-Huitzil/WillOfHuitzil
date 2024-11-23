import React from "react";
import StarsAnimation from "./Background/StarsAnimation";
import Content from "./Content"


const App = () => (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        <StarsAnimation />

        <div className="content">
            <Content />
        </div>
    </div>
);

export default App;
