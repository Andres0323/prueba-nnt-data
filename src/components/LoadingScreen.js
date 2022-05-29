import React from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import AppStyles from '../App.css';

const LoadingScreen = () => (
  <Row>
    <Col md={12}>
      <div style={{ textAlign: ' center', marginTop: '20%', marginBottom: '20%' }}>
        <Spinner animation="border" variant="warning" size={50} />
        <br />
        <span>Loading...</span>
      </div>
    </Col>
  </Row>
);

export default LoadingScreen;
