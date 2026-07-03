import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CompassMark } from "@/components/compass-mark";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center bg-mist px-5 text-center">
      <CompassMark className="h-16 w-16" />
      <p className="eyebrow mt-6">Off the map</p>
      <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-moss">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm font-body text-deep-forest/75">
        That trail doesn&apos;t lead anywhere. Let&apos;s get you back to the
        tea hills.
      </p>
      <Button asChild variant="gold" className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </section>
  );
}
