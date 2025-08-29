// src/components/ProtectedRoute.jsx
import { SignedIn, SignedOut, SignInButton, useClerk } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Protected({ children }) {
  const location = useLocation();
  const { openSignIn } = useClerk();
  const autoBtnRef = useRef(null);

  // When the user lands on a protected route while signed out,
  // automatically open the Clerk sign-in modal. If `openSignIn`
  // isn't available (older environments), fall back to clicking
  // a hidden <SignInButton />.
  useEffect(() => {
    // only fires in SignedOut branch (see below)
    if (openSignIn) {
      openSignIn({
        // send them back to where they wanted to go
        redirectUrl: location.pathname + location.search,
      });
    } else if (autoBtnRef.current) {
      autoBtnRef.current.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SignedIn>{children}</SignedIn>

      <SignedOut>
        {/* Hidden auto-trigger fallback */}
        <SignInButton
          mode="modal"
          afterSignInUrl={location.pathname + location.search}
        >
          <button ref={autoBtnRef} className="sr-only">Sign in</button>
        </SignInButton>

        {/* Visible fallback if they close the modal */}
        <div className="p-10 flex flex-col items-center gap-4 text-center">
          <p className="text-gray-600">Please sign in to access this feature.</p>
          <SignInButton
            mode="modal"
            afterSignInUrl={location.pathname + location.search}
          >
            <button className="rounded-md bg-black px-5 py-2 text-white">
              Open sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
