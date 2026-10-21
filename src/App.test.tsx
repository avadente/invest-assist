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
  window.scrollTo = () => {}
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
    expect(screen.getAllByText(/Investing \$50 a month for 30 years/).length).toBeGreaterThan(0)

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

  it('lets people unselect an answer entirely', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: "Let's go" }))
    const opt = screen.getByLabelText(/I know a little/)
    fireEvent.click(opt)
    expect(opt).toHaveProperty('checked', true)
    expect(screen.getByRole('button', { name: 'Next' })).toHaveProperty('disabled', false)
    fireEvent.click(opt)
    expect(opt).toHaveProperty('checked', false)
    expect(screen.getByRole('button', { name: 'Next' })).toHaveProperty('disabled', true)
  })
})

const finishOnboarding = () => {
  fireEvent.click(screen.getByRole('button', { name: "Let's go" }))
  fireEvent.click(screen.getByLabelText(/I know a little/)); next()
  fireEvent.click(screen.getByLabelText('Save for retirement')); next()
  fireEvent.click(screen.getByRole('button', { name: '$25/month' })); next()
  fireEvent.click(screen.getByLabelText(/Not for a long time/)); next()
  fireEvent.click(screen.getByLabelText('A little, under $1,000')); next()
  fireEvent.click(screen.getByLabelText('Yes, but no 401(k) match')); next()
  fireEvent.click(screen.getByLabelText(/I'd wait it out/)); next()
}

describe('My plan', () => {
  it('shows the new tagline', () => {
    renderApp()
    expect(screen.getByText('Investing explained, plain and simple.')).toBeTruthy()
  })

  it('builds a personalized step plan that syncs with Am I ready?', () => {
    renderApp()
    finishOnboarding()
    // No match at this job, so no match step.
    expect(screen.queryByText(/401\(k\) match, I contribute/)).toBeNull()
    const step = screen.getByLabelText(/I know roughly how much comes in/)
    fireEvent.click(step)
    expect(JSON.parse(localStorage.getItem('ia.ready')!)).toEqual(['budget'])
    expect(screen.getAllByText('1 of 7 steps done').length).toBeGreaterThan(0)
  })

  it('shows a shareable summary built from the answers', () => {
    renderApp()
    finishOnboarding()
    const preview = document.querySelector('.share-preview')!
    expect(preview.textContent).toContain('My Invest-Assist plan')
    expect(preview.textContent).toContain('$25/month')
    expect(preview.textContent).toContain('Roth IRA')
    expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Download image' })).toBeTruthy()
  })
})

describe('Growth calculator', () => {
  it('starts the amount box empty and never keeps a leading 0', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }))
    window.location.hash = 'grow'
    fireEvent(window, new HashChangeEvent('hashchange'))
    const start = screen.getByLabelText(/Starting amount/) as HTMLInputElement
    expect(start.value).toBe('')
    expect(start.placeholder).toBe('0')
    fireEvent.change(start, { target: { value: '0500' } })
    expect(start.value).toBe('500')
    expect(screen.getByText('Why start now?')).toBeTruthy()
  })
})

describe('demo + myths', () => {
  it('fills a sample plan in one tap', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: /See an example plan/ }))
    expect(screen.getByRole('heading', { name: 'My plan' })).toBeTruthy()
    expect(document.querySelector('.share-preview')!.textContent).toContain('$25/month')
  })

  it('shows money myths from home', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Skip for now' }))
    window.location.hash = 'myths'
    fireEvent(window, new HashChangeEvent('hashchange'))
    expect(screen.getByText('"Investing is just gambling."')).toBeTruthy()
  })
})
