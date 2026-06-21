import blogPostsData from '../mocks/blogPosts.json';
import testimonialsData from '../mocks/testimonials.json';
import { mockDelay } from './mockUtils';

export const getBlogPosts = async ({ category } = {}) => {
  await mockDelay(300, 600);
  let posts = blogPostsData;
  if (category) posts = posts.filter((p) => p.category === category);
  return posts;
};

export const getBlogPostBySlug = async (slug) => {
  await mockDelay();
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) throw new Error(`Post "${slug}" not found.`);
  return post;
};

export const getTestimonials = async ({ role } = {}) => {
  await mockDelay(300, 600);
  let testimonials = testimonialsData;
  if (role) testimonials = testimonials.filter((t) => t.role === role);
  return testimonials;
};

export const submitContactForm = async (data) => {
  await mockDelay(800, 1200);
  // In a real implementation this would send to a backend
  return { success: true, message: 'Message received. We\'ll reply within 24 hours.' };
};
