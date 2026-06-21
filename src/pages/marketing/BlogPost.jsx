import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { getBlogPostBySlug } from '../../services/contentService';
import { formatDate } from '../../utils/formatDate';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import Button from '../../components/ui/Button';

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPostBySlug(slug),
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <ContentCardSkeleton />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-4 rounded w-full" style={{ width: i % 3 === 2 ? '70%' : '100%' }} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-lg font-semibold text-charcoal mb-2">Post not found.</p>
        <Link to="/blog" className="text-sm text-primary hover:underline">← Back to blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <Link to="/blog" className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to blog
        </Link>
      </nav>

      <motion.header className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {post.category && (
          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-4 bg-primary/8 px-3 py-1 rounded-full">{post.category}</span>
        )}
        <h1 className="font-display text-charcoal text-4xl mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted">
          {post.author && <span>By <strong className="text-charcoal">{post.author}</strong></span>}
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readTime && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {post.readTime} min read</span>
            </>
          )}
        </div>
      </motion.header>

      {/* Cover image placeholder */}
      <motion.div
        className="w-full h-64 bg-primary/8 rounded-lg flex items-center justify-center mb-10"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        aria-hidden="true"
      >
        <BookOpen size={40} className="text-primary/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-charcoal prose-a:text-primary text-body leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt || 'Full article content coming soon.'}</p>` }}
      />

      {/* CTA */}
      <div className="mt-12 pt-8 border-t border-border text-center">
        <p className="font-display font-semibold text-charcoal text-xl mb-4">Ready to try RentFlow?</p>
        <Button size="md" onClick={() => window.location.href = '/signup'}>Get started free</Button>
      </div>
    </article>
  );
};

export default BlogPost;
