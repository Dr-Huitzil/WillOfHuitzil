import React from "react";
import StarsAnimation from "./Background/StarsAnimation";
import Name from "./Sections/Name";

const App = () => (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        <StarsAnimation>
            <Name />
        </StarsAnimation>
    </div>
);

export default App;
