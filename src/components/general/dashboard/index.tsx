"use client";
import { Container, Row } from "reactstrap";
import UserInfo from "./userInfo";

const Dashboard = () => {
  return (
    <Container fluid className="dashboard-3">
      <Row>
        {/* <UserInfo /> */}
        <h1>Hello from Dashboard</h1>
      </Row>
    </Container>
  );
};

export default Dashboard;
