import * as amplitude from '@amplitude/analytics-browser'

export type ValidPropertyValue = string | number | boolean | string[] | number[]

export interface Properties {
  [key: string]: ValidPropertyValue
}

export interface AmplitudeContextType {
  logEvent: typeof amplitude.track
  setUserProperties: typeof amplitude.identify
  setUserId: typeof amplitude.setUserId
  isTrackingEnabled: boolean
  resetSession: typeof amplitude.reset
}

export interface TrackingEvent {
  eventName: string
  properties?: Properties
}

export interface FormValues {
  [key: string]: string | number | boolean
}

export interface FilterValues {
  [key: string]: string | number | boolean | Array<string | number>
}

export interface ModalProperties {
  modal_name: string
  action: 'open' | 'close'
}

export interface DownloadProperties {
  file_name: string
  source?: string
}

export interface ShareProperties {
  content_name: string
  content_id: string
  share_medium: 'email' | 'link' | 'kakao' | 'facebook' | 'twitter' | string
}

export type AmplitudeEventName =
  | 'form_submit'
  | 'filter'
  | 'modal_view'
  | 'download'
  | 'share'
  | string
