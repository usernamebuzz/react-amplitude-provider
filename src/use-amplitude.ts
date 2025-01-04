import { Identify } from '@amplitude/analytics-browser'
import { useCallback, useContext } from 'react'

import { AmplitudeContext } from './amplitude-provider'
import {
  DownloadProperties,
  FilterValues,
  FormValues,
  ModalProperties,
  Properties,
  ShareProperties,
} from './types/amplitude'

export default function useAmplitude() {
  const {
    logEvent,
    setUserProperties,
    setUserId,
    isTrackingEnabled,
    resetSession,
  } = useContext(AmplitudeContext)

  const trackEvent = useCallback(
    (eventName: string, properties?: Properties) => {
      if (!isTrackingEnabled) return
      try {
        logEvent(eventName, properties)
      } catch (error) {
        console.error('Failed to track event:', error)
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackFormSubmit = useCallback(
    (formName: string, formValues: FormValues, properties?: Properties) => {
      if (isTrackingEnabled) {
        logEvent(`${formName} submit`, {
          form_name: formName,
          form_values: formValues,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackFilter = useCallback(
    (
      filterName: string,
      filterValues: FilterValues,
      properties?: Properties
    ) => {
      if (isTrackingEnabled) {
        logEvent(`${filterName} filter`, {
          filter_name: filterName,
          filter_values: filterValues,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackModalView = useCallback(
    (modalProperties: ModalProperties, properties?: Properties) => {
      if (isTrackingEnabled) {
        logEvent(`${modalProperties.modal_name} ${modalProperties.action}`, {
          ...modalProperties,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackDownload = useCallback(
    (downloadProperties: DownloadProperties, properties?: Properties) => {
      if (isTrackingEnabled) {
        logEvent(`${downloadProperties.file_name} download`, {
          ...downloadProperties,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackShare = useCallback(
    (shareProperties: ShareProperties, properties?: Properties) => {
      if (isTrackingEnabled) {
        logEvent(`${shareProperties.content_name} share`, {
          ...shareProperties,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackPageView = useCallback(
    (pageName: string, properties?: Properties) => {
      if (isTrackingEnabled) {
        logEvent(`${pageName} page view`, {
          page_name: pageName,
          ...properties,
        })
      }
    },
    [isTrackingEnabled, logEvent]
  )

  const trackLogout = useCallback(() => {
    setUserId('undefined')
    trackEvent('user_logout')
    resetSession()
  }, [setUserId, resetSession, trackEvent])

  const updateUserProperties = useCallback(
    (properties: Properties) => {
      const identify = new Identify()
      Object.entries(properties).forEach(([key, value]) => {
        identify.set(key, value)
      })
      setUserProperties(identify)
    },
    [setUserProperties]
  )

  return {
    trackEvent,
    trackFormSubmit,
    trackFilter,
    trackModalView,
    trackDownload,
    trackShare,
    updateUserProperties,
    setUserId,
    trackPageView,
    resetSession,
    trackLogout,
  }
}
