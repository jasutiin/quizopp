export default function Losses({
  lossesPercentage,
}: {
  lossesPercentage: number;
}) {
  if (lossesPercentage != 0) {
    return (
      <div
        className="bg-red-900 transition-all duration-500 rounded-full relative h-12"
        style={{ width: `${lossesPercentage}%` }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600">Losses</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(lossesPercentage)}%
          </span>
        </div>
      </div>
    );
  }
}
