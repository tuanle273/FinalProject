import { shallow } from "enzyme";
import React from "react";
import EditVehicleModal from "./EditVehicleModal";

describe("", () => {
  const props = {
    show: true,
    handleClose: () => {},
    itemId: 1,
  };
  const component = shallow(<EditVehicleModal {...props} />);

  it("should render without errors", () => {
    expect(component.find(".border-0")).toHaveLength(1);
  });

  it("should call handleClose when close button is clicked", () => {
    const handleClose = jest.fn();
    component.setProps({ ...props, handleClose });
    component.find(".text-black.opacity-5").simulate("click");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should update 'formData' when input fields are changed", () => {
    const event = {
      target: {
        name: "title",
        value: "Test Title",
      },
    };
    component.find('[name="title"]').simulate("change", event);

    expect(component.state().formData.title).toEqual("Test Title");
  });
});
