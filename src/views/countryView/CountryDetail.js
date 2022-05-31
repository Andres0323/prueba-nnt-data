import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Col, Button, Row, Badge,
} from 'react-bootstrap';
import {
  ArrowLeft as ArrowLeftIcon,
} from 'react-feather';
import endPoints from 'endPoints/endPoints';
import { Loader } from 'components';

class CountryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [],
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

  /**
   * @name init
   * @desc Metodo que inicializa variables y metodos iniciales
   * @returns {Promise<void>}
   */
  init = async () => {
    const { match: { params: { pais } } } = this.props;
    // Hago consulta al api para cargar data a mostrar
    try {
      const form = await this.loadFields(pais.toLowerCase());

      // Cargo las variables
      this.setState({
        countryData: form,
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
  loadFields = async (pais) => {
    const url = `${endPoints.appHttps.base}/name/${pais}`;
    const data = await fetch(url)
      .then((res) => res.json()); // se formatea respuesta

    return data[0];
  };

  /**
   * @name back
   * @desc Metodo para ir a la ruta anterior
   */
  back = () => {
    const { history: { goBack } } = this.props;

    goBack();
  };

  render() {
    const { loading, countryData } = this.state; // Cargo valores para actualizar vista

    return loading ? <Loader /> : (
      <>
        {/* Contenido */}
        <div style={{ marginTop: 20, padding: 5, marginLeft: 10 }}>
          {/* Botones de buscar y filtro */}

          <Row>
            <>
              <Row>
                <Col xs={12} md={3}>
                  <Button variant="secondary" onClick={() => this.back()}>
                    <ArrowLeftIcon size={20} />
                    Atrás
                  </Button>
                </Col>
              </Row>

              <Col xs={12} md={12} lg={12} style={{ marginTop: 20 }}>
                <Card>
                  <Row>
                    <Col xs={12} md={5} lg={5}>
                      <Card.Img variant="top" src={countryData.flags.png || ''} style={{ height: '15rem' }} />
                    </Col>

                    <Col xs={12} md={7} lg={7}>
                      <h1 style={{ marginTop: 25 }}>{countryData.name || ''}</h1>

                      <Row>
                        <Col xs={12} md={6} lg={6}>
                          <div style={{ marginTop: 20, height: '7rem' }}>
                            <span>
                              Native Name:
                              {' '}
                              {countryData.nativeName || ''}
                            </span>
                            <br />
                            <span>
                              Population:
                              {' '}
                              {countryData.population.toLocaleString('es-CO') || ''}
                            </span>
                            <br />
                            <span>
                              Region:
                              {' '}
                              {countryData.region || ''}
                            </span>
                            <br />
                            <span>
                              Sub Region:
                              {' '}
                              {countryData.subregion || ''}
                            </span>
                            <br />
                            <span>
                              Capital:
                              {' '}
                              {countryData.capital || ''}
                            </span>
                            <br />
                          </div>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                          <div style={{ marginTop: 20, height: '7rem' }}>
                            <span>
                              Top Level Domain:
                              {' '}
                              {countryData.topLevelDomain || ''}
                            </span>
                            <br />
                            <span>
                              Currencies:
                              {' '}
                              {countryData.currencies[0].code || ''}
                            </span>
                            <br />
                            <span>
                              Languages:
                              {' '}
                              {countryData.languages[0].name || ''}
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <div style={{ marginTop: '2rem' }}>
                        <span>
                          Border Countries:
                          {' '}
                          {countryData.borders.map((item) => (
                            <Badge bg="secondary" style={{ margin: 3 }}>{item}</Badge>
                          ))}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </>
          </Row>
        </div>
      </>
    );
  }
}

CountryDetail.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  // Permite sacar parameros de las rutas
  match: PropTypes.shape({
    params: PropTypes.shape({
      pais: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CountryDetail;
