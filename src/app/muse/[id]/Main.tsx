import React from "react";
import { getModelItemDetailsData, updateModelViews } from "@/actions/actions";
import InitAOS from "@/components/InitAOS";
import ProfileDetails from "./sections/ProfileDetails";
import PageTitle from "@/components/PageTitle";

export default async function Main({ id }: { id: string }) {
  const model = await getModelItemDetailsData(id);
  await updateModelViews(id, model?.views + 1);
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="model-profile-page" />
        <ProfileDetails id={id} model={model} />
      </main>
    </>
  );
}
