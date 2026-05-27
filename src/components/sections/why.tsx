import Image from "next/image";
import { MapPin, User, ShieldCheck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ValueProp = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const VALUES: ValueProp[] = [
  {
    icon: MapPin,
    title: "Local",
    body: "Based right here in Macomb County — your neighbor, not a chain.",
  },
  {
    icon: User,
    title: "Owner-operated",
    body: "You talk to Mike directly — no call centers, no runaround.",
  },
  {
    icon: ShieldCheck,
    title: "Insured",
    // TODO: confirm insurance/licensing status with Mike before publishing.
    // Copy kept generic so it can be removed cleanly if it turns out untrue.
    body: "Licensed and insured.",
  },
  {
    icon: Clock,
    title: "Reliable",
    body: "Quotes returned within one business day, work done when promised.",
  },
];

/**
 * Why — an editorial split, not a flat icon row. A forest band carries a
 * large headline + the four value props as a typographic list (each with a
 * lime accent rule and small icon), paired with a real curb-appeal photo on
 * the right so the section reads as a designed magazine spread. Forest/cream
 * contrast clears WCAG AA comfortably.
 *
 * The "Insured" claim stays deliberately generic and minimal (see its TODO);
 * it is never amplified into a headline or badge.
 */
export function Why() {
  return (
    <section
      id="why"
      aria-label="Why homeowners choose McCormick Services"
      className="bg-brand-forest bg-forest-weave py-20 text-brand-cream sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: editorial copy + value list */}
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-lime">
            Why homeowners choose Mike
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
            A neighbor you can count on—{" "}
            <span className="text-brand-lime">not a faceless company.</span>
          </h2>

          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border-l-2 border-brand-lime/70 pl-4"
              >
                <dt className="flex items-center gap-2 font-display text-lg font-bold text-brand-cream">
                  <Icon
                    className="size-5 shrink-0 text-brand-lime"
                    aria-hidden="true"
                  />
                  {title}
                </dt>
                <dd className="mt-1.5 leading-relaxed text-brand-cream/80">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: paired photo. ROYALTY-FREE UNSPLASH PLACEHOLDER — swap for
            Mike's real finished-job photo. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-brand-cream/10 lg:aspect-[4/5]">
          <Image
            src="/work/why-porch.jpg"
            alt="A welcoming front porch with rocking chairs in warm evening light"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
