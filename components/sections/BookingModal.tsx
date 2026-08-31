"use client";

import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useSite } from "@/components/providers/SiteProvider";
import { copy } from "@/data/copy";
import { BookingForm } from "./BookingForm";
import { BookingSuccessModal, type BookingReceipt } from "./BookingSuccessModal";

export function BookingModal() {
  const { bookingOpen, closeBooking } = useSite();
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  const handleSubmitted = useCallback(
    (next: BookingReceipt) => {
      setReceipt(next);
      closeBooking();
    },
    [closeBooking]
  );

  return (
    <>
      <Modal
        open={bookingOpen}
        title={copy.booking.heading}
        onClose={closeBooking}
        closeLabel={copy.booking.close}
        wide
      >
        <BookingForm onSubmitted={handleSubmitted} onCancel={closeBooking} />
      </Modal>
      <BookingSuccessModal
        open={Boolean(receipt)}
        receipt={receipt}
        onClose={() => setReceipt(null)}
      />
    </>
  );
}
