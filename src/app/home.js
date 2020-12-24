import React, { useState } from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import LineChart from "./linechart/linechart";
import SelectBox from "./linechart/selectbox";
import SelectButton from "./linechart/selectbutton";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { IoUmbrellaOutline, IoHomeOutline } from "react-icons/io5";
import { RiMoneyPoundCircleLine, RiMoneyPoundBoxLine } from "react-icons/ri";
import LineChartNPV from "./linechart/linechartNPV";

const colorRange = ["#2075D3", "#52BC46", "#931E66", "#f4a261ff", "#e76f51ff"];

const AssetsDataset = [
  {
    All: [
      {
        key: "Zoopla",
        values: [
          {
            value: 150000,
            date: "16/10/2020",
            verified: false,
          },
          {
            value: 170000,
            date: "14/11/2020",
            verified: true,
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
            value: 78000,
            date: "06/10/2020",
            verified: true,
          },
          {
            value: 250000,
            date: "21/11/2020",
            verified: true,
          },
          {
            value: 60000,
            date: "30/12/2020",
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
    Property: [
      {
        key: "Zoopla",
        values: [
          {
            value: 150000,
            date: "16/10/2020",
            verified: false,
          },
          {
            value: 170000,
            date: "14/11/2020",
            verified: true,
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
            value: 78000,
            date: "06/10/2020",
            verified: true,
          },
          {
            value: 250000,
            date: "21/11/2020",
            verified: true,
          },
          {
            value: 60000,
            date: "30/12/2020",
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
];

const DebtDataset = [
  {
    All: [
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
];

const InsuranceDataset = [
  {
    All: [
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
    Life: [
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
];

const OverviewTotals = [
  {
    NPV: [
      {
        value: 1532000,
        date: "02/03/2020",
      },
    ],
    Assets: {
      value: 120000,
      date: "02/03/2020",
    },
    Debts: {
      value: 123000,
      date: "02/03/2020",
    },
    Insurence: {
      value: 20000,
      date: "02/03/2020",
    },
  },
];

function Home() {
  const [dataSelection, setChildData] = useState("");
  const [TextTest, setTextTest] = useState("");
  let [LifeDeathToggle, setToggle] = useState(false);

  if (LifeDeathToggle === true) {
    OverviewTotals[0].NPV[0].value =
      OverviewTotals[0].Assets.value - OverviewTotals[0].Debts.value;
  } else {
    OverviewTotals[0].NPV[0].value =
      OverviewTotals[0].Assets.value +
      OverviewTotals[0].Insurence.value -
      OverviewTotals[0].Debts.value;
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab onClick={() => setChildData("All")}>
            <div className="tab-icon">
              <RiMoneyPoundCircleLine />
            </div>
            NPV
          </Tab>
          <Tab onClick={() => setChildData("All")}>
            <div className="tab-icon">
              <IoHomeOutline />{" "}
            </div>
            Assets
          </Tab>
          <Tab onClick={() => setChildData("All")}>
            <div className="tab-icon">
              <RiMoneyPoundBoxLine />
            </div>
            Debts
          </Tab>
          <Tab onClick={() => setChildData("All")}>
            <div className="tab-icon">
              <IoUmbrellaOutline />
            </div>
            Insurance
          </Tab>
        </TabList>

        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={12} lg={12} className="u-pt-gi">
                <div className="tg-list">
                  <input id="cb1" className="tgl tgl-light" type="checkbox" />
                  Life{" "}
                  <label
                    className="tgl-btn"
                    htmlFor="cb1"
                    onClick={() =>
                      setToggle((LifeDeathToggle = !LifeDeathToggle))
                    }
                  ></label>{" "}
                  Death
                </div>

                <LineChartNPV
                  ChartData={OverviewTotals}
                  dataSelection={dataSelection}
                  dataHidden={TextTest}
                  colorRange={colorRange}
                />
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={12} lg={12} className="u-pt-gi">
                <Row center="xs">
                  <Grid>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row start="md" center="xs">
                          <SelectBox
                            ChartData={AssetsDataset}
                            passChildData={setChildData}
                          />
                        </Row>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row end="md" center="xs">
                          <SelectButton
                            ChartData={AssetsDataset}
                            dataSelection={dataSelection}
                            passTextUp={setTextTest}
                            colorRange={colorRange}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <LineChart
                          ChartData={AssetsDataset}
                          dataSelection={dataSelection}
                          dataHidden={TextTest}
                          colorRange={colorRange}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={12} lg={12} className="u-pt-gi">
                <Row center="xs">
                  <Grid>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row start="md" center="xs">
                          <SelectBox
                            ChartData={DebtDataset}
                            passChildData={setChildData}
                          />
                        </Row>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row end="md" center="xs">
                          <SelectButton
                            ChartData={DebtDataset}
                            dataSelection={dataSelection}
                            passTextUp={setTextTest}
                            colorRange={colorRange}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <LineChart
                          ChartData={DebtDataset}
                          dataSelection={dataSelection}
                          dataHidden={TextTest}
                          colorRange={colorRange}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={12} lg={12} className="u-pt-gi">
                <Row center="xs">
                  <Grid>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row start="md" center="xs">
                          <SelectBox
                            ChartData={InsuranceDataset}
                            passChildData={setChildData}
                          />
                        </Row>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} className="u-pt-gi">
                        <Row end="md" center="xs">
                          <SelectButton
                            ChartData={InsuranceDataset}
                            dataSelection={dataSelection}
                            passTextUp={setTextTest}
                            colorRange={colorRange}
                          />
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <LineChart
                          ChartData={InsuranceDataset}
                          dataSelection={dataSelection}
                          dataHidden={TextTest}
                          colorRange={colorRange}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default Home;
