import React, { useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import LineChart from "./linechart/linechart";
import SelectBox from "./linechart/selectbox";
import SelectButton from "./linechart/selectbutton";

const ChartData = [
  {
    Group: "Assets",
    Type: "Property",
    name: "Zoopla",
    value: 160000,
    date: "01/01/2020",
    verified: false,
  },
  {
    Group: "Assets",
    Type: "Property",
    name: "Zoopla",
    value: 170000,
    date: "01/02/2020",
    verified: false,
  },
  {
    Group: "Assets",
    Type: "Property",
    name: "Zoopla",
    value: 180000,
    date: "01/03/2020",
    verified: false,
  },
  {
    Group: "Assets",
    Type: "Property",
    name: "Survey 1",
    value: 138000,
    date: "02/02/2020",
    verified: false,
  },
  {
    Group: "Assets",
    Type: "Property",
    name: "Survey 2",
    value: 142000,
    date: "03/03/2020",
    verified: false,
  },
  {
    Group: "Assets",
    Type: "Property",
    name: "Mortgage Advance",
    value: 112000,
    date: "04/04/2020",
    verified: true,
  },
  {
    Group: "Assets",
    Type: "Pensions",
    name: "Zurich",
    value: 200000,
    date: "05/05/2020",
    verified: true,
  },
  {
    Group: "Debts",
    Type: "Mortgage",
    name: "Danske",
    value: 182000,
    date: "06/06/2020",
    verified: false,
  },
  {
    Group: "Debts",
    Type: "Mortgage",
    name: "Northern",
    value: 212000,
    date: "07/07/2020",
    verified: true,
  },
  {
    Group: "Debts",
    Type: "Mortgage",
    name: "AIB",
    value: 410000,
    date: "08/08/2020",
    verified: true,
  },
  {
    Group: "Debts",
    Type: "Credit cards",
    name: "Barcleys",
    value: 821000,
    date: "09/09/2020",
    verified: false,
  },
  {
    Group: "Debts",
    Type: "Credit cards",
    name: "HSBC",
    value: 121000,
    date: "10/10/2020",
    verified: true,
  },
  {
    Group: "Insurance",
    Type: "Life",
    name: "LV",
    value: 182000,
    date: "11/11/2020",
    verified: false,
  },
  {
    Group: "Insurance",
    Type: "Home",
    name: "Aviva",
    value: 212000,
    date: "12/12/2020",
    verified: true,
  },
];

function Home() {
  const [dataSelection, setChildData] = useState("");
  const [TextTest, setTextTest] = useState("");

  return (
    <>
      <Grid fluid>
        {/* <Row>
          <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
            <Row start="lg" center="xs">
              <SelectBox ChartData={ChartData} passChildData={setChildData} />
            </Row>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
            <Row center="xs" end="lg">
              <SelectButton
                ChartData={ChartData}
                dataSelection={dataSelection}
                passTextUp={setTextTest}
              />
            </Row>
          </Col>
        </Row> */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <LineChart
              ChartData={ChartData}
              dataSelection={dataSelection}
              dataHidden={TextTest}
            />
          </Col>
        </Row>
      </Grid>
    </>
  );
}

export default Home;
