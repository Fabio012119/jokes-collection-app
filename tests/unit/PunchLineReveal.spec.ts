import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Punchline from "../../src/components/JokeItem/PunchLineReveal.vue";

describe("Punchline Component", () => {
  it("should render the punchline modal when visible is true", async () => {
    const wrapper = mount(Punchline, {
      props: {
        visible: true,
      },
      slots: {
        default: "<p>Punchline: It was a joke!</p>",
      },
    });

    const punchlineModal = wrapper.find('[data-testid="jokes-punchline"]');
    expect(punchlineModal.exists()).toBe(true);

    expect(wrapper.text()).toContain("Punchline: It was a joke!");
  });
});
