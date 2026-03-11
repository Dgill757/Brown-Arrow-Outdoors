import Script from 'next/script';

type ReviewWidgetSectionProps = {
  className?: string;
};

export default function ReviewWidgetSection({ className = '' }: ReviewWidgetSectionProps) {
  return (
    <section className={className}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
          See More <span className="text-brand-primary">Reviews</span>
        </h2>
        <p className="mt-3 text-white/60">Additional verified customer feedback from our review feed.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 md:p-4">
        <Script
          src="https://reputationhub.site/reputation/assets/review-widget.js"
          strategy="lazyOnload"
        />
        <iframe
          className="lc_reviews_widget"
          src="https://reputationhub.site/reputation/widgets/review_widget/abKkT0fMkyol5jy5hUjr?widgetId=69b1b54994203d468153cb8f"
          frameBorder={0}
          scrolling="no"
          style={{ minWidth: '100%', width: '100%' }}
          title="Broken Arrow Outdoors review widget"
        />
      </div>
    </section>
  );
}
