import React from "react";
import SearchBar from "../components/SearchBar";
import MarketplaceItem from "../components/MarketplaceItem";

const Section = ({ title, items = [] }) => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <MarketplaceItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const MarketplaceLayout = () => {
  const popularItems = [
    {
      name: "Vintage Lamp",
      image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
      description: "A classic lamp for cozy corners in your home or office.",
      price: 49.99,
      rating: 4.5,
    },
    {
      name: "Stylish Chair",
      image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
      description: "Ergonomic design and elegance in one.",
      price: 89.99,
      rating: 4.0,
    },
    {
      name: "Minimalist Desk",
      image: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
      description: "Perfect fit for productivity and style.",
      price: 109.99,
      rating: 4.7,
    },
  ];

  const topRatedItems = [
    {
      name: "Artistic Wall Clock",
      image: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
      description: "A modern wall clock for modern homes.",
      price: 59.0,
      rating: 5.0,
    },
    {
      name: "Wireless Headphones",
      image: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg",
      description: "Crystal clear sound with active noise cancellation.",
      price: 129.99,
      rating: 4.8,
    },
    {
      name: "Smart LED Light Strip",
      image: "https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg",
      description: "Change the mood of your room with one click.",
      price: 29.99,
      rating: 4.6,
    },
  ];

  const recentlyAddedItems = [
    {
      name: "Cozy Blanket",
      image: "https://images.pexels.com/photos/2179216/pexels-photo-2179216.jpeg",
      description: "Soft, warm, and perfect for chilly evenings.",
      price: 35.5,
      rating: 4.3,
    },
    {
      name: "Coffee Table",
      image: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
      description: "Modern design with storage space.",
      price: 99.99,
      rating: 4.2,
    },
    {
      name: "Hanging Planter",
      image: "https://images.pexels.com/photos/450035/pexels-photo-450035.jpeg",
      description: "Perfect for indoor gardening lovers.",
      price: 18.75,
      rating: 4.0,
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 space-y-6 px-4 relative">
      <SearchBar />
      <Section title="Popular Items" items={popularItems} />
      <Section title="Top Rated" items={topRatedItems} />
      <Section title="Recently Added" items={recentlyAddedItems} />

      
      
    </div>
  );
};

export default MarketplaceLayout;
