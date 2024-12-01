import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import JokeItem from "../../src/components/JokeItem/JokeItem.vue";

describe("JokeItem", () => {
  it("should render the joke item component and verify if it is in view", async () => {
    const jokeMock = {
      setup: "Why don't skeletons fight each other?",
      punchline: "They don't have the guts.",
      rating: 4,
    };

    const props = {
      joke: jokeMock,
      index: 0,
      onReveal: vi.fn(),
      onSave: vi.fn(),
      onRate: vi.fn(),
      isFavorites: false,
    };

    const wrapper = mount(JokeItem, {
      props,
    });

    const jokeItem = wrapper.find('[data-testid="joke-item"]');
    expect(jokeItem.exists()).toBe(true);

    expect(jokeItem.text()).toContain(jokeMock.setup);
  });
});
