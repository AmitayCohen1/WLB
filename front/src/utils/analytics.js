import ReactGA from "react-ga"
const trackingId = process.env.REACT_APP_TRACKING_ID


function init() {
  // Enable debug mode on the local development environment
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  ReactGA.initialize(trackingId, 
    // { debug: isDev }
    )
}

function sendEvent(payload) {
    ReactGA.event(payload)
}

function sendPageview(path) {
    ReactGA.set({ page: path })
    ReactGA.pageview(path)
}

const analytics = {
  init,
  sendEvent,
  sendPageview,
}

export default analytics;