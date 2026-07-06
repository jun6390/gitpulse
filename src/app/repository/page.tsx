import RepositoryView from "@/features/repository/RepositoryView";
import { Suspense } from "react";

const RepositoriesPage = () => {
  return (
    <Suspense fallback={null}>
      <RepositoryView />
    </Suspense>
  );
};

export default RepositoriesPage;
