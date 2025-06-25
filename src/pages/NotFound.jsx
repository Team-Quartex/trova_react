"use client"
import { useNavigate } from "react-router-dom"
import { Plane, MapPin, Compass, Home, ArrowLeft, Map, Navigation } from "lucide-react"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle geometric shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-50 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-gray-50 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gray-50 rounded-full opacity-20"></div>

        {/* Accent shapes with the green color */}
        <div className="absolute top-40 left-20 w-4 h-4 bg-[#40916c] rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-32 w-6 h-6 bg-[#40916c] rounded-full opacity-15"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#40916c] rounded-full opacity-25"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Massive 404 Text */}
          <div className="mb-12">
            <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-gray-100 leading-none select-none">
              404
            </h1>
            <div className="relative -mt-16 md:-mt-24 lg:-mt-32">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Lost in Transit</h2>
              <div className="w-24 h-1 bg-[#40916c] mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Travel Icons Row */}
          <div className="flex justify-center items-center space-x-12 mb-12">
            <div className="group cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <Plane className="w-8 h-8 text-[#40916c] transform rotate-45" />
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="w-20 h-20 bg-[#40916c] rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <Map className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <Navigation className="w-8 h-8 text-[#40916c]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl md:text-[20px] text-gray-600 font-light leading-relaxed mb-8">
              The destination you're looking for seems to have wandered off the map.
              <br />
              <span className="text-gray-800 font-medium">Let's get you back on track.</span>
            </p>
          </div>

          {/* Modern Button Group */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/")}
              className="group relative px-12 py-5 bg-[#40916c] text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#40916c] to-[#52a085] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Home className="w-6 h-6" />
                Take Me Home
              </div>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group px-12 py-5 bg-white text-gray-700 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-[#40916c] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft className="w-6 h-6 group-hover:text-[#40916c] transition-colors" />
                Go Back
              </div>
            </button>
          </div>

          {/* Bottom Stats/Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-[#40916c]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Explore</h3>
              <p className="text-gray-600 text-sm">Discover new destinations</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Compass className="w-6 h-6 text-[#40916c]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Navigate</h3>
              <p className="text-gray-600 text-sm">Find your perfect trip</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Plane className="w-6 h-6 text-[#40916c]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Travel</h3>
              <p className="text-gray-600 text-sm">Start your adventure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 right-10 animate-float">
        <div className="w-3 h-3 bg-[#40916c] rounded-full opacity-30"></div>
      </div>
      <div className="absolute top-1/3 left-1/4 animate-float-delayed">
        <div className="w-2 h-2 bg-[#40916c] rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 animate-float-slow">
        <div className="w-4 h-4 bg-[#40916c] rounded-full opacity-20"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  )
}

export default NotFound
