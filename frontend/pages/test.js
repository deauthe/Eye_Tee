import React from 'react'

const test = () => {
    const handleGoogleAuth = async () => {
        const apiUrl = "http://localhost:8080/api/auth/google";
      
        const popup = window.open(apiUrl, "Google OAuth", "width=600, height=600");
      
        const handleAuthResponse = async (event) => {
          if (event.origin !== apiUrl) {
            return;
          }
      
          const { data } = await event.data.json();
          const { _id, isDesigner } = data;
      
          // Store Google authentication data in the session
          sessionStorage.setItem("_id", _id);
          sessionStorage.setItem("isDesigner", isDesigner);
      
          // Close the popup
          popup.close();
      
          // Redirect the user to the desired page after successful authentication
          window.location.replace("/auth/login");
        };
      
        window.addEventListener("message", handleAuthResponse);
      
        // Close the popup if it's not closed by the authentication response
        const checkPopupClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopupClosed);
            window.removeEventListener("message", handleAuthResponse);
          }
        }, 1000);
      };
      
  return (
    <div>
        <button onClick={handleGoogleAuth}>Google</button>
    </div>

  )
}

export default test