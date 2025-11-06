import React from "react";
import { Card } from "./ui/card";
import { Circle, CircleDashed } from "lucide-react";

const NoTask = () => {
  return (
    <div>
      <Card className="p-2 text-center gap-2">
        <CircleDashed className="size-10 mx-auto" />
        <p>
          Công việc với bộ lọc hiện tại không có, hãy xem những phần khác để
          tiếp tục làm nha!!!
        </p>
      </Card>
    </div>
  );
};

export default NoTask;
