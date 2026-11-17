import Image from "next/image";
import Link from "next/link";

export default function StyleTilePage() {
  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-12 lg:p-16 max-w-7xl mx-auto space-y-24">
      {/* Header */}
      <header className="border-b border-line pb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-muted lowercase tracking-wider">
            // iic mission control &bull; style tile &bull; v1.0
          </span>
          <span className="font-mono text-xs text-spark">
            &bull; system operational
          </span>
        </div>
        <h1 className="font-sans text-4xl md:text-5xl font-light uppercase tracking-widest text-text">
          FRONTEND DESIGN SYSTEM
        </h1>
        <p className="font-sans text-sm md:text-base text-muted mt-2 max-w-2xl">
          Deep-space mission control aesthetics: quiet, minimal, editorial. Built strictly with Tailwind CSS tokens and zero component libraries.
        </p>
      </header>

      {/* SECTION 1: Color Tokens & WCAG Contrast */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 01</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Color Tokens &amp; Contrast Swatches
          </h2>
        </div>
        <p className="font-sans text-xs text-muted">
          All text and accent pairings strictly exceed WCAG AA contrast standards (minimum 4.5:1 on #050506 background).
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Background */}
          <div className="border border-line bg-background p-4 flex flex-col justify-between h-36">
            <div>
              <p className="font-sans text-sm font-medium text-text">Background</p>
              <p className="font-mono text-xs text-muted">#050506</p>
            </div>
            <p className="font-mono text-[10px] text-muted">Base canvas</p>
          </div>

          {/* Surface */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36">
            <div>
              <p className="font-sans text-sm font-medium text-text">Surface</p>
              <p className="font-mono text-xs text-muted">#0D0D0F</p>
            </div>
            <p className="font-mono text-[10px] text-muted">Card containers</p>
          </div>

          {/* Disc */}
          <div className="border border-line bg-disc p-4 flex flex-col justify-between h-36">
            <div>
              <p className="font-sans text-sm font-medium text-text">Disc</p>
              <p className="font-mono text-xs text-muted">#1B1B1D</p>
            </div>
            <p className="font-mono text-[10px] text-muted">Eclipse center</p>
          </div>

          {/* Line */}
          <div className="border border-line bg-line p-4 flex flex-col justify-between h-36">
            <div>
              <p className="font-sans text-sm font-medium text-text">Line</p>
              <p className="font-mono text-xs text-muted">#2B2B30</p>
            </div>
            <p className="font-mono text-[10px] text-muted">1px dividers</p>
          </div>

          {/* Line Bright */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36 relative overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/35" />
            <div>
              <p className="font-sans text-sm font-medium text-text">Line Bright</p>
              <p className="font-mono text-xs text-muted">rgba(255,255,255,0.35)</p>
            </div>
            <p className="font-mono text-[10px] text-muted">Active highlights</p>
          </div>

          {/* Text Primary */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36">
            <div>
              <div className="w-5 h-5 rounded-full bg-[#F2F0EB] mb-2" />
              <p className="font-sans text-sm font-medium text-text">Text Primary</p>
              <p className="font-mono text-xs text-muted">#F2F0EB</p>
            </div>
            <p className="font-mono text-[10px] text-spark">18.5:1 (AAA)</p>
          </div>

          {/* Text Muted */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36">
            <div>
              <div className="w-5 h-5 rounded-full bg-muted mb-2" />
              <p className="font-sans text-sm font-medium text-text">Muted</p>
              <p className="font-mono text-xs text-muted">#8C8C94</p>
            </div>
            <p className="font-mono text-[10px] text-spark">5.8:1 (AA)</p>
          </div>

          {/* Ignition */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36">
            <div>
              <div className="w-5 h-5 rounded-full bg-ignition mb-2" />
              <p className="font-sans text-sm font-medium text-text">Ignition</p>
              <p className="font-mono text-xs text-muted">#FF6A2B</p>
            </div>
            <p className="font-mono text-[10px] text-spark">5.3:1 (Rare accent)</p>
          </div>

          {/* Spark */}
          <div className="border border-line bg-surface p-4 flex flex-col justify-between h-36">
            <div>
              <div className="w-5 h-5 rounded-full bg-spark mb-2" />
              <p className="font-sans text-sm font-medium text-text">Spark</p>
              <p className="font-mono text-xs text-muted">#E6C36A</p>
            </div>
            <p className="font-mono text-[10px] text-spark">10.4:1 (Tiny dots)</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Typography & Club Facts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 02</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Typography Scale &amp; Club Facts
          </h2>
        </div>

        <div className="border border-line p-8 space-y-8 bg-surface/40">
          <div>
            <p className="font-mono text-xs text-muted mb-2">// display heading &bull; urbanist light uppercase</p>
            <p className="font-sans text-4xl md:text-6xl font-light uppercase tracking-wider text-text">
              IDEA INNOVATION CELL
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted mb-2">// page heading h1 &bull; urbanist light uppercase</p>
            <h1 className="font-sans text-2xl md:text-3xl font-light uppercase tracking-wide text-text">
              FLAGSHIP VSLV ROCKETRY MISSION
            </h1>
          </div>

          <div>
            <p className="font-mono text-xs text-muted mb-2">// section heading h2 &bull; urbanist light</p>
            <h2 className="font-sans text-xl md:text-2xl font-light tracking-wide text-text">
              Facilities &bull; ISRO Innovation Centre
            </h2>
          </div>

          <div>
            <p className="font-mono text-xs text-muted mb-2">// body copy &bull; urbanist regular</p>
            <p className="font-sans text-sm md:text-base text-[#F2F0EB]/90 max-w-3xl leading-relaxed">
              Per the club brochure, VSLV (VSSUT Satellite Launch Vehicle) is India&apos;s first student-built indigenous sounding rocket and Asia&apos;s first multipurpose student rocketry mission, meant to monitor silt deposit levels in the Hirakud Dam. Tagline: <span className="text-text font-medium">MAKE. BREAK. CREATE.</span>
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted mb-2">// monospace labels &bull; ibm plex mono lowercase</p>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-muted">
              <span>// project 01</span>
              <span>// domains: coding &bull; electronics &bull; chemical &bull; mechanical</span>
              <span>// contact: iic@vssut.ac.in</span>
              <span className="text-spark">// telemetry link nominal</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: The Three Button Styles */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 03</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            The Three Button Styles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border border-line bg-surface/30">
          {/* Primary Pill */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-mono text-xs text-muted">// primary action</span>
            <button
              type="button"
              className="bg-text text-background font-sans font-medium text-sm px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-glow"
            >
              Initiate Mission
            </button>
            <p className="font-mono text-[11px] text-muted">Solid white pill</p>
          </div>

          {/* Secondary Link */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-mono text-xs text-muted">// secondary action</span>
            <Link
              href="#secondary"
              className="inline-flex items-center gap-2 text-text hover:text-white font-sans text-sm group transition-colors py-2"
            >
              <span>Explore Projects</span>
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <p className="font-mono text-[11px] text-muted">Plain text link with arrow</p>
          </div>

          {/* Tertiary Bracket Outline */}
          <div className="flex flex-col items-start gap-4">
            <span className="font-mono text-xs text-muted">// tertiary action</span>
            <button
              type="button"
              className="relative px-5 py-2 font-mono text-xs text-text bg-surface border border-line hover:border-line-bright transition-all"
            >
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-tr" />
              <div className="corner-bracket-bl" />
              <div className="corner-bracket-br" />
              [ // VIEW TELEMETRY ]
            </button>
            <p className="font-mono text-[11px] text-muted">Bracket-corner outline button</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Component Cards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 04</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Card Components (Project, Patent Ledger, Team)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Project Card with Corner Brackets */}
          <div className="border border-line bg-surface p-6 relative flex flex-col justify-between group">
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-tr" />
            <div className="corner-bracket-bl" />
            <div className="corner-bracket-br" />

            <div>
              <div className="aspect-video relative mb-4 overflow-hidden border border-line/60">
                <Image
                  src="/images/_placeholders/landscape-blue.webp"
                  alt="Project Placeholder"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-mono text-[11px] text-muted lowercase tracking-wider mb-2">
                // project 01 &bull; aerospace
              </p>
              <h3 className="font-sans text-base font-medium text-text mb-2">
                SAMPLE - Autonomous Agricultural Drone
              </h3>
              <p className="font-sans text-xs text-muted leading-relaxed">
                An intelligent drone platform designed for precision agriculture and crop health monitoring across rural farms.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line/50 flex justify-between items-center">
              <span className="font-mono text-[10px] text-muted">ORDER: 01</span>
              <span className="text-text text-sm">&rarr;</span>
            </div>
          </div>

          {/* 2. Patent Ledger Card with Status Chip */}
          <div className="border border-line bg-surface p-6 relative flex flex-col justify-between">
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-tr" />
            <div className="corner-bracket-bl" />
            <div className="corner-bracket-br" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-muted lowercase">
                  // patent ledger &bull; 01
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 border border-spark/40 text-spark bg-spark/5 rounded-sm">
                  GRANTED
                </span>
              </div>

              <h3 className="font-sans text-base font-medium text-text mb-2">
                SAMPLE - Multipurpose Pedal Operated Paddy Planter
              </h3>

              <div className="space-y-1.5 font-mono text-xs text-muted mt-4">
                <p>
                  <span className="text-[#8C8C94]/60">NO:</span> IN202131001234
                </p>
                <p>
                  <span className="text-[#8C8C94]/60">BY:</span> Idea Innovation Cell, VSSUT Burla
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/50 font-mono text-[10px] text-muted flex items-center justify-between">
              <span>STATUS: VERIFIED</span>
              <span className="text-spark">&bull; ACTIVE</span>
            </div>
          </div>

          {/* 3. Team Card */}
          <div className="border border-line bg-surface p-6 relative flex flex-col justify-between">
            <div className="corner-bracket-tl" />
            <div className="corner-bracket-tr" />
            <div className="corner-bracket-bl" />
            <div className="corner-bracket-br" />

            <div>
              <div className="w-20 h-20 relative mb-4 rounded-full overflow-hidden border border-line">
                <Image
                  src="/images/_placeholders/square-avatar.webp"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="font-mono text-[11px] text-ignition lowercase tracking-wider mb-1">
                // coordinator
              </p>
              <h3 className="font-sans text-base font-medium text-text">
                SAMPLE - Aarav Sharma
              </h3>
              <p className="font-sans text-xs text-muted mb-1">
                Lead Student Coordinator
              </p>
              <p className="font-mono text-[11px] text-muted/70">
                Batch of 2022
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line/50 flex items-center gap-3 font-mono text-xs text-muted">
              <span className="hover:text-text cursor-pointer">LinkedIn</span>
              <span>&bull;</span>
              <span className="hover:text-text cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Visual Vocabulary & Decorative Details (from Mockup 09) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 05</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Decorative Vocabulary (From About Mockup 09)
          </h2>
        </div>
        <p className="font-sans text-xs text-muted">
          Used sparingly (at most two details per section) to maintain editorial clarity.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border border-line bg-surface/30">
          {/* 3x3 Dot Grid */}
          <div className="border border-line p-6 flex flex-col items-center justify-center gap-4">
            <div className="grid grid-cols-3 gap-1.5 p-2 border border-line/40">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted/60" />
              ))}
            </div>
            <p className="font-mono text-xs text-muted text-center">// 3x3 dot grid</p>
          </div>

          {/* Four-Point Star */}
          <div className="border border-line p-6 flex flex-col items-center justify-center gap-4">
            <svg
              className="w-8 h-8 text-text/80"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
            <p className="font-mono text-xs text-muted text-center">// four-point star</p>
          </div>

          {/* Thin L-Shaped Line Frame */}
          <div className="border border-line p-6 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-t border-l border-line-bright relative">
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-text" />
            </div>
            <p className="font-mono text-xs text-muted text-center">// l-shaped frame</p>
          </div>

          {/* Micro Arrow & Mono Tag */}
          <div className="border border-line p-6 flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-light text-text">&nearr;</span>
            <p className="font-mono text-xs text-muted text-center">// small arrow &nearr;</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Soft Glow Sample (Eclipse Disc from Mockup 09) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 06</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Soft White-Grey Corona Glow (Eclipse Sample)
          </h2>
        </div>

        <div className="p-12 border border-line bg-[#050506] flex flex-col md:flex-row items-center justify-around gap-8 overflow-hidden relative">
          {/* Eclipse Disk with CSS radial glow */}
          <div className="relative flex items-center justify-center">
            {/* Soft corona glow layer */}
            <div className="absolute w-56 h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute w-44 h-44 rounded-full bg-white/15 blur-xl" />

            {/* Disc body (#1B1B1D) */}
            <div className="relative w-40 h-40 rounded-full bg-disc border border-white/20 flex flex-col items-center justify-center text-center p-4 shadow-corona">
              <span className="text-lg font-light text-text mb-1">&nearr;</span>
              <p className="font-sans text-sm font-light text-text uppercase tracking-wider">
                OUR MISSION
              </p>
              <p className="font-mono text-[9px] text-muted lowercase mt-1">
                make break create
              </p>
            </div>
          </div>

          <div className="max-w-md space-y-3">
            <h3 className="font-sans text-xl font-light uppercase tracking-wide text-text">
              Mission Control Corona
            </h3>
            <p className="font-sans text-xs text-muted leading-relaxed">
              Constructed strictly with pure CSS radial blurs and a #1B1B1D disc. No purple, no neon saturation, no heavy drop shadows. Conforms directly to the visual design language in Reference 09.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: Keyboard Focus Styles */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">// 07</span>
          <h2 className="font-sans text-xl font-light uppercase tracking-wider text-text">
            Keyboard Focus Accessibility
          </h2>
        </div>

        <div className="p-6 border border-line bg-surface/30 flex flex-wrap items-center gap-6">
          <p className="font-sans text-xs text-muted max-w-sm">
            Press <kbd className="px-1.5 py-0.5 border border-line bg-disc font-mono text-[10px] text-text rounded">Tab</kbd> to inspect the high-contrast accessible focus ring:
          </p>
          <button
            type="button"
            className="px-4 py-2 border border-line bg-surface text-text font-mono text-xs hover:border-line-bright focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          >
            [ Focusable Element 1 ]
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-line bg-surface text-text font-mono text-xs hover:border-line-bright focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          >
            [ Focusable Element 2 ]
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <span>Idea Innovation Cell &bull; VSSUT Burla</span>
        <span>// make. break. create.</span>
      </footer>
    </div>
  );
}
