import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { VehicleContext } from "../../../../contexts/VehicleContext";

const EditVehicleModal = (props, item) => {
  const [alert, setAlert] = useState(null);
  const { updateVehicle } = useContext(VehicleContext);
  const [formData, setFormData] = useState({
    title: "",
    model: "",
    color: "",
    description: "",
    platenumber: "",
    year: "",
    capacity: "",
    seat: "",
    transmission: "",
    price: "",
    availability: "",
    image: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateVehicle(formData);
    if (response.success) {
      console.log(response.message);
    } else {
      setAlert({ type: "danger", message: response.message });
      setTimeout(() => setAlert(null), 5000);
    }
  };
  return (
    <div>
      {" "}
      <Modal
        show={props.show}
        onHide={props.handleClose}
        keyboard={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vehicle</Modal.Title>
          <Button type="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {" "}
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="platenumber">
              <Form.Label>platenumber</Form.Label>
              <Form.Control
                type="text"
                name="platenumber"
                value={formData.platenumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="capacity">
              <Form.Label>capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="seat">
              <Form.Label>seat</Form.Label>
              <Form.Control
                type="number"
                name="seat"
                value={formData.seat}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="transmission">
              <Form.Label>transmission</Form.Label>
              <Form.Control
                type="number"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Select
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                aria-label="Default select example"
              >
                <option>Availability</option>
                <option value="true">true</option>
                <option value="false">false</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                placeholder={item.image}
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>{" "}
        <Modal.Footer>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditVehicleModal;
