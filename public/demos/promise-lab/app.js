;(() => {
  'use strict'

  const root = document.documentElement
  const themeToggle = document.getElementById('themeToggle')
  const themeMeta = document.querySelector('meta[name="theme-color"]')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const THEME_COLORS = {
    light: '#F6F1E7',
    dark: '#09090A',
  }

  function syncThemeControls() {
    const dark = root.classList.contains('dark')
    const label = dark ? 'Switch to light theme' : 'Switch to dark theme'

    themeToggle.setAttribute('aria-label', label)
    themeToggle.title = label

    if (themeMeta) {
      themeMeta.content = dark ? THEME_COLORS.dark : THEME_COLORS.light
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const dark = !root.classList.contains('dark')

      root.classList.toggle('dark', dark)
      root.style.colorScheme = dark ? 'dark' : 'light'

      try {
        localStorage.setItem('jn-theme', dark ? 'dark' : 'light')
      } catch (error) {
        /* Private browsing can block storage; the page keeps the chosen theme. */
      }

      syncThemeControls()
    })

    syncThemeControls()
  }

  const statePanel = document.getElementById('statePanel')
  const stateBadgeText = document.getElementById('stateBadgeText')
  const stateTitle = document.getElementById('stateTitle')
  const stateDetail = document.getElementById('stateDetail')
  const stateSettled = document.getElementById('stateSettled')
  const lifecycle = document.getElementById('lifecycle')
  const manualStatus = document.getElementById('manualStatus')
  const resolveButton = document.getElementById('resolveBtn')
  const rejectButton = document.getElementById('rejectBtn')
  const fetchButtons = Array.from(document.querySelectorAll('[data-fetch]'))
  const fetchResult = document.getElementById('fetchResult')
  const fetchBody = document.getElementById('fetchBody')
  const logList = document.getElementById('log')
  const logEmpty = document.getElementById('logEmpty')
  const clearLogButton = document.getElementById('clearLog')
  const lifecycleSteps = Array.from(lifecycle.querySelectorAll('li'))
  const actionButtons = [resolveButton, rejectButton, ...fetchButtons]

  const MANUAL_DELAY = 900
  const FETCH_TIMEOUT = 8000
  const MAX_LOG_ITEMS = 40
  const ENDPOINTS = {
    success: 'https://jsonplaceholder.typicode.com/posts/1',
    http: 'https://jsonplaceholder.typicode.com/posts/0',
    network: 'https://no-such-host.invalid/post/1',
  }

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  let busy = false

  function setPanel(state, badge, title, detail, settled) {
    statePanel.dataset.state = state
    statePanel.setAttribute('aria-busy', state === 'pending' ? 'true' : 'false')
    stateBadgeText.textContent = badge
    stateTitle.textContent = title
    stateDetail.textContent = detail
    stateSettled.textContent = settled
  }

  function setBusy(nextBusy) {
    busy = nextBusy

    actionButtons.forEach((button) => {
      button.setAttribute('aria-disabled', String(nextBusy))
    })
  }

  function setLifecycle(step) {
    lifecycleSteps.forEach((item) => {
      item.toggleAttribute('data-active', item.dataset.step === step)
    })
  }

  function makeElement(tag, className, text) {
    const element = document.createElement(tag)

    if (className) {
      element.className = className
    }

    if (text !== undefined) {
      element.textContent = text
    }

    return element
  }

  function addLog(tone, message) {
    const item = makeElement('li', 'log-item')
    const time = makeElement('span', 'log-time', timeFormatter.format(new Date()))
    const copy = makeElement('span', 'log-message', message)

    item.dataset.tone = tone
    item.append(time, copy)
    logList.append(item)

    while (logList.children.length > MAX_LOG_ITEMS) {
      logList.firstElementChild.remove()
    }

    logEmpty.hidden = true

    if (prefersReducedMotion.matches) {
      logList.scrollTop = logList.scrollHeight
    } else {
      logList.scrollTo({ top: logList.scrollHeight, behavior: 'smooth' })
    }
  }

  function truncate(text, maxLength) {
    return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text
  }

  function formatStatus(status, statusText) {
    const fallbacks = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
    }
    const label = statusText || fallbacks[status] || ''
    return `${status}${label ? ` ${label}` : ''}`
  }

  function runManualPromise(outcome) {
    if (busy) {
      return
    }

    const shouldResolve = outcome === 'resolve'
    const action = shouldResolve ? 'resolve()' : 'reject()'

    setBusy(true)
    setLifecycle('pending')
    setPanel(
      'pending',
      'Pending',
      'Promise pending',
      `A promise is waiting ${MANUAL_DELAY} ms before it calls ${action}.`,
      'No',
    )
    manualStatus.textContent = `Pending — ${action} is scheduled for 900 ms from now.`
    addLog(
      'pending',
      `Promise created. ${action} will be called after ${MANUAL_DELAY} ms.`,
    )

    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (shouldResolve) {
          resolve('Resolved after 900 ms.')
        } else {
          reject(new Error('Rejected on purpose after 900 ms.'))
        }
      }, MANUAL_DELAY)
    })
      .then((message) => {
        setLifecycle('fulfilled')
        setPanel('fulfilled', 'Fulfilled', 'Promise resolved', message, 'Yes')
        manualStatus.textContent =
          'Fulfilled — the .then() handler received the resolved value.'
        addLog('success', `Promise fulfilled: ${message}`)
      })
      .catch((error) => {
        setLifecycle('rejected')
        setPanel('rejected', 'Rejected', 'Promise rejected', error.message, 'Yes')
        manualStatus.textContent =
          'Rejected — the .catch() handler received the error.'
        addLog('error', `Promise rejected: ${error.message}`)
      })
      .finally(() => {
        setBusy(false)
      })
  }

  function renderFetchLoading(kind) {
    const descriptions = {
      success: 'Requesting the sample post…',
      http: 'Requesting a missing post…',
      network: 'Requesting an unreachable host…',
    }

    fetchResult.dataset.state = 'loading'
    fetchResult.setAttribute('aria-busy', 'true')
    fetchBody.replaceChildren()

    const wrapper = makeElement('div', 'result-loading')
    const spinner = makeElement('span', 'spinner')
    const note = makeElement('p', 'result-note', descriptions[kind])

    spinner.setAttribute('aria-hidden', 'true')
    wrapper.append(spinner, note)
    fetchBody.append(wrapper)
  }

  function renderFetchSuccess(post, status, statusText) {
    fetchResult.dataset.state = 'success'
    fetchBody.replaceChildren()

    const head = makeElement('div', 'result-head')
    const chip = makeElement(
      'span',
      'result-chip',
      formatStatus(status, statusText),
    )
    const source = makeElement('span', 'result-source', 'JSONPlaceholder')
    const list = makeElement('dl', 'result-list')

    const rows = [
      ['Post ID', post.id],
      ['User ID', post.userId],
    ]

    rows.forEach(([label, value]) => {
      const row = makeElement('div')
      row.append(
        makeElement('dt', null, label),
        makeElement('dd', null, String(value)),
      )
      list.append(row)
    })

    const title = makeElement('p', 'result-title', post.title)
    const endpoint = makeElement(
      'p',
      'result-endpoint',
      `GET ${ENDPOINTS.success}`,
    )

    head.append(chip, source)
    fetchBody.append(head, list, title, endpoint)
  }

  function renderFetchError({ chip, detail, sub, endpoint }) {
    fetchResult.dataset.state = 'error'
    fetchBody.replaceChildren()

    const head = makeElement('div', 'result-head')
    const chipElement = makeElement('span', 'result-chip', chip)
    const source = makeElement('span', 'result-source', 'Fetch rejected')

    chipElement.dataset.tone = 'error'
    head.append(chipElement, source)

    const detailElement = makeElement('p', 'result-note', detail)
    const subElement = makeElement('p', 'result-error-detail', sub)
    const endpointElement = makeElement(
      'p',
      'result-endpoint',
      `GET ${endpoint}`,
    )

    fetchBody.append(head, detailElement, subElement, endpointElement)
  }

  async function runFetch(kind) {
    if (busy) {
      return
    }

    const endpoint = ENDPOINTS[kind]

    setBusy(true)
    renderFetchLoading(kind)
    setPanel(
      'pending',
      'Requesting',
      'Fetch in progress',
      `Waiting for a response. The request is aborted after ${FETCH_TIMEOUT / 1000} seconds.`,
      'No',
    )
    addLog('pending', `GET ${endpoint} — request sent.`)

    const controller = new AbortController()
    let timedOut = false
    const timeoutId = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, FETCH_TIMEOUT)

    try {
      const response = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
        cache: 'no-store',
      })

      addLog(
        response.ok ? 'success' : 'error',
        `Response received: HTTP ${response.status} ${response.statusText}.`,
      )

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`)
        error.status = response.status
        error.statusText = response.statusText
        throw error
      }

      let data

      try {
        data = await response.json()
      } catch (error) {
        const parseError = new Error('The response body was not valid JSON.')
        parseError.isParseError = true
        throw parseError
      }

      const post = {
        id: data && data.id !== undefined ? data.id : 'Unknown',
        userId: data && data.userId !== undefined ? data.userId : 'Unknown',
        title:
          data && typeof data.title === 'string' && data.title.trim()
            ? data.title
            : 'Untitled post',
      }

      renderFetchSuccess(post, response.status, response.statusText)
      setPanel(
        'fulfilled',
        'Fulfilled',
        'Response received',
        `HTTP ${response.status} from JSONPlaceholder. The JSON body parsed successfully.`,
        'Yes',
      )
      addLog(
        'success',
        `JSON parsed for post ${post.id}: "${truncate(post.title, 64)}"`,
      )
    } catch (error) {
      if (timedOut) {
        renderFetchError({
          chip: 'Timed out',
          detail: `No response arrived within ${FETCH_TIMEOUT / 1000} seconds, so the request was aborted.`,
          sub: 'AbortController stopped the fetch. This is a client-side timeout.',
          endpoint,
        })
        setPanel(
          'rejected',
          'Rejected',
          'Request timed out',
          `No response within ${FETCH_TIMEOUT / 1000} seconds. The abort signal rejected the fetch.`,
          'Yes',
        )
        addLog(
          'error',
          `Request timed out after ${FETCH_TIMEOUT} ms and was aborted.`,
        )
      } else if (error && typeof error.status === 'number') {
        const statusLabel = formatStatus(error.status, error.statusText)

        renderFetchError({
          chip: statusLabel,
          detail:
            'The request reached the server, but the response was not ok. The promise chain moved to catch.',
          sub: `HTTP ${error.status} — response.ok was false. No post data was read.`,
          endpoint,
        })
        setPanel(
          'rejected',
          'Rejected',
          'Request rejected',
          `HTTP ${error.status} — response.ok was false, so the catch path handled it.`,
          'Yes',
        )
        addLog(
          'error',
          `HTTP ${error.status} triggered the catch path. No retry was attempted.`,
        )
      } else if (error && error.isParseError) {
        renderFetchError({
          chip: 'Invalid JSON',
          detail:
            'A response arrived, but its body could not be parsed. The JSON parse step threw an error.',
          sub: 'This is a parsing failure, not an HTTP status failure.',
          endpoint,
        })
        setPanel(
          'rejected',
          'Rejected',
          'Parsing failed',
          'The response arrived, but response.json() could not parse the body.',
          'Yes',
        )
        addLog('error', 'JSON parsing failed. The catch path handled the error.')
      } else {
        renderFetchError({
          chip: 'Network error',
          detail:
            'No response arrived. fetch() rejected before an HTTP status existed, which is a network-level failure.',
          sub: 'The host could not be reached. This is different from an HTTP 404.',
          endpoint,
        })
        setPanel(
          'rejected',
          'Rejected',
          'Network failure',
          'The host could not be reached. fetch() rejected without an HTTP response.',
          'Yes',
        )
        addLog(
          'error',
          'Network failure: no HTTP response was received. The host could not be reached.',
        )
      }
    } finally {
      window.clearTimeout(timeoutId)
      fetchResult.setAttribute('aria-busy', 'false')
      setBusy(false)
    }
  }

  resolveButton.addEventListener('click', () => runManualPromise('resolve'))
  rejectButton.addEventListener('click', () => runManualPromise('reject'))

  fetchButtons.forEach((button) => {
    button.addEventListener('click', () => runFetch(button.dataset.fetch))
  })

  clearLogButton.addEventListener('click', () => {
    logList.replaceChildren()
    logEmpty.hidden = false
    logEmpty.textContent = 'Log cleared. Run a promise or make a request.'
  })
})()
