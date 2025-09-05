import React, { useState } from "react";
import GoogleSignInBtn from "./GoogleSignInBtn";
import "./signInModal.css";
import Link from "next/link";

export default function SignInModal() {
  const [agreed, setAgreed] = useState(false); // Track checkbox state

  return (
    <div
      className="modal fade signIn-modal"
      id="signInModal"
      tabIndex={-1}
      aria-labelledby="signInModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="signInModalLabel">
              Sign In Confirmation
            </h1>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <p>
              By entering FitMuse, you confirm that you are at least{" "}
              <strong>18 years old</strong>. This website contains
              adult-oriented fitness content intended for a mature audience
              only. If you are under 18, or if such content is illegal in your
              location, please leave now.
            </p>

            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheckbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="termsCheckbox">
                I agree to the{" "}
                <Link
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={agreed ? "text-success" : "text-warning"}
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <GoogleSignInBtn disabled={!agreed} />
          </div>
        </div>
      </div>
    </div>
  );
}
