import InitAOS from "@/components/InitAOS";
import PageTitle from "@/components/PageTitle";
import React from "react";
import UserProfileSection from "./sections/UserProfileSection";
import { fetchPageData } from "@/actions/actions";

export default async function Main() {
  const pageData = await fetchPageData("user-profile-page");
  return (
    <>
      <InitAOS />
      <main className="main">
        <PageTitle page="user-profile-page" />
        <UserProfileSection pageData={pageData} />
      </main>
    </>
  );
}
