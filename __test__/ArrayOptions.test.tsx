import {render, screen} from '@testing-library/react'
import ArrayOptions from '@/components/ArrayOptions'

describe("units tests for the ArrayOptions component", () => {
    test("that the container component exists", () => {
        const mockOptions:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        render(<ArrayOptions currentOptions={mockOptions} changeOptions={() => {}}/>)

        const container = screen.getByTestId("optionsContainer")
        expect(container).toBeInTheDocument()
    })
    test("that the triangle pointer element renders inside the container", () => {
        const mockOptions:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        render(<ArrayOptions currentOptions={mockOptions} changeOptions={() => {}}/>)

        const container = screen.getByTestId("optionsContainer")    
        const triangle = screen.getByTestId("pointingTriangle")
        expect(container).toContainElement(triangle)    
    })
})

describe("integration test between ArrayOptions and SwitchOptions", () => {
    test("that three SwitchOption compomonents get rendered and all have different content", () => {
        const mockOptions:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        render(<ArrayOptions currentOptions={mockOptions} changeOptions={() => {}}/>)

        const container = screen.getByTestId("optionsContainer")
        const options = screen.getAllByTestId("switchContainer")

        expect(options.length).toBe(3)
        expect(container).toContainElement(options[0] && options [1] && options[2])
        
        expect(options[1]).toHaveTextContent(mockOptions.color)
        expect(options[2]).toHaveTextContent(mockOptions.value.toString())
        
        const svg = screen.getByRole("img")
        expect(options[0]).toContainElement(svg)
    })
})