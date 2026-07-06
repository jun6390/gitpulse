import { Suspense } from "react";
import RankingView from "@/features/ranking/RankingView";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <RankingView />
    </Suspense>
  );
};

export default Page;
