import React, { memo } from "react";

const Info = () => {
  return (
    <div className="row">
      <div className="col-4">
        <p className="w500">
          Thực hiện: <span className="font18 w600">Trần Thanh Tú</span>
        </p>
        <p className="w500">
          MSSV: <span className="font18 w600">201684487</span>
        </p>
      </div>
    </div>
  );
};

export default memo(Info);
