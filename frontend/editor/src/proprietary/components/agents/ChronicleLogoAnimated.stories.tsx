import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChronicleLogoAnimated } from "@app/components/agents/ChronicleLogoAnimated";

/**
 * Animated Chronicle logo mark, used as a "thinking" indicator in the chat panel.
 */
const meta: Meta<typeof ChronicleLogoAnimated> = {
  title: "Agents/ChronicleLogoAnimated",
  component: ChronicleLogoAnimated,
  parameters: { layout: "padded" },
  args: {
    size: 20,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 64 },
};
