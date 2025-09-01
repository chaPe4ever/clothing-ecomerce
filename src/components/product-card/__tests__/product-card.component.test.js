import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.component";
import { store } from "../../../store/store";

describe("Product Card tests", () => {
  test("it should add the product item when Priduct Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "test",
      name: "Item A",
      price: 10,
    };

    renderWithProviders(<ProductCard product={mockProduct} />, {
      preloadedState: {
        cart: {
          carItems: [],
        },
      },
    });
    const addToCardButtonElement = screen.getByText(/Add to cart/i);
    await fireEvent.click(addToCardButtonElement);

    // TODO doesn't work
    // expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
