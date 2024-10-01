import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccountMenu from "../../../components/AccountMenu.jsx";

describe("AccountMenu Component", () => {
  describe("functionality tests", () => {
    it("should toggle the dropdown menu when the user clicks on the avatar", async () => {
      render(<AccountMenu />);

      const avatar = screen.getByRole("button", { name: /avatar/i });
      userEvent.click(avatar);

      await waitFor(() => {
        const dropdownMenu = screen.getByRole("menu");
        expect(dropdownMenu).toBeInTheDocument();
      });
    });

    it("should close the dropdown menu when the user clicks on the avatar again", async () => {
      render(<AccountMenu />);

      const avatar = screen.getByRole("button", { name: /avatar/i });
      userEvent.click(avatar);

      await waitFor(() => {
        const dropdownMenu = screen.getByRole("menu");
        expect(dropdownMenu).toBeInTheDocument();
      });

      userEvent.click(avatar);

      await waitFor(() => {
        const dropdownMenu = screen.queryByRole("menu");
        expect(dropdownMenu).not.toBeInTheDocument();
      });
    });

    it('should close the dropdown when clicked outside', () => {
        // Render the component with the dropdown and avatar
        render(<AccountMenu />);
    
        // Find the avatar and dropdown using their test ids
        const avatar = screen.getByRole("button", { name: /avatar/i });
        
    
        // Simulate a click to open the dropdown
        fireEvent.click(avatar);
        
        // Ensure the dropdown is open
        const dropdown = screen.getByRole("menu");
        expect(dropdown).toBeVisible();
    
        // Simulate a click outside the dropdown
        fireEvent.click(document);
    
        // Check that the dropdown is no longer visible
        expect(dropdown).not.toBeVisible();
      });
  });
});
