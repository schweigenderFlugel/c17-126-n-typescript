import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import App from '../App'

describe('App', () => {
  it('renders headline', () => {
    render(<App />)
    const headline = screen.getByText(/Banco n/i)

    // TODO: validate to function toBeInTheDocument
    expect(headline) //.toBeInTheDocument();
  })
})
