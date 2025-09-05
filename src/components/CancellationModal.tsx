import React from "react";
import "./signInModal.css";

export default function CancellationModal({
  subscriptionId,
  userId,
  cancelSubscription,
}: {
  subscriptionId: string | null | undefined;
  userId: number;
  cancelSubscription: (
    subscriptionId: string | null | undefined,
    userId: number
  ) => void;
}) {
  return (
    <div
      className="modal fade signIn-modal"
      id="cancellationModal"
      tabIndex={-1}
      aria-labelledby="cancellationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="cancellationModalLabel">
              Wait! Are you sure you want to cancel?
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
              We&apos;d truly hate to see you go. If you cancel now, you&apos;ll
              still enjoy full access until
              <span id="membershipEndDate">(end date)</span>. After that, your
              account will shift to the Free plan — with only limited access to
              our world of inspiration.
            </p>

            <p>Here&apos;s what you&apos;d be leaving behind:</p>
            <ul>
              <li>Exclusive galleries and premium media experiences</li>
              <li>Unlimited favorites and personalized collections</li>
              <li>
                Members-only perks, early releases, and deeper connections
              </li>
            </ul>

            <p>
              Many members who choose to stay just a little longer discover more
              than they expected — unlocking new favorites, new muses, and new
              moments of inspiration. Why step away now, when you&apos;re closer
              than ever to the best of FitMuse? ✨
            </p>
          </div>
          <div className="modal-footer">
            <a className="btn btn-danger" data-bs-dismiss="modal">
              Keep My Membership
            </a>
            <a
              onClick={() => cancelSubscription(subscriptionId, userId)}
              className="btn btn-secondary"
            >
              <span className="text-light">Yes, Cancel Anyway</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
