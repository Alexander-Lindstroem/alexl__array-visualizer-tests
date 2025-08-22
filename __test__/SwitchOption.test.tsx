import {render, screen} from '@testing-library/react'
import SwitchOption from '@/components/SwitchOption'

describe("units tests for the SwitchOption component", () => {
    test("that the component container exists", () => {
        render(<SwitchOption type="color" content="red" switchOption={() => {}}/>)

        const switchContainer = screen.getByTestId("switchContainer")
        expect(switchContainer).toBeInTheDocument()
    })
    test("that only one type of content gets rendered", () => {
        render(<SwitchOption type="color" content="red" switchOption={() => {}}/>)

        const optionDisplay = screen.getAllByTestId("optionDisplay")
        expect(optionDisplay.length).toBe(1)  
    })
    test("that the two buttons are rendered", () => {
        render(<SwitchOption type="color" content="red" switchOption={() => {}}/>)

        const optionButton = screen.getAllByTestId("optionButton")
        expect(optionButton.length).toBe(2)
    })
    test("that the shape type renders an svg when used", () => {
        render(<SwitchOption type="shape" content="triangle" switchOption={() => {}}/>)

        //role attribute has to be manually added to svg to find them
        const svg = screen.getByRole("img")
        expect(svg).toBeInTheDocument()
    })
    test("that the color type renders an element which has the content prop rendered inside it", () => {
        const contentInput = "red"
        
        render(<SwitchOption type="color" content={contentInput} switchOption={() => {}}/>)

        const optionDisplay = screen.getByTestId("optionDisplay")
        expect(optionDisplay).toHaveTextContent(contentInput)
    })
    test("that the value type renders an element which has the content prop rendered inside it", () => {
        const contentInput = 1
        
        render(<SwitchOption type="value" content={contentInput} switchOption={() => {}}/>)

        const optionDisplay = screen.getByTestId("optionDisplay")
        expect(optionDisplay).toHaveTextContent(contentInput.toString())
    })
})