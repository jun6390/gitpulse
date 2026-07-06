import type { GitHubRankingUser } from "@/types/github";
import RankingCard from "./RankingCard";

interface RankingListProps {
  users: GitHubRankingUser[];
  startRank: number;
  t: {
    followers: string;
    following: string;
    repos: string;
    noBio: string;
    noLocation: string;
    profileLink: string;
  };
}

const RankingList = ({ users, startRank, t }: RankingListProps) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      {users.map((user, index) => (
        <RankingCard
          key={user.id}
          rank={startRank + index}
          user={user}
          t={t}
        />
      ))}
    </div>
  );
};

export default RankingList;
