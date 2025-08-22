import {render, screen} from '@testing-library/react'
import Header from '@/components/Header'

describe("unit tests for the header", () => {
    test("that the header element exists", () => {
        render(<Header/>)

        let header = screen.getByRole("banner")
        expect(header).toBeInTheDocument()
    })
    test("that there is a single h1 inside the header", () => {
        render(<Header/>)

        let header = screen.getByRole("banner")
        let title = screen.getByRole("heading", {level: 1})

        expect(header).toContainElement(title)
    })
})