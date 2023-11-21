import React from "react";
import { Row, Col } from "reactstrap";

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => (
  <div>
    <div className="content">
      <Row>
        <Col xs={12} md={12}>
          <div className="col-lg-12 col-xl-12 col-md-12 col-12">
            <section className="box">
              <header className="panel_header">
                <h2 className="title float-left">Pt Booking Dashboard</h2>
              </header>
              <div className="content-body">
                <div className="row">
                  <div className="col-12">
                    <iframe
                      width="100%"
                      height="800"
                      src={`https://lookerstudio.google.com/embed/reporting/e3de8617-db03-45e8-a67c-b39094bb3049/page/4VDGB?params=%7B"ds27.instructor_id":"${userId}"%7D`}
                      frameBorder="0"
                      // style="border:0"
                      title="Pt Booking Dashboard"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);






export default Dashboard;
