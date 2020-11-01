window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { dataLayer.push(arguments); };
gtag("js", new Date());
var GoogleAnalyticsInterop;
(function (GoogleAnalyticsInterop) {
    function configure(trackingId) {
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + trackingId;
        document.head.appendChild(script);
        gtag("config", trackingId);
        console.log("[GTAG][" + trackingId + "] Configured!");
    }
    GoogleAnalyticsInterop.configure = configure;
    function navigate(trackingId, href) {
        gtag("config", trackingId, { page_location: href });
        console.log("[GTAG][" + trackingId + "] Navigated: '" + href + "'");
    }
    GoogleAnalyticsInterop.navigate = navigate;
    function trackEvent(event, eventCategory, eventLabel, eventValue) {
        gtag("event", event, { event_category: eventCategory, event_label: eventLabel, value: eventValue });
        console.log("[GTAG][Event trigered]: " + event);
    }
    GoogleAnalyticsInterop.trackEvent = trackEvent;
})(GoogleAnalyticsInterop || (GoogleAnalyticsInterop = {}));
