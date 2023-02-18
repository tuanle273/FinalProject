import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { VehicleContext } from "../../../../contexts/VehicleContext";

const DeleteModal = (props) => {
  const { vehicleState, deleteVehicle } = useContext(VehicleContext);

  const {
    vehicleState: { vehicles, vehicleLoading, vehicleError },
  } = useContext(VehicleContext);

  return (
    <div>
      {" "}
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h2>Delete Modal</h2>{" "}
        <Modal.Header closeButton="true" closeVariant="dark">
          <Modal.Title>Create Vehicle</Modal.Title>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>

          <button onClick={() => deleteVehicle(props.vehicleId)}>
            Delete Vehicle
          </button>
        </Modal.Header>
        <Modal.Body>d</Modal.Body>{" "}
      </Modal>
    </div>
  );
};

export default DeleteModal;
