import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/content/Content";
import CurvedLineChart from "./components/content/curvedLineChart/CurvedLineChart";
import BarChart from "./components/content/barChart/BarChart";
import StakedBarChart from "./components/content/stakedBarChart/StakedBarChart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<StakedBarChart />} />
          <Route path="/barChart" element={<BarChart />} />
          <Route path="/curvedLineChart" element={<CurvedLineChart />} />
        </Routes>
      </Content>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
