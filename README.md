# react-amplitude-provider

[![npm version](https://badge.fury.io/js/react-amplitude-provider.svg)](https://badge.fury.io/js/react-amplitude-provider)
[![npm downloads](https://img.shields.io/npm/dm/react-amplitude-provider.svg)](https://www.npmjs.com/package/react-amplitude-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/usernamebuzz/react-amplitude-provider/branch/main/graph/badge.svg)](https://codecov.io/gh/usernamebuzz/react-amplitude-provider)
[![Test](https://github.com/usernamebuzz/react-amplitude-provider/actions/workflows/test.yml/badge.svg)](https://github.com/usernamebuzz/react-amplitude-provider/actions/workflows/test.yml)

[English](#english) | [한국어](#korean)

# English

## React Amplitude Provider

A lightweight React provider for Amplitude Analytics with TypeScript support.

### Installation

```bash
npm install react-amplitude-provider
```

or

```bash
yarn add react-amplitude-provider
```

### Features

- 🚀 Easy integration with Amplitude Analytics
- 📊 Built-in tracking functions for common events
- 🔒 TypeScript support
- 🎯 Session replay support
- 💡 Customizable tracking options
- ⚡️ Supports Next.js

### Next.js Usage
```tsx
import { AmplitudeProvider } from 'react-amplitude-provider/next';
```

-> Add /next in import path

### Usage

1. Wrap your app with AmplitudeProvider:

```tsx
import { AmplitudeProvider } from 'react-amplitude-provider'

function App() {
  return (
    <AmplitudeProvider
      apiKey='YOUR_AMPLITUDE_API_KEY'
      isTrackingEnabled={true} // optional, defaults to true
    >
      <YourApp />
    </AmplitudeProvider>
  )
}
```

2. Use the tracking hooks in your components:

```tsx
import { useAmplitude } from 'react-amplitude-provider'

function YourComponent() {
  const {
    trackEvent,
    trackPageView,
    trackFormSubmit,
    trackModalView,
    trackDownload,
    trackShare,
    trackFilter,
    updateUserProperties,
    trackLogout,
  } = useAmplitude()

  // Track a simple event
  trackEvent('button_click', { button_name: 'submit' })

  // Track page view
  trackPageView('home_page', { source: 'direct' })

  // Track form submission
  trackFormSubmit('signup_form', { email: 'user@example.com' })

  return <div>Your component content</div>
}
```

### Available Tracking Methods

- `trackEvent(eventName: string, properties?: Properties)`
- `trackPageView(pageName: string, properties?: Properties)`
- `trackFormSubmit(formName: string, formValues: FormValues, properties?: Properties)`
- `trackModalView(modalProperties: ModalProperties, properties?: Properties)`
- `trackDownload(downloadProperties: DownloadProperties, properties?: Properties)`
- `trackShare(shareProperties: ShareProperties, properties?: Properties)`
- `trackFilter(filterName: string, filterValues: FilterValues, properties?: Properties)`
- `updateUserProperties(properties: Properties)`
- `trackLogout()`
- `setUserId(userId: string)`
- `resetSession()`

### License

MIT

---

# Korean

## React Amplitude Provider

TypeScript를 지원하는 Amplitude Analytics용 React 프로바이더입니다.

### 설치

```bash
npm install react-amplitude-provider
```

or

```bash
yarn add react-amplitude-provider
```

### 기능

### 주요 기능

- 🚀 Amplitude Analytics와 쉬운 연동
- 📊 일반적인 이벤트를 위한 내장 트래킹 함수
- 🔒 TypeScript 지원
- 🎯 세션 리플레이 지원
- 💡 커스터마이징 가능한 트래킹 옵션
- ⚡️ Next.js 지원

### Next.js에서 사용법
```tsx
import { AmplitudeProvider } from 'react-amplitude-provider/next';
```
-> import path에 /next를 붙입니다.


### 사용법

1. AmplitudeProvider로 앱 감싸기:

```tsx
import { AmplitudeProvider } from 'react-amplitude-provider'

function App() {
  return (
    <AmplitudeProvider
      apiKey='YOUR_AMPLITUDE_API_KEY'
      isTrackingEnabled={true} // optional, defaults to true
    >
      <YourApp />
    </AmplitudeProvider>
  )
}
```

2. 컴포넌트에서 트래킹 훅 사용하기:

```tsx
import { useAmplitude } from 'react-amplitude-provider'

function YourComponent() {
  const {
    trackEvent,
    trackPageView,
    trackFormSubmit,
    trackModalView,
    trackDownload,
    trackShare,
    trackFilter,
    updateUserProperties,
    trackLogout,
  } = useAmplitude()

  // 간단한 이벤트 추적
  trackEvent('button_click', { button_name: 'submit' })

  // 페이지 뷰 추적
  trackPageView('home_page', { source: 'direct' })
}
```

### 사용 가능한 트래킹 메소드

- `trackEvent(eventName: string, properties?: Properties)` - 일반 이벤트 트래킹
- `trackPageView(pageName: string, properties?: Properties)` - 페이지 뷰 트래킹
- `trackFormSubmit(formName: string, formValues: FormValues, properties?: Properties)` - 폼 제출 트래킹
- `trackModalView(modalProperties: ModalProperties, properties?: Properties)` - 모달 뷰 트래킹
- `trackDownload(downloadProperties: DownloadProperties, properties?: Properties)` - 다운로드 트래킹
- `trackShare(shareProperties: ShareProperties, properties?: Properties)` - 공유 트래킹
- `trackFilter(filterName: string, filterValues: FilterValues, properties?: Properties)` - 필터 사용 트래킹
- `updateUserProperties(properties: Properties)` - 사용자 속성 업데이트
- `trackLogout()` - 로그아웃 트래킹
- `setUserId(userId: string)` - 사용자 ID 설정
- `resetSession()` - 세션 초기화

### 라이선스

MIT
