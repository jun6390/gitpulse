import ProfileView from "@/features/profile/ProfileView";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <ProfileView />
    </Suspense>
  );
};

export default Page;
