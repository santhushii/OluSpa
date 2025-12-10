import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./styles.css";

// Mark images as loaded when they finish loading (run after React renders)
if (typeof window !== "undefined") {
  const handleImageLoad = (img: HTMLImageElement) => {
    img.setAttribute("data-loaded", "true");
  };

  const setupImageLoading = () => {
    if (!document.body) {
      setTimeout(setupImageLoading, 100);
      return;
    }

    // Handle images already in DOM
    const images = document.querySelectorAll("img[loading='lazy']");
    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        handleImageLoad(img as HTMLImageElement);
      } else {
        img.addEventListener("load", () => handleImageLoad(img as HTMLImageElement));
        img.addEventListener("error", () => handleImageLoad(img as HTMLImageElement));
      }
    });

    // Handle dynamically added images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const images = element.querySelectorAll("img[loading='lazy']");
            images.forEach((img) => {
              if ((img as HTMLImageElement).complete) {
                handleImageLoad(img as HTMLImageElement);
              } else {
                img.addEventListener("load", () => handleImageLoad(img as HTMLImageElement));
                img.addEventListener("error", () => handleImageLoad(img as HTMLImageElement));
              }
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupImageLoading);
  } else {
    setTimeout(setupImageLoading, 0);
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

