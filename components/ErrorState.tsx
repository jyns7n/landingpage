export function ErrorState() {
  return (
    <section className="mx-auto flex max-w-[1300px] flex-col items-center gap-[24px] px-[17px] py-[160px] text-center">
      <p role="alert" className="font-noto text-[18px] font-medium leading-[30px] text-black">
        商品情報を読み込めませんでした。時間をおいて再度お試しください。
      </p>
      {/* A full reload is intended here: it re-runs the data fetch. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        className="flex h-[54px] w-[260px] items-center justify-center rounded-[60px] bg-black font-favorit text-[16px] font-bold tracking-[0.6323px] text-white transition-colors hover:bg-[#535353]"
      >
        Try again
      </a>
    </section>
  );
}
