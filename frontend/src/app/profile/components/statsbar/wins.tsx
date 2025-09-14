export default function Wins({ winsPercentage }: { winsPercentage: number }) {
  if (winsPercentage != 0) {
    return (
      <div
        className="bg-green-800 transition-all duration-500 rounded-full relative h-12"
        style={{ width: `${winsPercentage}%` }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600">Wins</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(winsPercentage)}%
          </span>
        </div>
      </div>
    );
  }
}
