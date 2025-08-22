import {render, screen} from "@testing-library/react"
import ArrayItem from "@/components/ArrayItem"

type ShapeNameTypes = "circle" | "square" | "star" | "triangle"

type ArrayItemTypes = {
    color: string,
    shape: ShapeNameTypes,
    value: number
}

describe("unit tests for the ArrayItem component", () => {
    test("that the container for the component is rendered", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)

        const container = screen.getByTestId("itemContainer")
        expect(container).toBeInTheDocument()
    })
    test("that the indexHolder element exists inside the itemContainer element", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)
        
        const container = screen.getByTestId("itemContainer")
        const indexHolder = screen.getByTestId("indexHolder")

        expect(container).toContainElement(indexHolder)
    })
    test("that the itemHolder element exists inside the itemContainer element", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)
        
        const container = screen.getByTestId("itemContainer")
        const itemHolder = screen.getByTestId("itemHolder")

        expect(container).toContainElement(itemHolder)
    })
    test("that the valueHolder element exists inside the itemHolder element", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)

        const itemHolder = screen.getByTestId("itemHolder")
        const valueHolder = screen.getByTestId("valueHolder")

        expect(itemHolder).toContainElement(valueHolder)
    })
})
describe("integration tests for the ArrayItem component", () => {
    test("that the right svgdata component gets loaded depending on the prop", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)
        
        const svg = screen.getByTestId(mockItem.shape)

        expect(svg).toBeInTheDocument()
    })
    test("that the svg is loaded inside the itemHolder element and has the right color", () => {
        const mockItem:ArrayItemTypes = {
            color: "red",
            shape: "circle",
            value: 1
        }

        const mockArray = [
            mockItem, mockItem, mockItem, mockItem
        ]
        
        render(<ArrayItem {...mockItem} id={0} openOptions={() => {}} openOptionsID={null} arrayContent={mockArray} changeArrayContent={() => {}}/>)

        const itemHolder = screen.getByTestId("itemHolder")
        const svg = screen.getByRole("img")

        expect(itemHolder).toContainElement(svg)
        expect(svg).toHaveAttribute("fill", mockItem.color)
    })
})