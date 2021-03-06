import React, { useState } from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Sunburst from "./sunburst";
import { Col, Grid, Row } from "react-flexbox-grid";

import { IoUmbrellaOutline, IoHomeOutline } from "react-icons/io5";
import { RiMoneyPoundCircleLine, RiMoneyPoundBoxLine } from "react-icons/ri";

let colorPositive = ["#2075D3", "#4F90DC", "#7BACE5", "#BDD6F2"];
let colorNegative = ["#931E66", "#9E3676", "#BE79A4", "#DFBBD0"];
let colorArrayAssets = ["#52BC46", "#64C35A", "#98D791", "#CBEBC8"];
let colorArrayDebts = colorNegative;

var formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const OverviewTotals = {
  NPV: 1532000,
  Assets: 120000,
  Debts: 123000,
  Insurence: 20000,
};

let NPVDataValue = OverviewTotals.NPV;
let NPVcolor = colorArrayAssets[0];

const AssetsDataset = {
  name: "Assets",
  children: [
    {
      name: "Properties",
      children: [
        {
          name: "12a Ballymacormick Rd",
          value: 190000,
        },
        {
          name: "21 Bangor Ave",
          value: 290000,
        },
        {
          name: "84 Lisburn Drive",
          value: 87000,
        },
        {
          name: "54 Manor Hill",
          value: 145000,
        },
      ],
    },
    {
      name: "Vehicles",
      children: [
        {
          name: "VW Golf",
          value: 8534,
        },
        {
          name: "BMW M3",
          value: 15731,
        },
        {
          name: "Renault Megane",
          value: 2840,
        },
        {
          name: "Porche Boxter",
          value: 27840,
        },
      ],
    },
    {
      name: "Stocks",
      children: [
        {
          name: "Apple",
          value: 7074,
        },
        {
          name: "Google",
          value: 13023,
        },
      ],
    },
  ],
};

const DebtDataset = {
  name: "Debts",
  children: [
    {
      name: "Mortgages",
      children: [
        {
          name: "12a Ballymacormick Rd",
          value: 100000,
        },
        {
          name: "21 Bangor Ave",
          value: 190000,
        },
        {
          name: "84 Lisburn Drive",
          value: 47000,
        },
        {
          name: "54 Manor Hill",
          value: 95000,
        },
      ],
    },
    {
      name: "Credit card",
      children: [
        {
          name: "Danske",
          value: 12000,
        },
        {
          name: "Halifax",
          value: 22000,
        },
        {
          name: "Santander",
          value: 3000,
        },
        {
          name: "Monzo",
          value: 19000,
        },
      ],
    },
    {
      name: "Bank Loans",
      children: [
        {
          name: "Danske",
          value: 30000,
        },
        {
          name: "Halifax",
          value: 19000,
        },
        {
          name: "Student Loan",
          value: 19000,
        },
      ],
    },
    {
      name: "Personal",
      value: 6000,
    },
    {
      name: "Auto Loan",
      value: 3322,
    },
  ],
};

const InsuranceDataset = {
  name: "Life Insurance",
  children: [
    {
      name: "Aviva",
      value: 120000,
      date: "23/12/2026",
    },
    {
      name: "Zurich",
      value: 500000,
      date: "03/10/2040",
    },
    {
      name: "Vitality",
      value: 220000,
      date: "16/07/2068",
    },
  ],
};

function Overview() {
  let [LifeDeathToggle, setToggle] = useState(false);

  if (LifeDeathToggle === true) {
    NPVDataValue = OverviewTotals.Assets - OverviewTotals.Debts;
  } else {
    NPVDataValue =
      OverviewTotals.Assets + OverviewTotals.Insurence - OverviewTotals.Debts;
  }

  if (NPVDataValue >= 0) {
    NPVcolor = colorArrayAssets[1];
  } else {
    NPVcolor = colorNegative[0];
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            <div className="tab-icon">
              <RiMoneyPoundCircleLine />
            </div>
            NPV
          </Tab>
          <Tab>
            <div className="tab-icon">
              <IoHomeOutline />{" "}
            </div>
            Assets
          </Tab>
          <Tab>
            <div className="tab-icon">
              <RiMoneyPoundBoxLine />
            </div>
            Debts
          </Tab>
          <Tab>
            <div className="tab-icon">
              <IoUmbrellaOutline />
            </div>
            Insurance
          </Tab>
        </TabList>

        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={8} lg={8} className="u-pt-gi">
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
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <Row center="xs">
                  <div
                    className="metric-bubble"
                    style={{ background: NPVcolor }}
                  >
                    <h4>Net Present Value</h4>
                    <h2> {formatter.format(NPVDataValue)}</h2>
                  </div>
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={8} lg={8} className="u-pt-gi">
                <Row center="xs">
                  <Sunburst
                    ChartData={AssetsDataset}
                    colorsArray={colorArrayAssets}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={8} lg={8} className="u-pt-gi">
                <Row center="xs">
                  <Sunburst
                    ChartData={DebtDataset}
                    colorsArray={colorArrayDebts}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid fluid>
            <Row center="xs">
              <Col xs={12} sm={12} md={8} lg={8} className="u-pt-gi">
                <Row center="xs">
                  <Sunburst
                    ChartData={InsuranceDataset}
                    colorsArray={colorPositive}
                  />
                </Row>
              </Col>
            </Row>
          </Grid>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default Overview;
