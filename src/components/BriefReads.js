import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import useQuotes from '../hooks/useQuotes';
import useSavedBooks from '../hooks/useSavedBooks';
import '../styles/BriefReads.css';

const moods = [
  { label: 'All Moods', tag: '' },
  { label: 'Inspiration ✨', tag: 'inspirational' },
  { label: 'Philosophy 🧠', tag: 'wisdom|philosophy' },
  { label: 'Romantic 💘', tag: 'love|poetry' },
  { label: 'Literary 📚', tag: 'literature|truth' },
  { label: 'Life 🌱', tag: 'life|motivational' },
];

const mindsByTag = {
  inspirational: ['Maya Angelou', 'Oprah Winfrey', 'Steve Jobs', 'Brené Brown'],
  'wisdom|philosophy': ['Socrates', 'Nietzsche', 'Marcus Aurelius', 'Lao Tzu'],
  'love|poetry': ['Rumi', 'Pablo Neruda', 'Kahlil Gibran', 'Emily Dickinson'],
  'literature|truth': ['George Orwell', 'Toni Morrison', 'Franz Kafka', 'Jean-Paul Sartre'],
  'life|motivational': ['Helen Keller', 'Seneca', 'Eckhart Tolle', 'Thich Nhat Hanh'],
};

const BriefReads = () => {
  const { currentUser } = useAuth();
  const { isBookSaved, toggleSaveBook } = useSavedBooks(currentUser);
  const {
    quotes,
    loading,
    error,
    hasMore,
    selectedTag,
    setSelectedTag,
    selectedAuthor,
    setSelectedAuthor,
  } = useQuotes();

  return (
    <div className="briefreads-container">
      <div className="mood-selector">
        <label htmlFor="mood-select">What’s your vibe?</label>
        <select
          id="mood-select"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {moods.map((mood) => (
            <option key={mood.tag} value={mood.tag}>
              {mood.label}
            </option>
          ))}
        </select>
      </div>

      {selectedTag && mindsByTag[selectedTag] && (
        <div className="minds-intro">
          <p>
            ✨ <em>From minds like:</em>{' '}
            {mindsByTag[selectedTag].map((author, index) => (
              <span
                key={author}
                className="mind-link"
                onClick={() => setSelectedAuthor(author)}
              >
                {author}
                {index < mindsByTag[selectedTag].length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
      )}

      {selectedAuthor && (
        <div className="author-filter-banner">
          <p>
            🎤 Showing quotes from <strong>{selectedAuthor}</strong>
            <button onClick={() => setSelectedAuthor('')}>Clear</button>
          </p>
        </div>
      )}

      {quotes.map((quote, index) => (
        <motion.div
          className="quote-card"
          key={quote.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <FaQuoteLeft className="quote-icon" />
          <p className="quote-text">“{quote.text}”</p>
          <span className="quote-author">— {quote.author}</span>
          <button
            className={`save-quote-btn ${isBookSaved(quote.id) ? 'saved' : ''}`}
            onClick={() =>
              toggleSaveBook({ ...quote, title: quote.text, author: quote.author })
            }
          >
            {isBookSaved(quote.id) ? '♥ Saved' : '♡ Save'}
          </button>
        </motion.div>
      ))}

      {loading && <p>Loading more quotes...</p>}
      {error && <p className="error">{error}</p>}
      {!hasMore && <p>No more quotes to load.</p>}
    </div>
  );
};

export default BriefReads;
