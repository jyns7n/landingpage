interface OnlineStoreButtonProps {
  href: string;
  disabled: boolean;
}

const BASE =
  "flex h-[54px] w-full max-w-[373px] items-center justify-center rounded-[60px] font-favorit text-[16px] font-bold leading-[19.872px] tracking-[0.6323px] text-white transition-colors duration-200";

/** Primary CTA: orange → dark orange on hover; grey + non-interactive when out of stock. */
export function OnlineStoreButton({ href, disabled }: OnlineStoreButtonProps) {
  if (disabled) {
    return (
      <button type="button" disabled className={`${BASE} cursor-not-allowed bg-disabled`}>
        OUT OF STOCK
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BASE} bg-orange hover:bg-orange-dark focus-visible:bg-orange-dark`}
    >
      ONLINE STORE
    </a>
  );
}
