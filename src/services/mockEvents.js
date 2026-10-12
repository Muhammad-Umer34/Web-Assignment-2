// Sample events used as fallback when Ticketmaster API key is not yet set in .env
export const SAMPLE_EVENTS = [
  {
    id: 'mock-1',
    name: 'Coldplay: Music of the Spheres World Tour',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-20',
        localTime: '19:30:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Pop Rock' },
        subGenre: { name: 'Alternative' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'Wembley Stadium',
          city: { name: 'London' },
          country: { name: 'United Kingdom' },
          address: { line1: 'Wembley, HA9 0WS' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 75.0,
        max: 280.0,
      },
    ],
    info: 'Experience an unforgettable night with Coldplay performing hits from Music of the Spheres alongside classic anthems.',
    pleaseNote: 'Gates open at 17:30. Strobe lighting and pyrotechnics will be used during the performance.',
  },
  {
    id: 'mock-2',
    name: 'NBA Finals 2026: Game 4',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-05',
        localTime: '20:00:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Sports' },
        genre: { name: 'Basketball' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'Madison Square Garden',
          city: { name: 'New York' },
          country: { name: 'United States' },
          address: { line1: '4 Pennsylvania Plaza' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 120.0,
        max: 850.0,
      },
    ],
    info: 'The ultimate championship clash. Witness basketball history as top teams face off for the title.',
    pleaseNote: 'Bag policy is strictly enforced. Mobile tickets only.',
  },
  {
    id: 'mock-3',
    name: 'The Lion King - Broadway Musical',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-28',
        localTime: '14:00:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Arts & Theatre' },
        genre: { name: 'Theatre' },
        subGenre: { name: 'Musical' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'Minskoff Theatre',
          city: { name: 'New York' },
          country: { name: 'United States' },
          address: { line1: '200 W 45th St' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 89.0,
        max: 250.0,
      },
    ],
    info: 'More than 100 million people around the world have experienced the awe-inspiring visual artistry, unforgettable music, and dazzling choreography of The Lion King.',
    pleaseNote: 'Recommended for ages 6 and older.',
  },
  {
    id: 'mock-4',
    name: 'Stand-up Comedy Night featuring Kevin Hart',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-11-15',
        localTime: '21:00:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Comedy' },
        genre: { name: 'Standup' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'The Comedy Store',
          city: { name: 'Los Angeles' },
          country: { name: 'United States' },
          address: { line1: '8433 Sunset Blvd' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 45.0,
        max: 150.0,
      },
    ],
    info: 'A night of non-stop laughter with hilarious stand-up comedy routines.',
    pleaseNote: '21+ only event. Valid ID required at door.',
  },
  {
    id: 'mock-5',
    name: 'Global AI & Tech Summit 2026',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-12',
        localTime: '09:00:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Tech' },
        genre: { name: 'Conference' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'Moscone Center',
          city: { name: 'San Francisco' },
          country: { name: 'United States' },
          address: { line1: '747 Howard St' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 199.0,
        max: 499.0,
      },
    ],
    info: 'Join leading engineers, founders, and researchers exploring cutting-edge advancements in Artificial Intelligence and Web Technologies.',
    pleaseNote: 'Includes conference pass, lunch, and networking reception access.',
  },
  {
    id: 'mock-6',
    name: 'Taylor Swift: The Eras Tour Reunion',
    type: 'event',
    url: 'https://www.ticketmaster.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
        ratio: '16_9',
        width: 1024,
        height: 576,
      },
    ],
    dates: {
      start: {
        localDate: '2026-12-24',
        localTime: '19:00:00',
      },
      status: {
        code: 'onsale',
      },
    },
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Pop' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'SoFi Stadium',
          city: { name: 'Inglewood' },
          country: { name: 'United States' },
          address: { line1: '1001 Stadium Dr' },
        },
      ],
    },
    priceRanges: [
      {
        type: 'standard',
        currency: 'USD',
        min: 95.0,
        max: 450.0,
      },
    ],
    info: 'A special seasonal concert celebrating songs across all iconic eras.',
    pleaseNote: 'Arrive early to accommodate bag check and security lines.',
  },
]
