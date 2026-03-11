export type GalleryCategory = 'Events' | 'Customer Setups' | 'Range' | 'Behind The Scenes';

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
};

export const galleryCategories: Array<'All' | GalleryCategory> = [
  'All',
  'Events',
  'Customer Setups',
  'Range',
  'Behind The Scenes',
];

// Single source of truth for gallery page images.
// Keep all paths under /images/gallery/gallery-page-images.
export const galleryImages: GalleryItem[] = [
  { id: 1, src: '/images/gallery/gallery-page-images/2F7E1551-4604-48A1-89F4-E873E80ACE44.JPG', alt: 'Archery target setup in field', category: 'Customer Setups' },
  { id: 2, src: '/images/gallery/gallery-page-images/About-Us.webp', alt: 'Broken Arrow Outdoors team in the field', category: 'Behind The Scenes' },
  { id: 3, src: '/images/gallery/gallery-page-images/DSC06093.jpg', alt: 'Bowhunter practice rep', category: 'Events' },
  { id: 4, src: '/images/gallery/gallery-page-images/DSC06839.JPG', alt: 'Target setup on range', category: 'Range' },
  { id: 5, src: '/images/gallery/gallery-page-images/DSC06842.JPG', alt: 'Event target lineup', category: 'Events' },
  { id: 6, src: '/images/gallery/gallery-page-images/DSC06857-Enhanced-NR-Edit.JPG', alt: 'Steel target in field', category: 'Customer Setups' },
  { id: 7, src: '/images/gallery/gallery-page-images/DSC07104-2.jpg', alt: 'Bowhunter shooting session', category: 'Events' },
  { id: 8, src: '/images/gallery/gallery-page-images/DSC07174-Edit.JPG', alt: 'Target and range backdrop', category: 'Range' },
  { id: 9, src: '/images/gallery/gallery-page-images/DSC08963.jpg', alt: 'Customer target setup', category: 'Customer Setups' },
  { id: 10, src: '/images/gallery/gallery-page-images/DSC09031 (1).jpg', alt: 'Range session at dusk', category: 'Range' },
  { id: 11, src: '/images/gallery/gallery-page-images/IMG_6631.JPG', alt: 'Customer setup in field', category: 'Customer Setups' },
  { id: 12, src: '/images/gallery/gallery-page-images/IMG_8229.JPG', alt: 'Archery event photo', category: 'Events' },
];
