import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bike,
  Clock3,
  Crosshair,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';

const categories = [
  { label: 'Όλα', emoji: '🍽️' },
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Burger', emoji: '🍔' },
  { label: 'Σουβλάκι', emoji: '🥙' },
  { label: 'Sushi', emoji: '🍣' },
  { label: 'Καφές', emoji: '☕' },
  { label: 'Γλυκό', emoji: '🍰' },
];

const restaurants = [
  {
    name: 'Γιαγιά Κική', type: 'Ελληνικό · Μαγειρευτά', category: 'Σουβλάκι',
    rating: '4.8', time: '20–30', price: '1,50€', offer: '−20% σε όλο το μενού',
    image: 'photo-1547592180-85f173990554', tag: 'Σπιτικό φαγητό',
  },
  {
    name: 'Forno Rosso', type: 'Ιταλικό · Pizza', category: 'Pizza',
    rating: '4.7', time: '25–35', price: 'Δωρεάν', offer: '1+1 σε επιλεγμένες πίτσες',
    image: 'photo-1571407970349-bc81e7e96d47', tag: 'Νέα άφιξη',
  },
  {
    name: 'Bun & Done', type: 'Burger · Αμερικάνικο', category: 'Burger',
    rating: '4.9', time: '20–30', price: '1,00€', offer: 'Combo από 9,90€',
    image: 'photo-1568901346375-23c9450c58cd', tag: 'Bestseller',
  },
  {
    name: 'Nori House', type: 'Ιαπωνικό · Sushi', category: 'Sushi',
    rating: '4.6', time: '35–45', price: '2,00€', offer: '−15% σε παραγγελίες άνω των 20€',
    image: 'photo-1579871494447-9811cf80d66c', tag: 'Φρέσκο σήμερα',
  },
  {
    name: 'Daily Grind', type: 'Καφές · Brunch', category: 'Καφές',
    rating: '4.8', time: '15–25', price: 'Δωρεάν', offer: 'Καφές + snack από 5,50€',
    image: 'photo-1495474472287-4d71bcdd2085', tag: 'Πρωινό αγαπημένο',
  },
  {
    name: 'Ζάχαρη & Κανέλα', type: 'Ζαχαροπλαστείο · Γλυκό', category: 'Γλυκό',
    rating: '4.9', time: '20–30', price: '1,00€', offer: '−10% στα γλυκά ημέρας',
    image: 'photo-1488477181946-6428a0291777', tag: 'Κάτι γλυκό;',
  },
];

