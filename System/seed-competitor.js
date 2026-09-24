const { Client } = require('pg');

const client = new Client({
  host: 'db.tygohaoqcldllcjxhejy.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Mohasin@8485',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

const competitorProducts = [
  {
    name: 'Multiplay Triple Slide',
    slug: 'multiplay-triple-slide',
    category: 'Slides',
    description: 'A classic multi-activity play system featuring three parallel bright color slides. Specifically designed for school playgrounds and child care centers. Manufactured from heavy-duty galvanized pipe and LLDPE plastic parts.',
    short_description: 'Three parallel colorful slides for multiple kids to race down together.',
    specifications: {
      'Age Group': '3-12 Years',
      'Capacity': '3 Children',
      'Space Required': '15ft x 10ft',
      'Material': 'Heavy-duty LLDPE & Galvanized Iron',
      'Price': '₹ 50,000 / Piece'
    },
    images: ['/triple-lane-slide.jpg'],
    is_featured: true
  },
  {
    name: 'Yellow Duck See Saw',
    slug: 'yellow-duck-seesaw',
    category: 'See Saw',
    description: 'Fun duck-themed double-seat seesaw with central ball bearing pivot and spring bumpers. Crafted from weather-proof powder-coated steel tubes and high quality LLDPE seats.',
    short_description: 'Fun duck-themed double-seat seesaw with rubber bumper springs.',
    specifications: {
      'Age Group': '2-8 Years',
      'Capacity': '2 Children',
      'Space Required': '10ft x 4ft',
      'Material': 'Powder Coated Steel & LLDPE Seats',
      'Price': '₹ 18,000 / Piece'
    },
    images: ['/duck-seesaw.png'],
    is_featured: true
  },
  {
    name: 'Double Wave Playground Slide',
    slug: 'double-wave-playground-slide',
    category: 'Slides',
    description: 'Double wave slide system featuring custom guard arches, protective safety panels, and sturdy steps. Made from UV-stabilized rotomolded LLDPE parts.',
    short_description: 'Double wave slide system featuring a protective roof canopy and stairs.',
    specifications: {
      'Age Group': '3-12 Years',
      'Capacity': '2 Children',
      'Space Required': '18ft x 12ft',
      'Material': 'UV-Stabilized LLDPE & Steel Frame',
      'Price': '₹ 95,000 / Piece'
    },
    images: ['/double-slide-arch.jpg'],
    is_featured: true
  },
  {
    name: 'Single Deck Straight Slide',
    slug: 'single-deck-straight-slide',
    category: 'Slides',
    description: 'Classic straight single slide with support frame, guard rails, and safe ladders. Highly durable and perfect for compact residential play areas.',
    short_description: 'Classic straight single slide with sturdy ladder and guardrails.',
    specifications: {
      'Age Group': '3-10 Years',
      'Capacity': '1 Child',
      'Space Required': '12ft x 5ft',
      'Material': 'FRP Slide & Painted Iron Support',
      'Price': '₹ 32,000 / Piece'
    },
    images: ['/single-slide-blue-frame.jpg'],
    is_featured: true
  },
  {
    name: 'Classic Wave Slide',
    slug: 'classic-wave-slide',
    category: 'Slides',
    description: 'Ergonomic orange wave slide mounted on robust powder-coated structural steel frames. Complete with handrails for complete safety.',
    short_description: 'Ergonomic wave slide with weather-resistant support stairs.',
    specifications: {
      'Age Group': '3-10 Years',
      'Capacity': '1 Child',
      'Space Required': '12ft x 5ft',
      'Material': 'LLDPE & Galvanized Iron Scaffold',
      'Price': '₹ 25,000 / Piece'
    },
    images: ['/orange-wave-slide.jpg'],
    is_featured: true
  }
];

const competitorGallery = [
  { title: 'NPS-MPS-70 Installation at Ryan International School', image_url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800', category: 'Multiplay' },
  { title: 'Chest Press Equipment at Cyber Hub Green Park', image_url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=800', category: 'Gym Equipment' },
  { title: 'Orbit Climber installation at Hiranandani Estate', image_url: 'https://images.unsplash.com/photo-1584988771415-3b965f979148?auto=format&fit=crop&q=80&w=800', category: 'Climbers' },
  { title: 'Seesaw Balance Station at DLF City Phase 3', image_url: 'https://images.unsplash.com/photo-1596464716151-a968eb1a92e1?auto=format&fit=crop&q=80&w=800', category: 'See Saw' },
  { title: 'Double Wave Slide setup at Greenfield Play Area', image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', category: 'Slides' },
  { title: 'Swingset Installation at Greenwood High Campus', image_url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', category: 'Swings' },
  { title: 'Premium FRP Benches set up at IT Tech Park Garden', image_url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800', category: 'Benches & Bins' }
];

async function run() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL successfully!');
    
    // Clear old products
    console.log('Clearing old products database records...');
    await client.query('TRUNCATE TABLE products CASCADE;');
    console.log('Products cleared!');
    
    // Insert competitor products
    console.log('Seeding Nidhi Play System competitor products...');
    for (const p of competitorProducts) {
      await client.query(
        `INSERT INTO products (name, slug, category, description, short_description, specifications, images, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [p.name, p.slug, p.category, p.description, p.short_description, JSON.stringify(p.specifications), p.images, p.is_featured]
      );
    }
    console.log(`Seeded ${competitorProducts.length} products successfully!`);

    // Clear old gallery
    console.log('Clearing old gallery records...');
    await client.query('TRUNCATE TABLE gallery CASCADE;');
    console.log('Gallery cleared!');

    // Insert competitor gallery
    console.log('Seeding competitor gallery installations...');
    for (const g of competitorGallery) {
      await client.query(
        `INSERT INTO gallery (title, image_url, category) VALUES ($1, $2, $3)`,
        [g.title, g.image_url, g.category]
      );
    }
    console.log(`Seeded ${competitorGallery.length} gallery images successfully!`);

    console.log('Database competitor seed completed successfully!');
  } catch (err) {
    console.error('Error during competitor seeding:', err);
  } finally {
    await client.end();
  }
}

run();
