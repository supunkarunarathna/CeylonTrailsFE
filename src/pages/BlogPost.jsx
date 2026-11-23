import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi } from '../api/endpoints';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    blogApi
      .getBySlug(slug)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error || !post) {
    return (
      <div className="empty-state">
        <p>{error || 'Post not found.'}</p>
        <Link to="/blog" className="btn btn-secondary">Back to blog</Link>
      </div>
    );
  }

  return (
    <div>
      {post.image && (
        <div className="card-media" style={{ aspectRatio: '21/8', borderRadius: 0 }}>
          <img src={post.image} alt={post.title} />
        </div>
      )}
      <div className="container section" style={{ maxWidth: 760 }}>
        <span className="badge">{new Date(post.publishedAt).toLocaleDateString()} · {post.author}</span>
        <h1>{post.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.8 }}>{post.content}</p>
        <Link to="/blog" className="btn btn-secondary">Back to all posts</Link>
      </div>
    </div>
  );
}
