import { faAdd } from "@fortawesome/free-solid-svg-icons";
import data from "./data/data.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import {
  Button,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      EstadoERP: "",
      TipoDocumento: "",
      NombreCliente: "",
      NoLineas: "",
      FechaPedido: "",
      Pedido: "",
      EstadoSiesa: "",
      PedidoSiesa: "",
    },
    insertForm: false,
    upDateForm: false,
  };

  openInsertForm = () => {
    this.setState({ insertForm: true });
  };

  closeInsertForm = () => {
    this.setState({ insertForm: false });
  };

  openUpDateForm = (reg) => {
    this.setState({
      upDateForm: true,
      form: reg,
    });
  };

  closeUpdateForm = () => {
    this.setState({ upDateForm: false });
  };

  insertNewdata = () => {
    var newValue = { ...this.state.form };
    newValue.id = this.state.data.length + 1;
    var newData = this.state.data;
    newData.push(newValue);
    this.setState({ insertForm: false, data: newData });
  };

  upDateNewdata = (reg) => {
    var cont = 0;
    var arr = this.state.data;
    arr.map((values) => {
      if (reg.id === values.id) {
        arr[cont].EstadoERP = reg.EstadoERP;
        arr[cont].TipoDocumento = reg.TipoDocumento;
        arr[cont].NombreCliente = reg.NombreCliente;
        arr[cont].NoLineas = reg.NoLineas;
        arr[cont].FechaPedido = reg.FechaPedido;
        arr[cont].Pedido = reg.Pedido;
        arr[cont].EstadoSiesa = reg.EstadoSiesa;
        arr[cont].PedidoSiesa = reg.PedidoSiesa;
      }
      cont++;
    });
    this.setState({ data: arr, upDateForm: false });  
  }


  deleteData = (reg) => {
    var option = window.confirm("Estás Seguro que deseas Eliminar el elemento "+reg.id);
    if (option === true) {
      var cont = 0;
      var arr = this.state.data;
      arr.map((values) => {
        if (reg.id === values.id) {
          arr.splice(cont, 1);
        }
        cont++;
      });
      this.setState({ data: arr, upDateForm: false });
    }
  };


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container className="p-0">
          <h1>Información</h1>
          <Button
            className="my-4"
            color="primary"
            onClick={() => this.openInsertForm()}
          >
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Insertar
          </Button>

          <Table>
            <thead>
              <tr>
                {Object.keys(this.state.form).map((index) => (
                  <th>{index}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.EstadoERP}</td>
                  <td>{item.TipoDocumento}</td>
                  <td>{item.NombreCliente}</td>
                  <td>{item.NoLineas}</td>
                  <td>{item.FechaPedido}</td>
                  <td>{item.Pedido}</td>
                  <td>{item.EstadoSiesa}</td>
                  <td>{item.PedidoSiesa}</td>
                  <td>
                    <Button className="m-1" color="warning" onClick={() => this.openUpDateForm(item)}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        color="white"
                      ></FontAwesomeIcon>{" "}
                    </Button>
                    <Button className="m-1" color="danger" onClick={() => this.deleteData(item)}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>{" "}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.insertForm}>
          <ModalHeader>
            <h1>Insertar</h1>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={data.length + 1}
              />
            </FormGroup>

            {Object.keys(this.state.form).slice(1).map((title) => (
              <FormGroup>
                <label>{title}</label>
                <input
                  className="form-control"
                  name={title}
                  type="text"
                  onchange={this.handleChange}
                />
              </FormGroup>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertNewdata()}>
              Guardar
            </Button>
            <Button color="danger" onClick={() => this.closeInsertForm()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.upDateForm}>
          <ModalHeader>
            <h1>Editar</h1>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            {Object.keys(this.state.form).slice(1).map((title) => (
              <FormGroup>
                <label>{title}</label>
                <input
                  className="form-control"
                  name={title}
                  type="text"
                  onchange={this.handleChange}
                  defaultValue={this.state.form[title]}
                />
              </FormGroup>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button color="success" onClick={() => this.upDateNewdata(this.state.form)}>
              Editar
            </Button>
            <Button color="danger" onClick={() => this.closeUpdateForm()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>


       
      </>
    );
  }
}

export default App;
