type Props = {
  className?: string;
};

export function LeafMark({ className = "size-10" }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="14" fill="#1B3B2B" />
      <path
        d="M12 26.5c6.4-1.2 10.6-5.1 12.8-11.4 2.6 6.8.4 12.2-5.2 15.1"
        stroke="#D4AF37"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M20.2 8.2c6.8 3.4 9.6 9.4 8.2 17.2-6.2-1.6-10.8-5.8-13.4-12.4 1.6-2.1 3.4-3.6 5.2-4.8Z"
        fill="#2C5E43"
      />
      <path
        d="M20.4 10.4c4.6 2.6 6.6 7 5.6 12.6"
        stroke="#D4AF37"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path d="M20.2 11.2v16.4" stroke="#FAF8F5" strokeWidth="1.05" strokeLinecap="round" />
    </svg>
  );
}
