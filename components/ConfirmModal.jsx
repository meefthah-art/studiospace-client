"use client";
import Modal from "./Modal";

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = "Confirm", danger = false, loading = false }) {
  return (
    <Modal open={open} onClose={loading ? () => {} : onClose} title={title}>
      <p className="text-sm leading-relaxed text-base-content/75">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Keep it</button>
        <button className={`btn ${danger ? "btn-error" : "btn-primary"}`} onClick={onConfirm} disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}{confirmText}
        </button>
      </div>
    </Modal>
  );
}
