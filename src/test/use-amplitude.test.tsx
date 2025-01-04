import { Identify } from '@amplitude/analytics-browser'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AmplitudeContext } from '../amplitude-provider'
import { useAmplitude } from '../use-amplitude'

describe('useAmplitude', () => {
  const mockLogEvent = vi.fn()
  const mockSetUserProperties = vi.fn()
  const mockSetUserId = vi.fn()
  const mockResetSession = vi.fn()

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AmplitudeContext.Provider
      value={{
        logEvent: mockLogEvent,
        setUserProperties: mockSetUserProperties,
        setUserId: mockSetUserId,
        isTrackingEnabled: true,
        resetSession: mockResetSession,
      }}
    >
      {children}
    </AmplitudeContext.Provider>
  )

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should track event when tracking is enabled', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.trackEvent('test_event', { property: 'value' })

    expect(mockLogEvent).toHaveBeenCalledWith('test_event', {
      property: 'value',
    })
  })

  it('should track form submit', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.trackFormSubmit(
      'login',
      { email: 'test@test.com' },
      { extra: 'data' }
    )

    expect(mockLogEvent).toHaveBeenCalledWith('login submit', {
      form_name: 'login',
      form_values: { email: 'test@test.com' },
      extra: 'data',
    })
  })

  it('should track modal view', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.trackModalView(
      { modal_name: 'settings', action: 'open' },
      { extra: 'data' }
    )

    expect(mockLogEvent).toHaveBeenCalledWith('settings open', {
      modal_name: 'settings',
      action: 'open',
      extra: 'data',
    })
  })

  it('should track page view', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.trackPageView('home', { extra: 'data' })

    expect(mockLogEvent).toHaveBeenCalledWith('home page view', {
      page_name: 'home',
      extra: 'data',
    })
  })

  it('should handle logout correctly', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.trackLogout()

    expect(mockSetUserId).toHaveBeenCalledWith('undefined')
    expect(mockLogEvent).toHaveBeenCalledWith('user_logout', undefined)
    expect(mockResetSession).toHaveBeenCalled()
  })

  it('should update user properties', () => {
    const { result } = renderHook(() => useAmplitude(), { wrapper })

    result.current.updateUserProperties({ name: 'John', age: 25 })

    const identify = new Identify()
    identify.set('name', 'John')
    identify.set('age', 25)

    expect(mockSetUserProperties).toHaveBeenCalledWith(expect.any(Identify))
  })

  it('should not track event when tracking is disabled', () => {
    const disabledWrapper = ({ children }: { children: React.ReactNode }) => (
      <AmplitudeContext.Provider
        value={{
          logEvent: mockLogEvent,
          setUserProperties: mockSetUserProperties,
          setUserId: mockSetUserId,
          isTrackingEnabled: false,
          resetSession: mockResetSession,
        }}
      >
        {children}
      </AmplitudeContext.Provider>
    )

    const { result } = renderHook(() => useAmplitude(), {
      wrapper: disabledWrapper,
    })

    result.current.trackEvent('test_event')

    expect(mockLogEvent).not.toHaveBeenCalled()
  })
})
