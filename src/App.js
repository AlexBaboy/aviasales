import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import TicketsList from "./components/ticketList/TicketsList";
import store from "./reduxToolkit";

function App() {
    return (
        <Provider store={store}>
            <TicketsList />
        </Provider>,
        document.getElementById("root")
    );
}

export default App;
