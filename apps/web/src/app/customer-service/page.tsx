"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "../components/page-header/PageHeader";
import ChatLayout from "./components/ChatLayout";

export default function CustomerService() {
  return (
    <BaseLayout>
      {/* <PageHeader
        title="Customer Service"
        description="List of all concerns."
        area="FixKo PH"
        showArea={true}
      /> */}
      
      <div className="h-full w-full">
        <ChatLayout />
      </div>
    </BaseLayout>
  );
}
