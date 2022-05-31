import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Col, Nav, Row, InputGroup, FormControl, Form,
} from 'react-bootstrap';
import {
  Search as SearchIcon,
  RefreshCcw as RefreshCcwIcon,
} from 'react-feather';
import endPoints from 'endPoints/endPoints';
import { Loader } from 'components';
import { upperCaseString } from 'utils/functions';
import { masterMessages } from 'constantes';

const KEY_ENTER = 13; // Variable usada en comparación

const optionsArray = [ // Array de opciones en filtro
  {
    value: 'africa',
    label: 'Afríca',
  },
  {
    value: 'america',
    label: 'Ameríca',
  },
  {
    value: 'europe',
    label: 'Europa',
  },
  {
    value: 'oceania',
    label: 'Óceania',
  },
  {
    value: 'all',
    label: 'Todos',
  },
];

class CountryViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryArray: [],
      loading: true,
    };
    this.countryClon = [];
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
    // Hago consulta al api para cargar data a mostrar
    try {
      const form = await this.loadFields();

      // Cargo las variables
      this.countryClon = form;
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

  /**
   * @name loadFieldsByFilter
   * @desc Metodo que realiza llamada al api para cargar datos a listar segun la region
   * @returns
   */
  loadFieldsByFilter = async (region) => {
    const url = `${endPoints.appHttps.base}/continent/${region}`;
    const data = await fetch(url)
      .then((res) => res.json()); // se formatea respuesta

    const resp = (data.message !== 'Page Not Found') ? data : [];

    return resp;
  };

  /**
   * @name areaChange
   * @desc Metodo que detecta el cambio del filtro select para llamar al api
   * @returns
   */
  areaChange = async (event) => {
    this.setState({ loading: true });
    const { target: { value } } = event;
    const metod = (value === 'all') ? this.loadFields() : this.loadFieldsByFilter(value);
    try {
      const data = await metod;

      // Cargo las variables nuevamente
      this.setState({
        countryArray: data || [],
        loading: false,
      });
    } catch (e) {
      throw Error(e);
    }
  };

  /**
   * @name getItemsOptions
   * @desc Busca objeto si es identico al parametro nombre y lo retorna
   */
  getItemsOptions = (data, value) => data.find((item) => item.name === value);

  /**
   * @name filterData
   * @desc Metodo para buscar datos segun input de busqueda
   */
  filterData = async (filters) => {
    const { keyCode, target: { value } } = filters;
    // Formateo la primera letra del string para traerla mayuscula
    const field = await upperCaseString(value);

    if (keyCode === KEY_ENTER) {
      this.setState({ loading: true });
      setTimeout(async () => {
        const dataForm = await this.getItemsOptions(this.countryClon, field);
        this.setState({
          countryArray: [dataForm] || this.countryClon,
          loading: false,
        });
      }, 2000);
    }
  };

  render() {
    const { loading, countryArray } = this.state; // Cargo valores para actualizar vista
    const { notFound } = masterMessages.app; // Carga los mensajes a mostrar

    return loading ? <Loader /> : (
      <>
        {/* Contenido */}
        <div style={{ marginTop: 20, padding: 5, marginLeft: 10 }}>
          {/* Botones de buscar y filtro */}

          <Row>
            <>
              <Row>
                <Col xs={12} md={3}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <SearchIcon size={20} />
                    </InputGroup.Text>
                    <FormControl placeholder="Buscar" onKeyDown={(event) => this.filterData(event)} />
                    <InputGroup.Text>
                      <RefreshCcwIcon size={20} onClick={() => this.init()} />
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col xs={7} />
                <Col xs={12} md={2}>
                  <Form.Select onChange={(event) => this.areaChange(event)}>
                    {optionsArray.map((item) => (
                      <option value={item.value}>{item.label}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              {countryArray.map((item, index) => (
                <>
                  <Col xs={12} md={3} lg={3} key={`a-${index.toString()}`} style={{ marginTop: 20 }}>
                    <Card style={{ width: '17rem' }}>
                      <Nav.Link href={`${endPoints.app.detail}/${item.name}`}>
                        <Card.Img variant="top" src={item.flags.png || ''} style={{ height: '10rem' }} />
                      </Nav.Link>
                      <h1 style={{ marginLeft: 15 }}>{item.name || ''}</h1>
                      <Card.Body style={{ height: '7rem' }}>
                        <span>
                          Population:
                          {' '}
                          {item.population.toLocaleString('es-CO') || ''}
                        </span>
                        <br />
                        <span>
                          Región:
                          {' '}
                          {item.region || ''}
                        </span>
                        <br />
                        <span>
                          Capital:
                          {' '}
                          {item.capital || ''}
                        </span>
                        <br />
                      </Card.Body>
                    </Card>
                  </Col>
                  <br />
                </>
              ))}

              {Boolean(countryArray.length === 0) && (
                <div style={{ textAlign: 'center' }}>
                  <h1>{notFound}</h1>
                </div>
              )}
            </>
          </Row>
        </div>
      </>
    );
  }
}

CountryViewList.propTypes = {
  // Manejo de rutas en caso de requerirse
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default CountryViewList;
