import Vue from "nativescript-vue";

import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";


new Vue({

    template: `
        <Frame>
            <Main />
        </Frame>`,

    components: {
        Home,
        Login,
        Main,
    }
}).$start();
