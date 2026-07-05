import { Suspense } from "react";
import ActivityView from "@/features/activity/ActivityView";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <ActivityView />
    </Suspense>
  );
};

export default Page;
