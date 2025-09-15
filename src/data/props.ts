export interface HeroSectionDataProps {
  title: string;
  typedWords: [
    {
      id: number;
      value: string;
    }
  ];
  description: string;
  bgImage: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  guideBtn: {
    name: string;
    link: string;
  };
  videoBtn: {
    name: string;
    link: string;
  };
  leftStats: {
    end: number;
    duration: number;
    icon: string;
    name: string;
  };
  rightStats: {
    end: number;
    duration: number;
    icon: string;
    name: string;
  };
}

export interface NavDataProps {
  id: number;
  name: string;
  link: string;
  active: boolean;
}

export interface HeaderDataProps {
  sitename: string;
  signInBtn: {
    name: string;
    link: string;
  };
  logo: {
    id: number;
    name: string;
    url: string;
  };
  nav: [NavDataProps];
}

export interface ServiceItemProps {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  price: number;
  stripeProductId: string;
  stripePriceId: string;
}

export interface SaleItemProps {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  endDate: string;
  startDate: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null | undefined;
  isActive: boolean;
  email: string;
  service: ServiceItemProps;
}

export interface UserCollectionItemProps {
  id: number;
  documentId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  post_item?: PostItemProps;
}

export interface UserFavouriteItemProps {
  id: number;
  documentId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  model?: GalleryModelItemProps;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    url: string;
  };
  access: string;
  sale?: SaleItemProps;
  collections: UserCollectionItemProps[];
  favourites: UserFavouriteItemProps[];
}

export interface SectionTitleProps {
  id: number;
  title: string;
  leadWords: string;
  descriptionTitle: string;
}

export interface ModelStyleProps {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: string;
}

export interface GalleryFilterItemProps {
  id: number;
  active: boolean;
  style: ModelStyleProps;
}

export interface GallerySectionDataProps {
  sectionTitle: SectionTitleProps;
  galleryFilter: GalleryFilterItemProps[];
}

export interface ModelCoverSlideProps {
  id: number;
  documentId: string;
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GalleryModelTagProps {
  id: number;
  documentId: string;
  name: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  meaning: string;
}

export interface GalleryModelItemProps {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  youtube: string;
  patreon: string;
  dob: string;
  slug: string;
  role: string;
  brief: string;
  style: ModelStyleProps;
  avatar: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  thumbnail: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  coverSlides: ModelCoverSlideProps[];
  tags: GalleryModelTagProps[];
  hook: string;
}

export interface MetaDataProps {
  pagination: {
    page: number;
    pageSize: string;
    pageCount: number;
    total: number;
  };
}

export interface ProtectedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProtectedBlobUrlProps {
  url?: string | null;
}

export interface PostItemProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  type: string;
  access: string;
  views: number;
  cover: {
    id: number;
    documentId: string;
    name: string;
    formats: {
      thumbnail: {
        url: string;
      };
    } | null;
    url: string;
  };
  model: GalleryModelItemProps;
  category: string;
  isPremiumAds: boolean;
  isUltimateAds: boolean;
}

export interface PricingItemProps {
  id: number;
  name: string;
  popular: boolean;
  monthlyPrice: number;
  yearlyPrice: number;
  discount: number;
  description: string;
  priceListName: string;
  pricingItem: [
    {
      id: number;
      brief: string;
      included: boolean;
    }
  ];
  monthlyPaymentLink: {
    id: number;
    name: string;
    link: string;
  };
  yearlyPaymentLink: {
    id: number;
    name: string;
    link: string;
  };
  videoLink: {
    id: number;
    name: string;
    link: string;
  };
}

export interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  active: boolean;
}

export interface StatsSectionProps {
  id: number;
  documentId: string;
  avatars: {
    id: number;
    documentId: string;
    formats: {
      small: {
        url: string;
      };
    };
    url: string;
  }[];
  counters: {
    id: number;
    end: number;
    duration: number;
    icon: string;
    name: string;
  }[];
}

export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface ImageFormats {
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  thumbnail: ImageFormat;
}

export interface CoverImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PageTitle {
  id: number;
  name: string;
  brief: string;
}

export interface UserProfilePageDataProps {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pageTitle: PageTitle;
  freePlanCoverImg: CoverImage;
  premiumPlanCoverImg: CoverImage;
  ultimatePlanCoverImg: CoverImage;
}

export interface SocialShareProps {
  title: string;
  text: string;
  currentUrl: string;
}

export interface ContactInfoItemProps {
  id: number;
  icon: string;
  name: string;
  details: string;
}

export interface SocialItemProps {
  id: number;
  documentId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt: string; // ISO date string
  sci: {
    id: number;
    name: string;
    icon: string;
    link: string;
  };
}

export interface FooterLinkItemProps {
  id: number;
  link: string;
  name: string;
}

export interface FooterLinkGroupProps {
  id: string;
  name: string;
  links: FooterLinkItemProps[];
}

export interface AboutPageFeatureItemProps {
  id: number;
  icon: string;
  name: string;
  brief: string;
}
