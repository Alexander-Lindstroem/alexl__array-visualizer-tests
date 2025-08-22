import { fireEvent, screen, render, getAllByTestId } from "@testing-library/react";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import { dummyArray } from "@/data/data";

describe("unit tests for ArrayVisualizer component", () => {
    test("that the visualizerContainer element exists", () => {
        const mockArray = dummyArray
        
        render(<ArrayVisualizer array={mockArray}/>)

        const container = screen.getByTestId("visualizerContainer")
        expect(container).toBeInTheDocument()
    })
    test("that the arrayContainer element exists inside the visualizerContainer element", () => {
        const mockArray = dummyArray     
        
        render(<ArrayVisualizer array={mockArray}/>)

        const container = screen.getByTestId("visualizerContainer")
        const arrayContainer = screen.getByTestId("arrayContainer")

        expect(container).toContainElement(arrayContainer)
    })
})
describe("integration tests between ArrayVisualizer and ArrayItem components", () => {
    test("that the amount of rendered ArrayItems is the same as the number of items in the array", () => {
        const mockArray = dummyArray
        
        render(<ArrayVisualizer array={mockArray}/>)

        const items = screen.getAllByTestId("itemContainer")
        expect(items.length).toBe(mockArray.length)
                
    })
    test("that the indexHolder displays the right value for each item", () => {
        const mockArray = dummyArray
        const testIndex = 0
        
        render(<ArrayVisualizer array={mockArray}/>)

        const indexHolders = screen.getAllByTestId("indexHolder")
        expect(indexHolders[testIndex]).toHaveTextContent(testIndex.toString())
    })
    test("that the option screen appears when you click on one of the items, and that it disappears when you click it again", () => {
        const mockArray = dummyArray 
        
        render(<ArrayVisualizer array={mockArray}/>)
        
        const items = screen.getAllByTestId("itemHolder")
        let options = screen.queryByTestId("optionsContainer")
        
        expect(options).not.toBeInTheDocument()
        
        fireEvent.click(items[0])
        options = screen.getByTestId("optionsContainer")
        expect(options).toBeInTheDocument()

        fireEvent.click(items[0])
        options = screen.queryByTestId("optionsContainer")
        expect(options).not.toBeInTheDocument()
    })
    test("that there only is one option component on the screen at a time", () => {
        const mockArray = dummyArray
        
        render(<ArrayVisualizer array={mockArray}/>)
        
        const items = screen.getAllByTestId("itemHolder")
        fireEvent.click(items[0])
        fireEvent.click(items[1])

        const options = screen.getAllByTestId("optionsContainer")
        expect(options.length).toBe(1)

    })
    test("that the current options displayed in the options window are the same as the one in the array", () => {
        const mockArray = dummyArray
        const selectedItem = mockArray.indexOf(mockArray[0])

        render(<ArrayVisualizer array={mockArray}/>)

        const items = screen.getAllByTestId("itemHolder")
        fireEvent.click(items[selectedItem])
        const optionDisplays = screen.getAllByTestId("optionDisplay")

        expect(optionDisplays[1]).toHaveTextContent(mockArray[selectedItem].color)
        expect(optionDisplays[2]).toHaveTextContent(mockArray[selectedItem].value.toString())

        const shapeSvg = screen.getAllByTestId(mockArray[selectedItem].shape)
        expect(optionDisplays[0]).toContainElement(shapeSvg[1])
    })
    test("that when you click the left/right button of the first option, the displayed shape changes both in the array and in the options and that you can go back to the previous option", () => {
        const mockArray = dummyArray
        const selectedItem = mockArray.indexOf(mockArray[0])

        render(<ArrayVisualizer array={mockArray}/>)

        const items = screen.getAllByTestId("itemHolder")
        fireEvent.click(items[selectedItem])
        let shapeSvgs = screen.getAllByTestId(mockArray[selectedItem].shape)

        expect(shapeSvgs).toHaveLength(2)

        const leftButton = screen.getAllByTestId("optionButton")[0]
        const rightButton = screen.getAllByTestId("optionButton")[1]

        fireEvent.click(leftButton)
        shapeSvgs = screen.queryAllByTestId(mockArray[selectedItem].shape)
        
        expect(shapeSvgs).toHaveLength(0)

        fireEvent.click(rightButton)
        shapeSvgs = screen.queryAllByTestId(mockArray[selectedItem].shape)

        expect(shapeSvgs).toHaveLength(2)
    })
    test("that when you click the left/right button of the second option, the displayed color changes in both the array and in the options, and you can go back to the previous option", () => {
        const mockArray = dummyArray
        const selectedItem = mockArray.indexOf(mockArray[0])

        render(<ArrayVisualizer array={mockArray}/>)
        
        const items = screen.getAllByTestId("itemHolder")
        fireEvent.click(items[selectedItem])

        let shapeSvgs = screen.getAllByTestId(mockArray[selectedItem].shape)
        let colorOptionDisplay = screen.getAllByTestId("optionDisplay")[1]

        expect(shapeSvgs[0]).toHaveAttribute("fill", mockArray[selectedItem].color)
        expect(colorOptionDisplay).toHaveTextContent(mockArray[selectedItem].color)

        const leftButton = screen.getAllByTestId("optionButton")[2]
        const rightButton = screen.getAllByTestId("optionButton")[3]

        fireEvent.click(leftButton)
        shapeSvgs = screen.getAllByTestId(mockArray[selectedItem].shape)
        colorOptionDisplay = screen.getAllByTestId("optionDisplay")[1]

        expect(shapeSvgs[0]).not.toHaveAttribute("fill", mockArray[selectedItem].color)
        expect(colorOptionDisplay).not.toHaveTextContent(mockArray[selectedItem].shape)

        fireEvent.click(rightButton)
        shapeSvgs = screen.getAllByTestId(mockArray[selectedItem].shape)
        colorOptionDisplay = screen.getAllByTestId("optionDisplay")[1]
        
        expect(shapeSvgs[0]).toHaveAttribute("fill", mockArray[selectedItem].color)
        expect(colorOptionDisplay).toHaveTextContent(mockArray[selectedItem].color)
    })
    test("that when you click the left/right button of the third option, the displayed value changes in both the array and in the options, and you can go back to the previous option", () => {
        const mockArray = dummyArray
        const selectedItem = mockArray.indexOf(mockArray[0])

        render(<ArrayVisualizer array={mockArray}/>)
        
        const items = screen.getAllByTestId("itemHolder")
        fireEvent.click(items[selectedItem])

        let valueHolder = screen.getAllByTestId("valueHolder")[selectedItem]
        let colorOptionDisplay = screen.getAllByTestId("optionDisplay")[2]

        expect(valueHolder).toHaveTextContent(mockArray[selectedItem].value.toString())
        expect(colorOptionDisplay).toHaveTextContent(mockArray[selectedItem].value.toString())

        const leftButton = screen.getAllByTestId("optionButton")[4]
        const rightButton = screen.getAllByTestId("optionButton")[5]

        fireEvent.click(leftButton)
        valueHolder = screen.getAllByTestId("valueHolder")[selectedItem]
        colorOptionDisplay = screen.getAllByTestId("optionDisplay")[2]    
        
        expect(valueHolder).not.toHaveTextContent(mockArray[selectedItem].value.toString())
        expect(colorOptionDisplay).not.toHaveTextContent(mockArray[selectedItem].value.toString())

        fireEvent.click(rightButton)
        valueHolder = screen.getAllByTestId("valueHolder")[selectedItem]
        colorOptionDisplay = screen.getAllByTestId("optionDisplay")[2]

        expect(valueHolder).toHaveTextContent(mockArray[selectedItem].value.toString())
        expect(colorOptionDisplay).toHaveTextContent(mockArray[selectedItem].value.toString())
    })
})