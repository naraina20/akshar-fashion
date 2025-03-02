"use client";

import { useEffect, useRef } from "react";

export function ModalComponent({ modalId = "myModal", children }) {
  const modalRef = useRef();

  useEffect(() => {
    // Dynamically import Bootstrap's Modal
    const { Modal } = require("bootstrap");

    if (modalRef.current) {
      const modalInstance = new Modal(modalRef.current);
      return () => {
        modalInstance.dispose();
      };
    }
  }, []);

  return (
    <div ref={modalRef} className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog">
        {children}
      </div>
    </div>
  );
}
