import { mount } from "@vue/test-utils";
import JokesComponent from "../../src/components/JokesComponent.vue";

describe("JokesComponent", () => {
  it("should render the component and verify if it is in view", async () => {
    const jokesMock = [
      {
        setup: "Why did the chicken cross the road?",
        punchline: "To get to the other side!",
        rating: 5,
      },
      {
        setup: "What do you call fake spaghetti?",
        punchline: "An impasta!",
        rating: 4,
      },
    ];

    const props = {
      jokes: jokesMock,
      isFavorites: false,
      loading: false,
      error: null,
    };

    const wrapper = mount(JokesComponent, {
      props,
    });

    const favoritesView = wrapper.find('[data-testid="jokes-component"]');
    expect(favoritesView.exists()).toBe(true);
  });
});
