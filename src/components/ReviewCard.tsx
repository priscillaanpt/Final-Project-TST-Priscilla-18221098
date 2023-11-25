import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const ReviewCard = () => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Review ID: </p>
        <small className="text-default-500">User ID: </small>
        <h4 className="font-bold text-large">Product_id</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <p className="text-default-500 mt-4">Review Rating</p>
        <p className="text-default-500">Review Text</p>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
