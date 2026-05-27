import Image from "next/image";

/**
 * Recent work gallery — real photos in a tasteful asymmetric grid (NOT a
 * slider). The portrait power-washing shot becomes a tall tile spanning two
 * rows on the left; the three landscape shots fill the right. Captions live
 * in a forest gradient overlay on each tile, hero-style, so they stay legible
 * over busy photography.
 *
 * PLACEHOLDER PHOTOS: all four images are royalty-free Unsplash stand-ins.
 * SWAP THESE FOR MIKE'S REAL JOB PHOTOS once available — keep the same
 * filenames in /public/work or update the `src` values below.
 */
type Shot = {
  src: string;
  alt: string;
  caption: string;
  /** Layout span classes for the asymmetric grid (desktop only). */
  span: string;
};

const SHOTS: Shot[] = [
  {
    src: "/work/power-washing.jpg",
    alt: "Worker power washing a surface with a pressure cleaner",
    caption: "Power washing",
    span: "lg:row-span-2",
  },
  {
    src: "/work/lawn-care.jpg",
    alt: "Trimming the edge of a lush green lawn",
    caption: "Lawn care",
    span: "",
  },
  {
    src: "/work/fall-cleaning.jpg",
    alt: "Leaf blower clearing autumn leaves from a yard",
    caption: "Fall cleanup",
    span: "",
  },
  {
    src: "/work/curb-appeal.jpg",
    alt: "Clean white house with a freshly manicured front lawn",
    caption: "Exterior refresh — Macomb County",
    span: "sm:col-span-2 lg:col-span-2",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-brand-cream bg-dot-grid py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-olive">
            See it for yourself
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brand-forest sm:text-5xl">
            Recent work
          </h2>
        </div>

        <ul className="mt-10 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:auto-rows-[16rem] sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.map((shot, i) => (
            <li
              key={shot.src}
              className={`group relative overflow-hidden rounded-3xl bg-brand-forest shadow-sm ring-1 ring-brand-forest/10 transition-shadow hover:shadow-lg motion-reduce:transition-none ${shot.span}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-forest/85 via-brand-forest/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-5">
                <span
                  aria-hidden="true"
                  className="h-4 w-1 rounded-full bg-brand-lime"
                />
                <p className="font-display text-base font-bold text-brand-cream [text-shadow:0_1px_8px_rgba(26,31,18,0.5)]">
                  {shot.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
