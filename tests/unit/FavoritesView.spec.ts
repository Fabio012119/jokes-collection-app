import { mount } from "@vue/test-utils";
import FavoritesView from "../../src/views/FavoritesView.vue";

describe("FavoritesView", () => {
  it("should render the component and verify if it is in view", async () => {
    const wrapper = mount(FavoritesView, {
      global: {
        stubs: {
          JokesComponent: true,
        },
      },
    });

    const favoritesView = wrapper.find('[data-testid="favorites-view"]');
    expect(favoritesView.exists()).toBe(true);
  });
});
