import FriendSquare from "../components/FriendSqure"

const App = () => {
  const sampleUsers = [
    {
      username: "Sarah Chen",
      userImage: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
      isOnline: true,
      mutualFriends: 12,
    },
    {
      username: "Alex Rodriguez",
      userImage: "https://images.pexels.com/photos/32582935/pexels-photo-32582935.jpeg",
      isOnline: false,
      mutualFriends: 5,
    },
    {
      username: "Maya Patel",
      userImage: "https://images.pexels.com/photos/32582935/pexels-photo-32582935.jpeg",
      isOnline: true,
      mutualFriends: 8,
    },
    {
      username: "Jordan Kim",
      userImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      isOnline: false,
      mutualFriends: 3,
    },
       {
      username: "Sarah Chen",
      userImage: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
      isOnline: true,
      mutualFriends: 12,
    },
    {
      username: "Alex Rodriguez",
      userImage: "https://images.pexels.com/photos/32582935/pexels-photo-32582935.jpeg",
      isOnline: false,
      mutualFriends: 5,
    },
    {
      username: "Maya Patel",
      userImage: "https://images.pexels.com/photos/30785043/pexels-photo-30785043.jpeg",
      isOnline: true,
      mutualFriends: 8,
    },
    {
      username: "Jordan Kim",
      userImage: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      isOnline: false,
      mutualFriends: 3,
    },
  ]

  return (
    <div className="min-h-screen bg-[#ffffff] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Friends</h1>
          <p className="text-gray-600 text-lg">Discover and connect with amazing people</p>
        </div>

        {/* Fixed Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 place-items-center auto-rows-fr">
          {sampleUsers.map((user, index) => (
            <div key={index} className="w-full max-w-sm">
              <FriendSquare
                username={user.username}
                userImage={user.userImage}
                isOnline={user.isOnline}
                mutualFriends={user.mutualFriends}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
