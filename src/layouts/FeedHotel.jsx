import React from 'react';
import SearchBar from '../components/SearchBar';
import Section from '../components/Section';

const FeedHotel = () => {
  const suggestionsHotels = [
    {
      name: 'Sunset Paradise',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      availability: '5 rooms left',
      rating: 3.5
    },
    {
      name: 'City Lights Inn',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      availability: 'Available',
      rating: 4.5
    },
    {
      name: 'Mountain Retreat',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      availability: 'Sold Out',
      rating: 4.5
    },
  ];

  const topRatedHotels = [
    {
      name: 'Ocean Breeze Resort',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      availability: '2 rooms left',
      rating: 2.5
    },
    {
      name: 'Royal Stay',
      image: 'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg',
      availability: 'Available',
      rating: 1.5
    },
    {
      name: 'Skyline Suites',
      image: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg',
      availability: 'Available',
      rating: 4.5
    },
  ];

  const newUpdateHotels = [
    {
      name: 'Lakeside View',
      image: 'https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg',
      availability: '3 rooms left',
      rating: 4.5
    },
    {
      name: 'Palm Garden Hotel',
      image: 'https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg',
      availability: 'Available',
      rating: 4.5
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-8 space-y-6 px-4 relative">
      <SearchBar />
      <Section title="Suggestions" hotels={suggestionsHotels} />
      <Section title="Top Rated" hotels={topRatedHotels} />
      <Section title="New Update" hotels={newUpdateHotels} />

      {/* Sticky white bar with button */}
      <div className="fixed bottom-0 left-0 lg:left-[20vw] w-full lg:w-[60vw] bg-white border-t border-gray-200 p-3 flex justify-end shadow-lg">
        <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          onClick={() => alert('List your hotel feature coming soon!')}
        >
          List Your Hotel
        </button>
      </div>
    </div>
  );
};

export default FeedHotel;
