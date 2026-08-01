import { Prisma, PublishStatus } from '@prisma/client';
import { prisma } from '../libs/prisma';

const DEFAULT_SETTINGS: Record<string, unknown> = {
  'site.siteName': '',
  'site.tagline': '',
  'contact.email': '',
  'contact.phone': '',
  'contact.address': '',
  'social.facebook': '',
  'social.instagram': '',
  'social.youtube': '',
  'social.linkedin': '',
  'whatsapp.number': '',
  'map.embedUrl': '',
  'bank.accountName': '',
  'bank.accountNumber': '',
  'bank.ifsc': '',
  'bank.branch': '',
  'bank.upi': '',
  'payment.razorpayKeyId': '',
  'payment.razorpayKeySecret': '',
  'payment.name': '',
  'payment.description': '',
  'payment.currency': 'INR',
  'payment.receiptPrefix': 'RC',
  'footer.copyright': '',
  'footer.tagline': '',
};

export async function createOrganizationDefaults(
  organizationId: string,
  siteName: string,
): Promise<void> {
  const settings: Record<string, unknown> = {
    ...DEFAULT_SETTINGS,
    'site.siteName': siteName,
    'payment.name': siteName,
    'footer.copyright': `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`,
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.organizationSetting.upsert({
      where: { organizationId_key: { organizationId, key } },
      update: { value: value as Prisma.InputJsonValue },
      create: { organizationId, key, value: value as Prisma.InputJsonValue },
    });
  }

  const homePage = await prisma.page.create({
    data: {
      organizationId,
      slug: 'home',
      title: 'Home',
      metaTitle: 'Home',
      status: PublishStatus.PUBLISHED,
      template: 'home',
      sortOrder: 0,
      isHome: true,
    },
  });

  const sectionSpecs: Record<string, { type: string; name: string; sortOrder: number }[]> = {
    home: [
      { type: 'hero', name: 'Hero', sortOrder: 1 },
      { type: 'about', name: 'About Intro', sortOrder: 2 },
      { type: 'stats', name: 'Impact Stats', sortOrder: 3 },
      { type: 'projects-grid', name: 'Our Projects', sortOrder: 4 },
      { type: 'campaigns', name: 'Campaigns', sortOrder: 5 },
      { type: 'testimonials', name: 'Testimonials', sortOrder: 6 },
      { type: 'partners', name: 'Partners', sortOrder: 7 },
      { type: 'cta', name: 'Join Us CTA', sortOrder: 8 },
      { type: 'newsletter', name: 'Newsletter', sortOrder: 9 },
    ],
  };

  const defaultContent = (type: string): Record<string, unknown> => {
    switch (type) {
      case 'hero':
        return {
          badge: 'Welcome',
          heading: 'Making a Difference, Together',
          subheading: 'Edit this heading and description from the admin panel.',
          primaryCta: { label: 'Donate Now', url: '/donate' },
          secondaryCta: { label: 'Our Work', url: '/projects' },
        };
      case 'about':
        return {
          tag: 'Who We Are',
          heading: 'About our foundation',
          paragraphs: ['Describe your mission here. Edit from the admin panel.'],
        };
      case 'stats':
        return {
          heading: 'Our Impact',
          items: [
            { value: '0+', label: 'Lives Impacted' },
            { value: '0', label: 'Sectors of Work' },
          ],
        };
      case 'projects-grid':
        return { heading: 'Our Projects', showAll: true };
      case 'campaigns':
        return { heading: 'Support a Cause', showAll: true };
      case 'testimonials':
        return {
          heading: 'What People Say',
          items: [{ quote: 'Share a story here.', name: 'Supporter', role: 'Community' }],
        };
      case 'partners':
        return { heading: 'Our Partners', showAll: true };
      case 'cta':
        return {
          heading: 'Want to make a difference?',
          paragraph: 'Volunteer or donate today.',
          buttonLabel: 'Get Involved',
          buttonUrl: '/contact',
        };
      case 'newsletter':
        return { heading: 'Stay Updated', placeholder: 'Your email address', buttonLabel: 'Subscribe' };
      default:
        return {};
    }
  };

  const createSections = async (pageId: string, specs: { type: string; name: string; sortOrder: number }[]) => {
    for (const spec of specs) {
      await prisma.pageSection.create({
        data: {
          pageId,
          organizationId,
          type: spec.type,
          name: spec.name,
          sortOrder: spec.sortOrder,
          isActive: true,
          content: defaultContent(spec.type) as Prisma.InputJsonValue,
        },
      });
    }
  };

  await createSections(homePage.id, sectionSpecs.home);

  const innerPages = [
    { slug: 'about', title: 'About Us', specs: [
      { type: 'page-hero', name: 'Page Hero', sortOrder: 1 },
      { type: 'story', name: 'Our Story', sortOrder: 2 },
      { type: 'mission-vision', name: 'Mission & Vision', sortOrder: 3 },
      { type: 'team', name: 'Our Team', sortOrder: 4 },
    ] },
    { slug: 'projects', title: 'Projects', specs: [
      { type: 'page-hero', name: 'Page Hero', sortOrder: 1 },
      { type: 'projects-grid', name: 'Projects Grid', sortOrder: 2 },
    ] },
    { slug: 'gallery', title: 'Gallery', specs: [
      { type: 'page-hero', name: 'Page Hero', sortOrder: 1 },
      { type: 'gallery', name: 'Gallery', sortOrder: 2 },
    ] },
    { slug: 'contact', title: 'Contact', specs: [
      { type: 'page-hero', name: 'Page Hero', sortOrder: 1 },
      { type: 'contact-info', name: 'Contact Info', sortOrder: 2 },
      { type: 'form', name: 'Contact Form', sortOrder: 3 },
      { type: 'map', name: 'Map', sortOrder: 4 },
    ] },
    { slug: 'donate', title: 'Donate', specs: [
      { type: 'page-hero', name: 'Page Hero', sortOrder: 1 },
      { type: 'donate', name: 'Donate', sortOrder: 2 },
    ] },
  ];

  for (const [index, page] of innerPages.entries()) {
    const created = await prisma.page.create({
      data: {
        organizationId,
        slug: page.slug,
        title: page.title,
        metaTitle: page.title,
        status: PublishStatus.PUBLISHED,
        template: 'inner',
        sortOrder: index + 1,
      },
    });
    await createSections(created.id, page.specs);
  }

  const mainMenu = await prisma.menu.create({
    data: { organizationId, name: 'Main Navigation', location: 'main-nav' },
  });
  const footerMenu = await prisma.menu.create({
    data: { organizationId, name: 'Footer Navigation', location: 'footer' },
  });

  const mainItems = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Projects', url: '/projects' },
    { label: 'Gallery', url: '/gallery' },
    { label: 'Contact', url: '/contact' },
  ];
  for (const [i, item] of mainItems.entries()) {
    await prisma.menuItem.create({
      data: { menuId: mainMenu.id, organizationId, label: item.label, url: item.url, sortOrder: i + 1, isActive: true },
    });
  }
  for (const [i, item] of mainItems.slice(1).entries()) {
    await prisma.menuItem.create({
      data: { menuId: footerMenu.id, organizationId, label: item.label, url: item.url, sortOrder: i + 1, isActive: true },
    });
  }
}
