import { render, screen } from "@testing-library/react"
import { StarSVG, SquareSVG, TriangleSVG, CircleSVG } from "@/data/svgdata"

describe("unit tests for svgdata", () => {
    test("that the all the right svgs get rendered", () => {
        render(<StarSVG fill="red"/>)
        render(<SquareSVG fill="red"/>)
        render(<TriangleSVG fill="red"/>)
        render(<CircleSVG fill="red"/>)

        const star = screen.getByTestId("star")
        const square = screen.getByTestId("square")
        const triangle = screen.getByTestId("triangle")
        const circle = screen.getByTestId("circle")
        
        expect(star && square && triangle && circle).toBeInTheDocument()
    })
    test("that the svgs have the right color", () => {
        const color = "purple"

        render(<StarSVG fill={color}/>)
        render(<SquareSVG fill={color}/>)
        render(<TriangleSVG fill={color}/>)
        render(<CircleSVG fill={color}/>)

        const star = screen.getByTestId("star")
        const square = screen.getByTestId("square")
        const triangle = screen.getByTestId("triangle")
        const circle = screen.getByTestId("circle")

        expect(star && square && triangle && circle).toHaveAttribute("fill", color)
    })
}) 