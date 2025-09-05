
declare global {
    interface Window {
      RenderRemoteHeader?: (container: HTMLElement) => void;
    }
  }
  import React, { useEffect } from "react";
  export default function NavbarLayout(props) {
    useEffect(() => {
      // Only run on client
      if (typeof window === "undefined") return;
  
      // If already loaded, just render
      function renderHeader() {
        if (window.RenderRemoteHeader && document.getElementById("remote-header")) {
          window.RenderRemoteHeader(document.getElementById("remote-header"));
        }
      }
  
      // If script already loaded, render
      if (window.RenderRemoteHeader) {
        renderHeader();
        return;
      }
  
      // Otherwise, load the UMD script
      const script = document.createElement("script");
      script.src = "https://smythos.com/wp-content/themes/generatepress_child/js/header.umd.js";
      script.async = true;
      script.onload = renderHeader;
      document.body.appendChild(script);
  
      // Optional: Cleanup
      return () => {
        // remove header or clean up if needed
      };
    }, []);
  
    // ... rest of your layout code
    return (
      <div>
        <div id="remote-header" />
        {/* Your other navbar/layout JSX */}
      </div>
    );
  }
  