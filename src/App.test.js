import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import { UserProvider, UserContext } from "./UserProvider";

// Mock axios for testing
jest.mock("axios");

describe("UserProvider", () => {
  // Mock userReducer function
  const mockReducer = jest.fn((state, action) => {
    switch (action.type) {
      case "HISTORY_FETCH_SUCCESS":
        return {
          ...state,
          users: action.payload,
          userLoading: false,
          userError: false,
        };
      case "HISTORY_FETCH_FAIL":
      case "BAN_USER_SUCCESS":
      case "BAN_USER_FAIL":
      // add cases for other dispatch actions as needed
      default:
        return state;
    }
  });

  beforeEach(() => {
    // Reset mockReducer before each test
    mockReducer.mockClear();
  });

  test("fetches history and updates state on success", async () => {
    // Mock axios.get to resolve with mocked response
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        bookingDetail: [
          // mocked response data
        ],
      },
    });

    // Render UserProvider with a test child component
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => (
            <div data-testid="test-child">
              {JSON.stringify(value.userState)}
            </div>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );

    // Assert that the userReducer is called with the correct action type
    await waitFor(() =>
      expect(mockReducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ type: "HISTORY_FETCH_SUCCESS" })
      )
    );

    // Assert that the user state is updated with the mocked response data
    expect(screen.getByTestId("test-child").textContent).toContain(
      "bookingDetail"
    );
  });

  test("handles error during history fetch", async () => {
    // Mock axios.get to reject with an error
    axios.get.mockRejectedValueOnce(new Error("Fetch failed"));

    // Render UserProvider with a test child component
    render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => (
            <div data-testid="test-child">
              {JSON.stringify(value.userState)}
            </div>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );

    // Assert that the userReducer is called with the correct action type
    await waitFor(() =>
      expect(mockReducer).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ type: "HISTORY_FETCH_FAIL" })
      )
    );

    // Assert that the user state has the error flag set to true
    expect(screen.getByTestId("test-child").textContent).toContain(
      'userError":true'
    );
  });

  // Write similar test cases for other functions, such as banUser, unbanUser, and cloudinaryUpload
});
