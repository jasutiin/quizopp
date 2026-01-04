export default function Matchmaking() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Looking for a game
        </h1>
        <div className="relative">
          <img
            src="https://via.placeholder.com/200x200?text=Quiz+Logo"
            alt="Quiz Topic Logo"
            className="w-48 h-48 mx-auto rounded-full shadow-lg zoom-animation"
          />
        </div>
        <p className="text-lg text-gray-600 mt-8">
          Please wait while we find you an opponent...
        </p>
      </div>
    </div>
  )
}
