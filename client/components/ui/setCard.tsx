import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function SetCard() {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Setname</p>
        <small className="text-default-500">by user</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2"></CardBody>
    </Card>
  );
}
