import React, { useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import LineChart from "./linechart/linechart";
import SelectBox from "./linechart/selectbox";
import SelectButton from "./linechart/selectbutton";

const ChartData = {
  Assets: [
    {
      Property: [
        {
          key: "Zoopla Value",
          values: [
            {
              value: 150000,
              date: "16/10/2020",
              verified: false,
            },
            {
              value: 180000,
              date: "16/11/2020",
              verified: false,
            },
            {
              value: 130000,
              date: "16/12/2020",
              verified: false,
            },
          ],
        },
        {
          key: "Survey Valuation",
          values: [
            {
              value: 138000,
              date: "16/10/2020",
              verified: true,
            },
          ],
        },
        {
          key: "Mortgage Advance",
          values: [
            {
              value: 115000,
              date: "16/10/2020",
              verified: true,
            },
          ],
        },
      ],
      Pensions: [
        {
          key: "Zurich",
          values: [
            {
              value: 200000,
              date: "17/12/2009",
              verified: true,
            },
          ],
        },
      ],
    },
  ],
  Debts: [
    {
      "Mortgage(s)": [
        {
          key: "Danske Bank",
          values: [
            {
              value: 115000,
              date: "03/03/2018",
              verified: true,
            },
            {
              value: 125000,
              date: "03/03/2019",
              verified: true,
            },
            {
              value: 145000,
              date: "03/03/2020",
              verified: true,
            },
            {
              value: 185000,
              date: "03/03/2021",
              verified: true,
            },
          ],
        },
      ],
      "Credit Card(s)": [
        {
          key: "Barclays",
          values: [
            {
              value: 2000,
              date: "03/03/2018",
              verified: true,
            },
          ],
        },
      ],
      "Bank Loan(s)": [
        {
          key: "HSBC",
          values: [
            {
              value: 10000,
              date: "01/01/2020",
              verified: true,
            },
          ],
        },
      ],
    },
  ],
  Insurance: [
    {
      "Policy type??": [
        {
          key: "Aviva",
          values: [
            {
              value: 500000,
              date: "02/03/2015",
              verified: true,
            },
          ],
        },
      ],
    },
  ],
};

function Home() {
  const [dataSelection, setChildData] = useState("");
  const [TextTest, setTextTest] = useState("");

  return (
    <>
      <Grid fluid>
        <Row>
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
        </Row>
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
