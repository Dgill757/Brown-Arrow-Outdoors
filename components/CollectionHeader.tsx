type CollectionHeaderProps = {
  title: string;
  intro: string;
};

export default function CollectionHeader({ title, intro }: CollectionHeaderProps) {
  return (
    <div className="mb-10 border-b border-white/10 pb-8">
      <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">{title}</h1>
      <p className="text-lg text-white/65 max-w-3xl">{intro}</p>
    </div>
  );
}
