import Bar from './bar';

export default function GameStatsBar({
  wins,
  draws,
  losses,
}: {
  wins: number;
  draws: number;
  losses: number;
}) {
  const total = wins + draws + losses;

  if (total === 0) {
    return (
      <div className="bg-gray-100 rounded-full h-8 flex items-center justify-center">
        <span className="text-sm text-gray-500">No games played yet</span>
      </div>
    );
  }

  const winsPercentage = (wins / total) * 100;
  const drawsPercentage = (draws / total) * 100;
  const lossesPercentage = (losses / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex h-8 rounded-full gap-1 p-1 relative">
        <Bar percentage={winsPercentage} colour="bg-green-800" title="Wins" />
        <Bar
          percentage={drawsPercentage}
          colour="bg-yellow-500"
          title="Draws"
        />
        <Bar percentage={lossesPercentage} colour="bg-red-900" title="Losses" />
      </div>
    </div>
  );
}
