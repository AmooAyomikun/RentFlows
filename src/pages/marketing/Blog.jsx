import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import { ContentCardSkeleton } from '../../components/ui/SkeletonLoader';
import Badge from '../../components/ui/Badge';
import { getBlogPosts } from '../../services/contentService';
import { formatDate } from '../../utils/formatDate';

const Blog = () => {
  const [search, setSearch] = useState('');

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => getBlogPosts(),
  });

  const filtered = posts.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <section className="bg-charcoal py-20" aria-label="Blog header">
        <div className="max-w-marketing mx-auto px-6 text-center">
          <motion.h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            The RentFlow Blog.
          </motion.h1>
          <motion.p className="text-white/60 text-lg mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
            Rental management tips, product updates and industry insights.
          </motion.p>
          <motion.div className="max-w-md mx-auto relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles…"
              aria-label="Search blog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-9 pr-4 text-sm bg-white rounded border border-transparent text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-warm" aria-label="Blog posts">
        <div className="max-w-marketing mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <ContentCardSkeleton key={i} />)}
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                  <Link to={`/blog/${featured.slug}`} className="block group">
                    <Card hoverable className="grid md:grid-cols-2 gap-0 overflow-hidden" padding={false}>
                      <div className="aspect-video md:aspect-auto bg-primary/10 flex items-center justify-center min-h-[200px]">
                        <BookOpen size={40} className="text-primary/40" aria-hidden="true" />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        {featured.category && <Badge status="active" label={featured.category} className="mb-3 self-start" />}
                        <h2 className="font-display text-charcoal text-2xl mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                        <p className="text-body text-sm mb-4 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <Clock size={12} aria-hidden="true" />
                          <span>{featured.readTime} min read</span>
                          <span aria-hidden="true">·</span>
                          <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-3 gap-5">
                {(search ? filtered : rest).map((post, i) => (
                  <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/blog/${post.slug}`} className="group block h-full">
                      <Card hoverable className="h-full flex flex-col">
                        <div className="h-36 bg-primary/8 rounded flex items-center justify-center mb-4 -mx-0 -mt-0">
                          <BookOpen size={28} className="text-primary/30" aria-hidden="true" />
                        </div>
                        {post.category && <Badge status="active" label={post.category} className="mb-2 self-start" />}
                        <h3 className="font-display font-semibold text-charcoal text-lg mb-2 group-hover:text-primary transition-colors flex-1">{post.title}</h3>
                        <p className="text-xs text-muted line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted border-t border-border pt-3">
                          <Clock size={11} aria-hidden="true" />
                          <span>{post.readTime} min</span>
                          <time dateTime={post.publishedAt} className="ml-auto">{formatDate(post.publishedAt)}</time>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-center text-muted py-12">No articles matching "{search}".</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