const imageUrl = (id, width = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [activeCategory, setActiveCategory] = useState('Όλα');
  const [search, setSearch] = useState('');
  const [address, setAddress] = useState('Κουκάκι, Αθήνα');
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleRestaurants = useMemo(() => restaurants.filter((restaurant) => {
    const matchesCategory = activeCategory === 'Όλα' || restaurant.category === activeCategory;
    const query = search.trim().toLocaleLowerCase('el');
    const matchesSearch = !query || `${restaurant.name} ${restaurant.type} ${restaurant.category}`.toLocaleLowerCase('el').includes(query);
    return matchesCategory && matchesSearch;
  }), [activeCategory, search]);

  const toggleFavorite = (name) => {
    setFavorites((current) => current.includes(name)
      ? current.filter((favorite) => favorite !== name)
      : [...current, name]);
  };

  return (
    <div className="app-shell">
      <div className="announcement"><span className="announcement-dot" /> Η γειτονιά σου, τώρα πιο νόστιμη <span className="announcement-separator">·</span> Δες τι παίζει κοντά σου <ArrowRight size={14} /></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Στο Πιάτο, αρχική">
          <span className="brand-mark"><span /></span>
          <span>στο<span className="brand-word-accent">πιάτο</span></span>
        </a>
        <button className="location-button" type="button" onClick={() => document.getElementById('address-input')?.focus()}>
          <span className="location-icon"><MapPin size={17} /></span>
          <span className="location-copy"><small>Παράδοση σε</small><strong>{address}</strong></span>
          <span className="location-chevron">⌄</span>
        </button>
        <nav className="header-nav" aria-label="Κύρια πλοήγηση">
          <a className="nav-link active" href="#restaurants">Εστιατόρια</a>
          <a className="nav-link" href="#how-it-works">Πώς λειτουργεί</a>
        </nav>
        <div className="header-actions">
          <button className="login-button" type="button">Σύνδεση</button>
          <button className="cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Καλάθι, ${cartCount} προϊόντα`}>
            <ShoppingBag size={18} /><span>Καλάθι</span><span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> ΚΑΛΟ ΦΑΓΗΤΟ, ΚΑΛΗ ΔΙΑΘΕΣΗ</div>
            <h1>Το αγαπημένο σου,<br /><span>στην πόρτα σου.</span></h1>
            <p>Οι γεύσεις της γειτονιάς σου σε περιμένουν. Διάλεξε, παράγγειλε, απόλαυσε.</p>
            <form className="search-form" onSubmit={(event) => { event.preventDefault(); document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <label className="search-input-wrap" htmlFor="address-input"><MapPin size={18} /><input id="address-input" value={address} onChange={(event) => setAddress(event.target.value)} aria-label="Διεύθυνση παράδοσης" /><button className="locate-button" type="button" aria-label="Εντοπισμός τοποθεσίας"><Crosshair size={16} /></button></label>
              <button className="search-submit" type="submit"><Search size={17} /><span>Βρες φαγητό</span></button>
            </form>
            <div className="hero-trust"><span><Bike size={16} /> Παράδοση σε 25′</span><i /><span>Χωρίς ελάχιστη παραγγελία</span></div>
          </div>
          <div className="hero-visual" aria-label="Φρεσκομαγειρεμένο γεύμα σε τραπέζι">
            <img src={imageUrl('photo-1547592180-85f173990554', 1200)} alt="Ποικιλία από φρέσκα, πολύχρωμα πιάτα" />
            <div className="hero-image-wash" />
            <div className="floating-note"><span className="floating-note-icon">✳</span><span><strong>Φρέσκο. Τοπικό.</strong><small>Από μαγαζιά που αγαπάς.</small></span></div>
            <div className="hero-stamp"><span>GOOD</span><strong>FOOD</strong><span>GOOD MOOD</span></div>
          </div>
          <div className="hero-bottom-label">ΑΘΗΝΑ · 37°58′ Β 23°43′ Α</div>
        </section>

        <section className="category-section" aria-label="Κατηγορίες φαγητού">
          <div className="section-topline"><div><span className="section-kicker">ΤΙ ΤΡΑΒΑΕΙ Η ΟΡΕΞΗ ΣΟΥ;</span><h2>Κάτι καλό, <em>κάπου εδώ.</em></h2></div><button className="text-action" type="button" onClick={() => setActiveCategory('Όλα')}>Όλες οι κατηγορίες <ArrowRight size={16} /></button></div>
          <div className="category-list">
            {categories.map((category) => <button key={category.label} type="button" className={`category-item ${activeCategory === category.label ? 'selected' : ''}`} onClick={() => setActiveCategory(category.label)}><span className="category-emoji">{category.emoji}</span><span>{category.label}</span></button>)}
          </div>
        </section>

        <section className="restaurants-section" id="restaurants">
          <div className="restaurant-heading"><div><span className="section-kicker">ΔΙΑΛΕΓΜΕΝΑ ΓΙΑ ΣΕΝΑ</span><h2>Νόστιμες <em>αφίξεις</em></h2><p>Τα αγαπημένα της γειτονιάς, ένα κλικ μακριά.</p></div><div className="restaurant-tools"><label className="restaurant-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ψάξε εστιατόριο..." aria-label="Αναζήτηση εστιατορίου" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Καθαρισμός αναζήτησης"><X size={15} /></button>}</label><button className="filter-button" type="button" aria-label="Φίλτρα"><SlidersHorizontal size={17} /></button></div></div>
          <div className="restaurant-grid">
            {visibleRestaurants.map((restaurant) => <article className="restaurant-card" key={restaurant.name}>
              <div className="restaurant-image-wrap"><img src={imageUrl(restaurant.image)} alt={`Πιάτο από το ${restaurant.name}`} loading="lazy" /><span className="restaurant-tag">{restaurant.tag}</span><button className={`favorite-button ${favorites.includes(restaurant.name) ? 'is-favorite' : ''}`} type="button" onClick={() => toggleFavorite(restaurant.name)} aria-label={favorites.includes(restaurant.name) ? 'Αφαίρεση από αγαπημένα' : 'Προσθήκη στα αγαπημένα'}><Heart size={17} fill={favorites.includes(restaurant.name) ? 'currentColor' : 'none'} /></button><span className="offer-ribbon">{restaurant.offer}</span></div>
              <div className="restaurant-info"><div className="restaurant-title-row"><div><h3>{restaurant.name}</h3><span className="restaurant-type">{restaurant.type}</span></div><span className="rating"><Star size={14} fill="currentColor" /> {restaurant.rating}</span></div><div className="restaurant-meta"><span><Clock3 size={14} /> {restaurant.time}′</span><i /><span>{restaurant.price} μεταφορικά</span><button type="button" className="quick-add" onClick={() => setCartCount((count) => count + 1)} aria-label={`Προσθήκη από ${restaurant.name}`}><Plus size={16} /></button></div></div>
            </article>)}
          </div>
          {visibleRestaurants.length === 0 && <div className="empty-results"><span>🔎</span><h3>Δεν βρήκαμε κάτι εδώ.</h3><p>Δοκίμασε άλλη αναζήτηση ή κατηγορία.</p><button type="button" onClick={() => { setSearch(''); setActiveCategory('Όλα'); }}>Καθαρισμός φίλτρων</button></div>}
          <button className="load-more" type="button">Δες όλα τα εστιατόρια <ArrowRight size={16} /></button>
        </section>

        <section className="local-banner" id="how-it-works"><div className="banner-mark">✳</div><div><span className="section-kicker">Η ΓΕΙΤΟΝΙΑ ΣΟΥ ΕΧΕΙ ΓΕΥΣΗ</span><h2>Μικρά μαγαζιά.<br /><em>Μεγάλη αγάπη.</em></h2><p>Κάθε παραγγελία στηρίζει τους ανθρώπους που κάνουν τη γειτονιά ξεχωριστή.</p></div><a href="#restaurants" className="banner-link">Ανακάλυψε τα κοντά σου <ArrowRight size={17} /></a><div className="banner-scribble">Από εδώ.<br />Με αγάπη.</div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /></span><span>στο<span className="brand-word-accent">πιάτο</span></span></a><span>Τοπικές γεύσεις, κάθε μέρα.</span><span className="footer-copy">© 2025 Στο Πιάτο</span></footer>

      {cartOpen && <div className="modal-backdrop" onClick={() => setCartOpen(false)}><section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(event) => event.stopPropagation()}><div className="cart-panel-head"><div><span className="section-kicker">ΚΑΤΙ ΝΟΣΤΙΜΟ ΞΕΚΙΝΑ</span><h2 id="cart-title">Το καλάθι σου</h2></div><button type="button" className="close-cart" onClick={() => setCartOpen(false)} aria-label="Κλείσιμο"><X size={20} /></button></div>{cartCount > 0 ? <><div className="cart-item"><span className="cart-item-icon">🥡</span><div><strong>Επιλογές γειτονιάς</strong><small>{cartCount} προσθήκες από εστιατόρια</small></div><div className="quantity-control"><button type="button" onClick={() => setCartCount((count) => Math.max(0, count - 1))} aria-label="Αφαίρεση"><Minus size={14} /></button><span>{cartCount}</span><button type="button" onClick={() => setCartCount((count) => count + 1)} aria-label="Προσθήκη"><Plus size={14} /></button></div></div><button className="checkout-button" type="button">Συνέχεια στην παραγγελία <ArrowRight size={17} /></button></> : <div className="empty-cart"><span>🛍️</span><h3>Το καλάθι είναι άδειο</h3><p>Βρες κάτι νόστιμο στη γειτονιά σου.</p><button type="button" onClick={() => setCartOpen(false)}>Βρες φαγητό</button></div>}</section></div>}
    </div>
  );
}

export default App;