import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Toaster, toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { BrandContext } from "../../../../../contexts/BrandContext";
import { UserContext } from "../../../../../contexts/UserContext";
import { VehicleContext } from "../../../../../contexts/VehicleContext";
const EditVehicleModal = (props) => {
  const history = useHistory();

  const {
    vehicleState: { vehicles },
    getDetailVehicle,
  } = useContext(VehicleContext);
  const { loadBrand } = useContext(BrandContext);
  const { id } = useParams();

  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const loadVehicle = async () => {
      const response = await loadBrand();

      setBrands(response.data);
    };
    loadVehicle();
    getDetailVehicle(id);

    if (vehicles && vehicles.length > 0) {
      const vehicle = vehicles.find((v) => v._id === id);

      if (vehicle) {
        setFormData({
          title: vehicle.title || "",
          model: vehicle.model || "",
          color: vehicle.color || "",
          description: vehicle.description || "",
          platenumber: vehicle.platenumber || "",
          year: vehicle.year || "",
          capacity: vehicle.capacity || "",
          seat: vehicle.seat || "",
          transmission: vehicle.transmission || "",
          price: vehicle.price || "",
          type: vehicle.type || "",
          availability: vehicle.availability || "",
          imageUrl: vehicle.imageUrl || "",
        });
      }
    }
  }, []);

  const { cloudinaryUpload } = useContext(UserContext);
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
    type: "",
    availability: "",
    imageUrl: "",
  });

  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();
      uploadData.append("file", e.target.files[0], "file");
      const response = await cloudinaryUpload(uploadData);
      const secureUrl = response.data.secure_url;
      setFormData({ ...formData, imageUrl: secureUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateVehicle(id, formData);

    if (response.success) {
      toast.success(response.message);
      history.push(`/admin/vehiclemanagement`);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div>
      <Toaster />{" "}
      <>
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Vehicle</h3>

              <button
                onClick={() => history.goBack()}
                className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Back
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <Form onSubmit={handleSubmit}>
                {" "}
                <Form.Group controlId="title">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Title
                  </Form.Label>
                  <Form.Select
                    as="select"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:w-1/2 bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand.brand}>
                        {brand.brand}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="model">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Model
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full px-3 sm:w-1/2 bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="color">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Color
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="platenumber">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Platenumber
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="platenumber"
                    value={formData.platenumber}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="year">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Year
                  </Form.Label>{" "}
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="capacity">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Capacity
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="seat">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Seat
                  </Form.Label>
                  <Form.Select
                    type="number"
                    name="seat"
                    value={formData.seat}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                    aria-label="Default select example"
                  >
                    {" "}
                    <option>Select Seat</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="9">9</option>
                    <option value="16">16</option>
                    <option value="30">30</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="transmission">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Transmission
                  </Form.Label>
                  <Form.Select
                    type="text"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
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
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Price
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="type">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="availability">
                  {" "}
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Availability
                  </Form.Label>
                  <Form.Select
                    type="text"
                    name="availability"
                    value={formData.availability}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
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
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    Image
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </Form.Group>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
      </>
    </div>
  );
};

export default EditVehicleModal;
