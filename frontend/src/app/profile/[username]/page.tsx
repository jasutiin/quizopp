import { getUserByUsername } from '@/lib/users';
import { User } from '@/lib/types';
import StatsBar from '../components/statsbar/statsbar';

export default async function ProfilePage(props: {
  params: { username: string };
}) {
  const params = await props.params;
  const user: User | null = await getUserByUsername(params.username);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            User Not Found
          </h1>
          <p className="text-gray-600">
            Username{' '}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {params.username}
            </span>{' '}
            does not exist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      <div className="max-w-4xl mx-auto rounded-b-xl relative overflow-hidden bg-white shadow-lg">
        <div className="h-96 sm:h-[30rem] bg-gray-800"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center p-4">
          <div className="mx-auto w-32 h-32 mb-4 sm:w-40 sm:h-40 relative">
            <div className="absolute inset-0 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center">
              <span className="text-4xl font-extrabold text-blue-600">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="mt-2 text-white text-shadow">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
              {user.username}
            </h1>
            <p className="text-base sm:text-lg font-medium text-gray-200">
              {user.country}
            </p>
            <p className="text-base text-gray-200">{user.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              Statistics
            </h2>
          </div>
          <StatsBar wins={user.wins} draws={user.draws} losses={user.losses} />
        </div>
      </div>
    </div>
  );
}
