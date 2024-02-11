/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { cacheNames, clientsClaim } from "workbox-core";
import { setCatchHandler, setDefaultHandler } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute } from "workbox-routing/registerRoute";

declare let self: ServiceWorkerGlobalScope;

const cacheName = cacheNames.runtime;

const manifestURLs: RequestInfo[] = self.__WB_MANIFEST.map(
  (entry: { url: RequestInfo | URL }) => new Request(entry.url)
);

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(manifestURLs);
    })
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (!manifestURLs.includes(key)) {
              return cache.delete(key);
            }
          })
        );
      });
    })
  );

  clientsClaim();
});

// Handle push subscription
self.addEventListener("pushsubscriptionchange", (event: ExtendableEvent) => {
  console.log("Push Subscription has been changed!");
  // You can send the updated subscription to the server here if needed
});

// Handle push notifications
self.addEventListener("push", (event: PushEvent) => {
  const payload = event.data.json();

  event.waitUntil(
    self.registration.showNotification("Your App Name", {
      body: payload.message,
    })
  );
});

// Subscribe to push notifications
self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then((subscription) => {
        console.log("Push subscription successful:", subscription);
        // Send the subscription to the server if needed
        sendSubscriptionToServer(subscription);
      })
      .catch((error) => {
        console.error("Error subscribing to push notifications:", error);
      })
  );
});

const sendSubscriptionToServer = async (subscription) => {
  // Send the subscription details to your server using a fetch or other method
  try {
    const resp = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription }),
    });
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

// Register route for handling push messages
registerRoute(
  ({ request }) => request.destination === "push",
  new StaleWhileRevalidate()
);

// Fallback to app-shell for document request
setDefaultHandler(new NetworkFirst());

setCatchHandler(({ event }) => {
  if (event.request.destination === "document") {
    return caches.match(new Request("index.html"));
  }

  return Response.error();
});

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const buffer = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    buffer[i] = rawData.charCodeAt(i);
  }

  return buffer;
}

const applicationServerKey = urlBase64ToUint8Array(
  "BGj0jEiD6Em_NTiWP2Iqxg4iRUs6-4jcie6KTagLWJJsXgWDFmLitL2wjHIa0WZfSRTEC-91SsFcidbV42Qn8OU"
);
