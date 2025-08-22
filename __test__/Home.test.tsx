import { screen, render } from "@testing-library/react";
import Home from "@/app/page";

describe("unit tests for home page", () => {
    test("that there is a main element", () => {
        render(<Home/>)

        const main = screen.getByRole("main")
        expect(main).toBeInTheDocument()
    })
})
describe("integration tests for home page", () => {
    test("that the arrayVisualizer is properly rendered", () => {
        render(<Home/>)

        const visualizer = screen.getByTestId("visualizerContainer")
        expect(visualizer).toBeInTheDocument()
    })
})