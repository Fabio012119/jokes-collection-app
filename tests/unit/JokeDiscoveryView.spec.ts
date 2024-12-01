import { mount } from "@vue/test-utils";
import JokeDiscoveryView from "../../src/views/JokeDiscoveryView.vue";

describe("JokesDiscoveryView", () => {
  it("should render the component and verify if it is in view", async () => {
    const wrapper = mount(JokeDiscoveryView, {
      global: {
        stubs: {
          JokesComponent: true,
        },
      },
    });

    const favoritesView = wrapper.find('[data-testid="joke-discovery-view"]');
    expect(favoritesView.exists()).toBe(true);
  });
});
