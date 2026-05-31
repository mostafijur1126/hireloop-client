import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link href={"/"}>
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
