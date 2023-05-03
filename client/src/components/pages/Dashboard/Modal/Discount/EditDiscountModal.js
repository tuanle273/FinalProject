import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Toaster, toast } from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { DiscountContext } from "../../../../../contexts/DiscountContext";
const EditDiscountModal = (props) => {
  const history = useHistory();

  const {
    discountState: { discounts },
    updateDiscount,
  } = useContext(DiscountContext);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    amount: "",
  });

  const discount = discounts.find((discount) => discount._id === id);

  useEffect(() => {
    if (discount) {
      setFormData({
        code: discount.code,
        name: discount.name,
        amount: discount.amount,
      });
    }
  }, [discount]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateDiscount(id, formData);
    if (response.success) {
      toast.success(response.message);
      history.push(`/admin/discountmanagement`);
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
              <h3 className="text-3xl font-semibold">Edit Discount</h3>

              <button
                onClick={() => history.goBack()}
                className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 border bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Back
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <Form onSubmit={handleSubmit} className="-mx-3 flex flex-wrap">
                {" "}
                <Form.Group controlId="code">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full px-3 sm:w-1/2 bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:w-1/2 bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="amount">
                  <Form.Label className="mb-3 block text-base font-medium text-[#07074D]">
                    amount
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="bg-white p-2 rounded mt-1 border-2 border-grey cursor-pointer hover:bg-grey-lighter"
                    required
                  >
                    <option value="">Choose amount</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                    <option value="0.4">40%</option>
                    <option value="0.5">50%</option>
                    <option value="0.6">60%</option>
                    <option value="0.7">70%</option>
                    <option value="0.8">80%</option>
                    <option value="0.9">90%</option>
                    <option value="1">100%</option>
                  </Form.Control>
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
      </>
    </div>
  );
};

export default EditDiscountModal;
