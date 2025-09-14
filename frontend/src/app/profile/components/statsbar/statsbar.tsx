import Draws from './draws';
import Wins from './wins';
import Losses from './losses';

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
      <div className="flex h-8 rounded-full gap-1 bg-gray-200 p-1 relative">
        <Wins winsPercentage={winsPercentage} />
        <Draws drawsPercentage={drawsPercentage} />
        <Losses lossesPercentage={lossesPercentage} />
      </div>
    </div>
  );
}
