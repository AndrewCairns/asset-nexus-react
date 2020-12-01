import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

function GridView() {
  return (
    <div>
        <h1>Grid y'all</h1>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3} className="u-pt-gi">
              <div className="card">
                <div className="card__head">
                  {/* <img src="" alt="card example" /> */}
                </div>
                <div className="card__body">
                  <h1>This is a card</h1>
                  <p>This is the card body.</p>
                </div>
                <div className="card__foot">
                  <button className="btn">This is the card footer</button>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={6} className="u-pt-gi">
              <div className="card">
                <div className="card__head">
                  {/* <img src="" alt="card example" /> */}
                </div>
                <div className="card__body">
                  <h1>This is a card</h1>
                  <p>This is the card body.</p>
                </div>
                <div className="card__foot">
                  <button className="btn">This is the card footer</button>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="u-pt-gi">
              <div className="card">
                <div className="card__head">
                  {/* <img src="" alt="card example" /> */}
                </div>
                <div className="card__body">
                  <h1>This is a card</h1>
                  <p>This is the card body.</p>
                </div>
                <div className="card__foot">
                  <button className="btn">This is the card footer</button>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
    </div>
  );
}

export default GridView;
