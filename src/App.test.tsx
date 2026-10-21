// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { LangProvider } from './i18n'

const renderApp = () =>
  render(
    <LangProvider>
      <App />
    </LangProvider>,
  )

const next = () => fireEvent.click(screen.getByRole('button', { name: /^(Next|See my plan|Siguiente|Ver mi plan)$/ }))

beforeEach(() => {
  localStorage.clear()
  window.location.hash = ''
  Object.defineProperty(navigator, 'language', { value: 'en-US', configurable: true })
})
afterEach(cleanup)

describe('onboarding', () => {
  it('walks a beginner through all 7 questions to a personal plan', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: "Let's go" }))

    // Next stays disabled until the question is answered.
    expect(screen.getByRole('button', { name: 'Next' })).toHaveProperty('disabled', true)
    fireEvent.click(screen.getByLabelText(/I'm brand new/))
    next()

    fireEvent.click(screen.getByLabelText('Save for retirement'))
    next()

    fireEvent.click(screen.getByRole('button', { name: '$50/month' }))
    next()

    fireEvent.click(screen.getByLabelText(/Not for a long time/))
    next()
    fireEvent.click(screen.getByLabelText('Not really'))
    next()
    fireEvent.click(screen.getByLabelText('Yes, but no 401(k) match'))
    next()
    fireEvent.click(screen.getByLabelText(/I'd panic/))
    next()

    // Plan page: beginner greeting, safety-net and calm nudges, budget preview.
    expect(screen.getByRole('heading', { name: 'My plan' })).toBeTruthy()
    expect(screen.getByText(/start with the basics/)).toBeTruthy()
    expect(screen.getByText(/Build a small emergency fund/)).toBeTruthy()
    expect(screen.getByText(/normal to feel nervous/)).toBeTruthy()
    expect(screen.getByText(/Investing \$50 a month for 30 years/)).toBeTruthy()

    // Saved locally and the calculator is pre-filled with the budget.
    expect(JSON.parse(localStorage.getItem('ia.profile')!).experience).toBe('new')
    expect(localStorage.getItem('ia.calc.monthly')).toBe('50')
  })

  it('can be skipped, and offers the questions again from My plan', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }))
    expect(screen.getByText('Get your personal plan')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Start the questions' }))
    expect(screen.getByRole('heading', { name: /How much do you know/ })).toBeTruthy()
  })

  it('keeps the draft when switching language mid-way', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: "Let's go" }))
    fireEvent.click(screen.getByLabelText(/I know a little/))
    fireEvent.click(screen.getByRole('button', { name: 'ES' }))
    expect(screen.getByLabelText(/Sé un poco/)).toHaveProperty('checked', true)
    expect(document.documentElement.lang).toBe('es')
  })

  it('ignores a corrupted saved profile instead of crashing', () => {
    localStorage.setItem('ia.profile', '{"experience":"guru"}')
    renderApp()
    expect(screen.getByRole('heading', { name: "Let's make this about you" })).toBeTruthy()
  })
})
