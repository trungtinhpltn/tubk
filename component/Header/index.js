import React, { memo } from "react";

const Header = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card-body text-center">
          <p className="uppercase font20 w700 lh60"> Đồ án tốt nghiệp - Image Captioning</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
