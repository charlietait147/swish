import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CafeFilters from "../../../components/cafe/CafeFilters.jsx";

describe("CafeFilters Component", () => {
  describe("Amenities Dropdown", () => {
    it("should toggle the amenities dropdown when the button is clicked", async () => {
      //Arrange
      render(<CafeFilters selectedAmenities={[]} />);

      const amenitiesList = screen.queryByRole("list", {
        name: /amenities-list/i,
      });
      expect(amenitiesList).not.toBeInTheDocument();

      const toggleDropdown = screen.getByRole("button", {
        name: /amenities-dropdown/i,
      });
      await userEvent.click(toggleDropdown);

      // Check if the list is initially hidden based on the state
      await waitFor(() => {
        const amenitiesList = screen.getByRole("list", {
          name: /amenities-list/i,
        });
        expect(amenitiesList).toBeVisible();
      });

      // Simulate clicking the toggle button
      await userEvent.click(toggleDropdown);

      // After clicking, the list should be visible
      await waitFor(() => {
        const amenitiesList = screen.queryByRole("list", {
          name: /amenities-list/i,
        });
        expect(amenitiesList).not.toBeInTheDocument();
      });
    });
  });
  describe("Cafe Filters Modal", () => {
    let onFilterChange, setSelectedAmenities, setLoading;

    beforeEach(() => {
      onFilterChange = jest.fn();
      setSelectedAmenities = jest.fn();
      setLoading = jest.fn();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it("should toggle modal visibility", async () => {
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={[]}
          setLoading={setLoading}
        />
      );

      const filtersButton = screen.getByRole("button", {
        name: /filters modal/i,
      });

      // Modal should not be in the document initially
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      // Click the filters button to open the modal
      userEvent.click(filtersButton);

      // Modal should now be visible
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      userEvent.click(closeButton);

      // Modal should be removed from the document
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("should apply filters and close modal", async () => {
      jest.useFakeTimers();

      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={["Dog Friendly"]}
          setLoading={setLoading}
        />
      );

      const filtersButton = screen.getByRole("button", {
        name: /filters modal/i,
      });
      fireEvent.click(filtersButton); // Open the modal

      // Input a search term in the modal
      const nameInput = screen.getByLabelText("Name");
      fireEvent.change(nameInput, { target: { value: "Test Cafe" } });

      // Apply filters
      const applyButton = screen.getByRole("button", {
        name: /apply modal filters/i,
      });
      fireEvent.click(applyButton);

      // Wait for the modal to be closed
      jest.advanceTimersByTime(500);
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });

      // Check that onFilterChange was called with the correct filters
      await waitFor(() => {
        expect(onFilterChange).toHaveBeenCalledWith({
          name: "Test Cafe",
          location: "",
          amenities: ["Dog Friendly"],
        });
      });
    });

    it("should reset filters and clear selection", () => {
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={["Dog Friendly", "Hot Food Available"]}
          setLoading={setLoading}
        />
      );

      const filtersButton = screen.getByRole("button", {
        name: /filters modal/i,
      });
      fireEvent.click(filtersButton); // Open the modal

      // Click the reset button
      const resetButton = screen.getByRole("button", {
        name: /clear modal filters/i,
      });
      fireEvent.click(resetButton);

      // Expect filters to be reset
      expect(onFilterChange).toHaveBeenCalledWith({
        name: "",
        location: "",
        amenities: [],
      });

      // Ensure that selectedAmenities state was cleared
      expect(setSelectedAmenities).toHaveBeenCalledWith([]);
    });

    it("should trigger mobile search by name", () => {
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={[]}
          setLoading={setLoading}
        />
      );

      // Simulate mobile search input
      const searchInput = screen.getByPlaceholderText("Search by name");
      fireEvent.change(searchInput, { target: { value: "Cafe Test" } });

      // Click on the search icon
      const searchIcon = screen.getByRole("button", { name: "search" });
      fireEvent.click(searchIcon);

      // Expect onFilterChange to be called with the search term
      expect(onFilterChange).toHaveBeenCalledWith({
        name: "Cafe Test",
        location: "",
      });
    });
  });

  describe("Collapsed filters bar", () => {
    it("should show the collapsed bar and call onExpand when it is clicked", () => {
      const onExpand = jest.fn();
      render(
        <CafeFilters selectedAmenities={["Dog Friendly"]} collapsed onExpand={onExpand} />
      );

      const bar = screen.getByRole("button", { name: /expand filters/i });
      expect(bar.textContent).toContain("Any cafe · Anywhere · 1 amenity");

      fireEvent.click(bar);
      expect(onExpand).toHaveBeenCalledTimes(1);
    });

    it("should not show the collapsed bar by default", () => {
      render(<CafeFilters selectedAmenities={[]} />);
      expect(
        screen.queryByRole("button", { name: /expand filters/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("Desktop search bar", () => {
    it("should suggest matching locations and fill the field when one is picked", () => {
      const onFilterChange = jest.fn();
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={jest.fn()}
          selectedAmenities={[]}
          locations={["Farnham", "Winchester"]}
        />
      );

      const locationInput = screen.getByLabelText("Location");
      fireEvent.change(locationInput, { target: { name: "location", value: "win" } });
      expect(screen.getByRole("button", { name: "Winchester" })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Farnham" })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Winchester" }));
      expect(locationInput).toHaveValue("Winchester");
      expect(screen.queryByRole("list", { name: "location-list" })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Search" }));
      expect(onFilterChange).toHaveBeenCalledWith({
        name: "",
        location: "Winchester",
        amenities: [],
      });
    });

    it("should search by a typed location that isn't in the suggestions", () => {
      const onFilterChange = jest.fn();
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={jest.fn()}
          selectedAmenities={[]}
          locations={["Farnham"]}
        />
      );

      fireEvent.change(screen.getByLabelText("Location"), {
        target: { name: "location", value: "Guildford" },
      });
      expect(screen.queryByRole("list", { name: "location-list" })).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Search" }));
      expect(onFilterChange).toHaveBeenCalledWith({
        name: "",
        location: "Guildford",
        amenities: [],
      });
    });

    it("should clear a field and refresh the results when its cross is clicked", () => {
      const onFilterChange = jest.fn();
      const setSelectedAmenities = jest.fn();
      render(
        <CafeFilters
          onFilterChange={onFilterChange}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={["Dog Friendly"]}
          locations={["Farnham"]}
        />
      );

      fireEvent.change(screen.getByLabelText("Name"), {
        target: { name: "name", value: "Cafe 1" },
      });
      fireEvent.click(screen.getByRole("button", { name: "Clear name" }));
      expect(screen.getByLabelText("Name")).toHaveValue("");
      expect(onFilterChange).toHaveBeenLastCalledWith({
        name: "",
        location: "",
        amenities: ["Dog Friendly"],
      });

      fireEvent.click(screen.getByRole("button", { name: "Clear amenities" }));
      expect(setSelectedAmenities).toHaveBeenCalledWith([]);
      expect(onFilterChange).toHaveBeenLastCalledWith({
        name: "",
        location: "",
        amenities: [],
      });
    });
  });
});
