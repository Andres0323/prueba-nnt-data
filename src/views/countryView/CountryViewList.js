import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, Container, Nav, Navbar, Row,
} from 'react-bootstrap';
import {
  Moon as MoonIcon,
} from 'react-feather';
import endPoints from 'endPoints/endPoints';
import { Loader } from 'components';
import { masterMessages } from 'constantes';

class CountryViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryArray: [],
      loading: true,
    };
  }

  /**
   * @name componentDidMount
   * @desc Metodo que se llama despues de que el componente ha sido cargado
   */
  componentDidMount() {
    this.init();
  }

  init = async () => {
    // Hago consulta al api para cargar data a mostrar
    try {
      const form = await this.loadFields();

      // Cargo las variables
      this.setState({
        countryArray: form,
        loading: false,
      });
    } catch (e) {
      throw Error(e);
    }
  };

  /**
   * @name loadFields
   * @desc Metodo que realiza llamada al api para cargar datos a listar
   * @returns
   */
  loadFields = async () => {
    const url = `${endPoints.appHttps.getAll}`;
    const data = await fetch(url)
      .then((res) => res.json()); // se formatea respuesta

    return data;
  };

  render() {
    const { loading, countryArray } = this.state; // Cargo valores para actualizar vista
    const { title } = masterMessages.app; // Carga los mensajes a mostrar

    return loading ? <Loader /> : (
      <>
        {/* Header */}
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand href="/">{ title }</Navbar.Brand>
            <Nav>
              <MoonIcon size={22} style={{ marginTop: 4 }} />
              <Button size="sm" style={{ fontSize: 11, margin: 2 }}>
                Light / Dark
              </Button>
            </Nav>
          </Container>
        </Navbar>

        {/* Contenido */}
        <div style={{ marginTop: 20, padding: 5, marginLeft: 10 }}>
          {/* Botones de buscar y filtro */}

          <Row>
            {countryArray.map((item, index) => (
              <>
                <Col xs={12} md={3} lg={3} key={`a-${index}`} style={{ marginTop: 20 }}>
                  <Card style={{ width: '17rem' }}>
                    <Nav.Link href={endPoints.app.detail}>
                      <Card.Img variant="top" src={item.flags.png} style={{ height: '10rem' }} />
                    </Nav.Link>
                    <h1 style={{ marginLeft: 15 }}>{item.name}</h1>
                    <Card.Body style={{ height: '7rem' }}>
                      <span>
                        Population:
                        {' '}
                        {item.population.toLocaleString('es-CO')}
                      </span>
                      <br />
                      <span>
                        Región:
                        {' '}
                        {item.region}
                      </span>
                      <br />
                      <span>
                        Capital:
                        {' '}
                        {item.capital}
                      </span>
                      <br />
                    </Card.Body>
                  </Card>
                </Col>
                <br />
              </>
            ))}
          </Row>
        </div>
      </>
    );
  }
}

CountryViewList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default CountryViewList;
