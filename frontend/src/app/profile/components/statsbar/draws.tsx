export default function Draws({
  drawsPercentage,
}: {
  drawsPercentage: number;
}) {
  if (drawsPercentage != 0) {
    return (
      <div
        className="bg-yellow-500 transition-all duration-500 rounded-full relative h-12"
        style={{ width: `${drawsPercentage}%` }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600">Draws</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(drawsPercentage)}%
          </span>
        </div>
      </div>
    );
  }
}
