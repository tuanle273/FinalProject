import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { VehicleContext } from "../../../../contexts/VehicleContext";
import { Toaster, toast } from "react-hot-toast";
const EditVehicleModal = (props) => {

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
    imageUrl: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateVehicle(props.itemId, formData );

    if (response.success) { 
      toast.success(response.message);
    props.handleClose();
  } else { 
    toast.error(response.message);
  
  }
  };
  return (
    <div>
      <Toaster />{" "}
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={props.handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Form onSubmit={handleSubmit}>
                    {" "}
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
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
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="platenumber">
                      <Form.Label>Platenumber</Form.Label>
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
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="seat">
                      <Form.Label>Seat</Form.Label>
                      <Form.Control
                        type="number"
                        name="seat"
                        value={formData.seat}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="transmission">
                      <Form.Label>Transmission</Form.Label>
                      <Form.Select
                        type="text"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        aria-label="Default select example"
                      >
                        {" "}
                        <option>Select transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                      </Form.Select>
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
                    <Form.Group controlId="type">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="availability">
                      {" "}
                      <Form.Label>Availability</Form.Label>
                      <Form.Select
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        aria-label="Default select example"
                      >
                        <option>Select availability</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="imageUrl">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={props.handleClose}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default EditVehicleModal;
