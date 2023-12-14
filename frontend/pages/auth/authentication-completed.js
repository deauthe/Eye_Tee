import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storeUserSession = (designer, userID) => {
  sessionStorage.setItem("idDesigner", designer);
  sessionStorage.setItem("userID", userID);
};

const AuthenticationCompleted = () => {
  const router = useRouter();

  useEffect(() => {
    const { designerId, userId } = router.query;

    if (designerId && userId) {
      // Call your storeUserSession function with the extracted values
      storeUserSession(designerId, userId);

      // Show a toast notification
      toast.success("Authentication completed!");
    } else {
      console.error("Invalid URL parameters");
    }

    // Redirect to the desired page (e.g., home page)
    setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds (adjust as needed)
  }, [router.query]);

  return (
    <>
      <div className="authentication-completed">
        <h1>Authentication Completed</h1>
        <p>Redirecting...</p>
      </div>
      <ToastContainer position="bottom-center" />
      <style jsx>{`
        .authentication-completed {
          text-align: center;
          margin-top: 50px;
          padding: 20px;
          background-color: #f0f0f0;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          font-size: 24px;
        }

        p {
          color: #666;
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

export default AuthenticationCompleted;