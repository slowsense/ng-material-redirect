"use strict";

const domain = "*://material.angular.io/*";
const decodedBaseUrl = "https://material.angular.io/";
const encodedBaseUrl = encodeURIComponent(decodedBaseUrl);

const baseUrlRegex = new RegExp(encodedBaseUrl, "i");
const versionUrlRegex = new RegExp(encodeURIComponent("https://material.angular.io/assets/versions.json"), "i");

function redirect(requestDetails) {

  const shouldRedirect = localStorage.getItem("activated") === 'true';
  if (!shouldRedirect)
    return;

  let version = localStorage.getItem("version");
  if (!version)
    version = 16;
  const decodedTargetUrl = `https://v${version}.material.angular.io/`;
  const encodedTargetUrl = encodeURIComponent(decodedTargetUrl);

  let browserUrlEncoded = encodeURIComponent(requestDetails.url);
  if (!browserUrlEncoded)
    return;

  if (browserUrlEncoded.match(baseUrlRegex) && !browserUrlEncoded.match(versionUrlRegex)) {
    const newUrl = browserUrlEncoded.replace(encodedBaseUrl, encodedTargetUrl);
    const browserUrlDecoded = decodeURIComponent(newUrl);

    return { redirectUrl: browserUrlDecoded };
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [domain] },
  ["blocking"]
);
