import ChallengeVideo from '@/components/ChallengeVideo';

export default function HeroVideoSection() {
  return (
    <section className="relative py-32 bg-white/5 border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">
          Feel The <span className="text-brand-primary">Pressure</span> <br />
          Before It Counts
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
          Practice with pressure and precision. Build confidence. Train like it&apos;s real.
          <br />
          &quot;You don&apos;t rise to the occasion, you fall to the level of your training.&quot;
        </p>
        <ChallengeVideo />
      </div>
    </section>
  );
}
