export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-train-for-buck-fever',
    title: 'How To Train For Buck Fever',
    excerpt: 'Use pressure-based drills to control your shot process when adrenaline spikes.',
    seoDescription: 'A practical training plan for bowhunters who want to perform under real hunting pressure.',
    date: 'October 12, 2025',
    readTime: '9 min read',
    category: 'Training',
    image: '/images/hero/hero-1.png',
    sections: [
      {
        id: 'why-buck-fever-happens',
        heading: 'Why Buck Fever Happens',
        paragraphs: [
          'Buck fever is a stress response. As soon as your brain recognizes a high-value opportunity, your body raises heart rate, narrows vision, and reduces fine motor control. None of that means you are weak. It means your system is working exactly as designed.',
          'The mistake most hunters make is trying to eliminate adrenaline. You cannot. Instead, train a repeatable shot routine that still works while your pulse is elevated and your breathing is uneven.',
        ],
      },
      {
        id: 'build-a-pressure-shot-routine',
        heading: 'Build A Pressure Shot Routine',
        paragraphs: [
          'Create a five-step cue stack and use the same words every single arrow: stance, grip, anchor, settle, execute. Keep cues short and physical. In the stand, your brain needs simple commands it can trust under stress.',
          'Use a timer in practice. Give yourself 10 to 15 seconds from draw to release when simulating close-range opportunities. This forces decisiveness and prevents over-aiming.',
        ],
      },
      {
        id: 'drills-that-transfer-to-the-field',
        heading: 'Drills That Transfer To The Field',
        paragraphs: [
          'Run elevated heart-rate reps by doing a short sprint before each shot. Mix standing, kneeling, and awkward-angle positions. Shoot one cold arrow each session and log the result. Cold-arrow accountability is where honest progress shows up.',
          'Use realistic target shapes with small vital zones. Dot shooting has value, but bowhunting accuracy improves faster when your eyes train on anatomical placement instead of abstract circles.',
        ],
      },
      {
        id: 'field-readiness-checklist',
        heading: 'Field Readiness Checklist',
        paragraphs: [
          'Before season, run this test for three weeks: one cold-arrow rep daily, one pressure set every other day, and one broadhead confirmation session weekly. If your first arrow is consistently inside your personal ethical zone, you are ready.',
          'If your first arrow is inconsistent, keep training and tighten your shot selection rules. Discipline beats confidence when conditions are imperfect.',
        ],
      },
    ],
  },
  {
    slug: 'shot-placement-training-for-ethical-kills',
    title: 'Shot Placement Training For Ethical Kills',
    excerpt: 'A practical framework for rehearsing quartering angles and ethical decision-making.',
    seoDescription: 'Learn how to train shot placement under realistic bowhunting scenarios.',
    date: 'September 28, 2025',
    readTime: '10 min read',
    category: 'Ethics',
    image: '/images/hero/hero-2.png',
    sections: [
      {
        id: 'ethics-start-before-season',
        heading: 'Ethics Start Before Season',
        paragraphs: [
          'Ethical shot placement is not a last-second choice. It is a pre-committed standard you build through reps. If you decide your rules before the shot, you avoid emotional decision-making when the opportunity appears.',
          'Define your personal maximum distance, minimum confidence threshold, and no-shoot angles. Write them down and treat them as hard limits.',
        ],
      },
      {
        id: 'train-for-quartering-angle-reality',
        heading: 'Train For Quartering-Angle Reality',
        paragraphs: [
          'Most real opportunities are not broadside textbook shots. Add quartering-away and quartering-to visual targets to your rotation and train arrow path, not just entry point.',
          'Use stake markers to represent shoulder, rib line, and offside exit. This helps you think in three dimensions while drawing and settling.',
        ],
      },
      {
        id: 'small-vitals-large-discipline',
        heading: 'Small Vitals, Large Discipline',
        paragraphs: [
          'Practice on smaller scoring zones than you plan to accept in the field. This raises your execution quality and naturally builds a safety margin.',
          'When practice standards go up, field decisions become calmer because your brain recognizes the same visual constraints you rehearsed.',
        ],
      },
    ],
  },
  {
    slug: 'how-steel-targets-improve-realism',
    title: 'How Steel Targets Improve Training Realism',
    excerpt: 'Steel targets create instant feedback loops that sharpen confidence and execution.',
    seoDescription: 'Understand when and how to integrate steel targets into your bowhunting training system.',
    date: 'September 16, 2025',
    readTime: '8 min read',
    category: 'Gear',
    image: '/images/hero/hero-3.png',
    sections: [
      {
        id: 'feedback-speed-matters',
        heading: 'Feedback Speed Matters',
        paragraphs: [
          'Training quality is tied to feedback quality. Steel gives immediate audible confirmation and removes guesswork from each rep. That faster loop increases focus and shortens correction time.',
          'When your shot process is right, the response is instant. When it is wrong, you know immediately and can fix one variable at a time.',
        ],
      },
      {
        id: 'building-pressure-with-purpose',
        heading: 'Building Pressure With Purpose',
        paragraphs: [
          'Steel silhouettes with tighter vital zones force deliberate aiming and disciplined release timing. They replicate the mental pressure of committing to a single precise window.',
          'This type of practice does not replace foam. It complements it by adding consequence and mental realism.',
        ],
      },
      {
        id: 'safe-use-guidelines',
        heading: 'Safe Use Guidelines',
        paragraphs: [
          'Always confirm recommended distance, arrow setup compatibility, and backstop requirements from the manufacturer. Keep a consistent angle to reduce unnecessary wear and maintain predictable arrow behavior.',
          'A well-planned steel routine gives years of consistent training while keeping sessions efficient and repeatable.',
        ],
      },
    ],
  },
  {
    slug: 'backyard-archery-range-setup-guide',
    title: 'Backyard Archery Range Setup Guide',
    excerpt: 'Build a compact, repeatable range that supports year-round progress.',
    seoDescription: 'Plan a safer and more effective backyard archery practice range.',
    date: 'August 30, 2025',
    readTime: '11 min read',
    category: 'Setup',
    image: '/images/hero/hero-4.png',
    sections: [
      {
        id: 'start-with-safety',
        heading: 'Start With Safety',
        paragraphs: [
          'Your range layout should prioritize safe misses before anything else. Use a reliable backstop and maintain clear side boundaries so every rep has controlled risk.',
          'Walk your property and map sight lines from elevated and ground-level positions. Remove distractions and define one shooting direction.',
        ],
      },
      {
        id: 'design-for-repeatability',
        heading: 'Design For Repeatability',
        paragraphs: [
          'Mark fixed distances and anchor points so your stance and timing can be compared week to week. Consistency is how you spot real improvement.',
          'A strong setup includes one precision lane, one pressure lane, and one angle lane for quartering scenarios.',
        ],
      },
      {
        id: 'equipment-zones',
        heading: 'Equipment Zones',
        paragraphs: [
          'Create a small prep station for arrows, broadheads, release, and note-taking. Fewer transitions between reps means better focus and more quality arrows in less time.',
          'Keep weather covers available for target longevity, especially in humid or high-UV environments.',
        ],
      },
    ],
  },
  {
    slug: 'target-angles-and-ethical-shot-discipline',
    title: 'Target Angles And Ethical Shot Discipline',
    excerpt: 'Angle-specific reps help you decide faster and pass marginal shots with confidence.',
    seoDescription: 'Train for quartering and elevated shot angles while protecting ethical standards.',
    date: 'August 12, 2025',
    readTime: '9 min read',
    category: 'Technique',
    image: '/images/hero/hero-5.png',
    sections: [
      {
        id: 'angle-recognition',
        heading: 'Angle Recognition Is A Skill',
        paragraphs: [
          'Most misses and poor hits begin with misread angles. Build a training set where each rep starts by calling the angle out loud before drawing.',
          'Naming the angle first slows impulsive shooting and improves decision quality.',
        ],
      },
      {
        id: 'exit-point-thinking',
        heading: 'Train Entry-To-Exit Path',
        paragraphs: [
          'Do not train entry points in isolation. Visualize the full arrow path and offside exit. This forces better alignment and cleaner risk assessment.',
          'If the path is uncertain because of shoulder or bone structure, pass the shot in practice and in season.',
        ],
      },
      {
        id: 'discipline-framework',
        heading: 'Use A Discipline Framework',
        paragraphs: [
          'Adopt a simple go/no-go framework: clear lane, acceptable angle, steady posture, calm pin, and known distance. If one fails, do not release.',
          'The goal is not to shoot more. The goal is to shoot better and pass sooner when conditions are wrong.',
        ],
      },
    ],
  },
  {
    slug: 'cold-arrow-accountability-system',
    title: 'Cold Arrow Accountability System',
    excerpt: 'Track your first arrow honestly to measure true field readiness.',
    seoDescription: 'A reliable cold-arrow system for bowhunters who want objective progress.',
    date: 'July 28, 2025',
    readTime: '7 min read',
    category: 'Training',
    image: '/images/hero/hero-6.png',
    sections: [
      {
        id: 'why-cold-arrows-matter',
        heading: 'Why Cold Arrows Matter',
        paragraphs: [
          'Your first arrow is the closest simulation of a real hunting shot. It has no warm-up correction and no confidence buffer from previous reps.',
          'If your cold arrow is inconsistent, your system still needs work regardless of group size later in the session.',
        ],
      },
      {
        id: 'scoring-protocol',
        heading: 'Create A Scoring Protocol',
        paragraphs: [
          'Score each cold arrow with objective zones and environmental notes: wind, posture, distance, and mental state. Track trends weekly.',
          'Use a pass/fail threshold tied to ethical shot placement, not vanity grouping.',
        ],
      },
      {
        id: 'weekly-adjustments',
        heading: 'Make Weekly Adjustments',
        paragraphs: [
          'If results drift, adjust one variable at a time: anchor consistency, timing, or sight picture discipline. Avoid changing everything at once.',
          'Steady gains come from stable routines, not constant reinvention.',
        ],
      },
    ],
  },
  {
    slug: 'building-a-hunting-season-prep-plan',
    title: 'Building A Hunting Season Prep Plan',
    excerpt: 'A four-phase progression to peak at the right time.',
    seoDescription: 'Plan your preseason bowhunting training with a repeatable progression.',
    date: 'July 11, 2025',
    readTime: '10 min read',
    category: 'Planning',
    image: '/images/hero/hero-2.png',
    sections: [
      {
        id: 'phase-1-foundation',
        heading: 'Phase 1: Foundation',
        paragraphs: [
          'Rebuild mechanics and confirm setup. Keep volume moderate and prioritize shot quality over total arrows. This phase prevents compounding bad habits.',
        ],
      },
      {
        id: 'phase-2-pressure',
        heading: 'Phase 2: Pressure Integration',
        paragraphs: [
          'Add timers, elevated heart rate, and angle scenarios. Keep one controlled lane for precision work so pressure does not degrade fundamentals.',
        ],
      },
      {
        id: 'phase-3-broadhead-confirmation',
        heading: 'Phase 3: Broadhead Confirmation',
        paragraphs: [
          'Transition to broadhead validation and realistic shot cadence. Use smaller round counts with strict execution standards.',
        ],
      },
      {
        id: 'phase-4-maintenance',
        heading: 'Phase 4: In-Season Maintenance',
        paragraphs: [
          'Protect confidence during season. Short sessions, frequent cold-arrow reps, and no major equipment changes unless required.',
        ],
      },
    ],
  },
  {
    slug: 'field-tested-gear-checklist-for-bowhunters',
    title: 'Field-Tested Gear Checklist For Bowhunters',
    excerpt: 'A practical pre-season checklist that prevents common failures.',
    seoDescription: 'Use this bowhunting gear checklist to avoid preventable issues before season.',
    date: 'June 24, 2025',
    readTime: '8 min read',
    category: 'Gear',
    image: '/images/hero/hero-3.png',
    sections: [
      {
        id: 'bow-and-arrow-system',
        heading: 'Bow And Arrow System',
        paragraphs: [
          'Inspect strings, serving, cams, and axle points. Confirm arrow spine and broadhead alignment. A reliable shot starts with reliable hardware.',
        ],
      },
      {
        id: 'release-and-optics',
        heading: 'Release And Optics',
        paragraphs: [
          'Dry-fire prevention, trigger feel consistency, and optic clarity all matter under low light and stress. Replace worn components early.',
        ],
      },
      {
        id: 'pack-and-recovery-items',
        heading: 'Pack And Recovery Essentials',
        paragraphs: [
          'Carry a lean but complete kit: blood-tracking markers, light, backup release, rangefinder battery, and weather layer. Reduce failure points without overloading.',
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
