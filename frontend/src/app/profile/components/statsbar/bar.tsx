export default function Bar({
  percentage,
  colour,
  title,
}: {
  percentage: number;
  colour: string;
  title: string;
}) {
  if (percentage != 0) {
    return (
      <div
        className={`${colour} transition-all duration-500 rounded-full relative h-12`}
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  }
}
