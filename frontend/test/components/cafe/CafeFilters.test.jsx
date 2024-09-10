import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeFilters from "../../../components/cafe/CafeFilters.jsx";

describe("CafeFilters Component", () => {
  it("should toggle the dropdown menu when the button is clicked below a large screen breakpoint", async () => {
    //Arrange
    render(<CafeFilters selectedAmenities={[]} />);

    const amenitiesList = screen.queryByRole("list", { name: /amenities-list-mobile/i });
    expect(amenitiesList).not.toBeInTheDocument();

    const toggleDropdown = screen.getByRole("button", {
      name: /amenities-dropdown/i,
    });
    await userEvent.click(toggleDropdown);


    // Check if the list is initially hidden based on the state
    await waitFor(() => {
        const amenitiesList = screen.getByRole("list", { name: /amenities-list-mobile/i });
        expect(amenitiesList).toBeVisible();
    });

    // Simulate clicking the toggle button
    await userEvent.click(toggleDropdown);

    // After clicking, the list should be visible
    await waitFor(() => {
      const amenitiesList = screen.queryByRole("list", { name: /amenities-list-mobile/i });
      expect(amenitiesList).not.toBeInTheDocument();
    });
  });

  
});
