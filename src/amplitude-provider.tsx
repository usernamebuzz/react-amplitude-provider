import * as amplitude from '@amplitude/analytics-browser'
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser'
import React, { ReactNode, createContext, useEffect } from 'react'

import { AMPLITUDE_CONSTANTS } from './constants/amplitude'
import { AmplitudeContextType } from './types/amplitude'

export const AmplitudeContext = createContext<AmplitudeContextType>({
  logEvent: amplitude.track,
  setUserProperties: amplitude.identify,
  setUserId: amplitude.setUserId,
  isTrackingEnabled: true,
  resetSession: amplitude.reset,
})

interface AmplitudeProviderProps {
  children: ReactNode
  apiKey: string
  isTrackingEnabled?: boolean
}

export function AmplitudeProvider({
  children,
  apiKey,
  isTrackingEnabled = true,
}: AmplitudeProviderProps) {
  useEffect(() => {
    if (!apiKey) {
      console.error('Amplitude API key is required')
      return
    }

    try {
      amplitude.init(apiKey, undefined, {
        defaultTracking: {
          sessions: true,
          pageViews: false,
          formInteractions: false,
          fileDownloads: false,
        },
      })

      const sessionReplayTracking = sessionReplayPlugin({
        sampleRate: AMPLITUDE_CONSTANTS.SESSION_REPLAY_SAMPLE_RATE,
      })
      amplitude.add(sessionReplayTracking)
    } catch (error) {
      console.error('Failed to initialize Amplitude:', error)
    }
  }, [apiKey])

  return (
    <AmplitudeContext.Provider
      value={{
        logEvent: amplitude.track,
        setUserProperties: amplitude.identify,
        setUserId: amplitude.setUserId,
        isTrackingEnabled,
        resetSession: amplitude.reset,
      }}
    >
      {children}
    </AmplitudeContext.Provider>
  )
}
