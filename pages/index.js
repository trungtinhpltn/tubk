import FormData from "form-data";
import { useRef, useState } from "react";
import Header from "../component/Header";
import Info from "../component/Info";
import Seo from "../component/Share/Seo";

const useDisplayImage = () => {
  const [result, setResult] = useState("");

  const uploader = (e) => {
    const imageFile = e?.target?.files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    } else {
      setResult(null);
    }
  };
  return { result, uploader };
};

const Home = () => {
  const imageInputRef = useRef();
  const rsRef = useRef();
  const [image, setImage] = useState();
  const [url, setUrl] = useState(``);
  const [selectModel, setSelectModel] = useState(1);
  const [respone, setRespone] = useState();

  const { result, uploader } = useDisplayImage();

  const handleSubmit = async () => {
    if (!image && !url) {
      alert(`Vui lòng chọn đủ thông tin`);
      return;
    }
    if (image) {
      console.log(result)
      let rs = await fetch("/api/callImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: result }),
      });
      rs = await rs.json();
    } else {
      let rs = await fetch("/api/callapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      rs = await rs.json();
      if (rs?.status === "ok") {
        setRespone(rs);
        setTimeout(() => {
          rsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
      } else {
        alert(`Đã có lỗi xảy ra`);
        return;
      }
    }
  };

  return (
    <>
      <Seo />
      <div className="container">
        <Header />
        <Info />
        <div className="row pt-5 pb-5">
          <div className="col-4">
            <div className="row">
              <div className="col-12">
                <div className="card-body with-border">
                  <div className="text-center pb-3 font18 w600">Input</div>
                  <div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="URL"
                        onChange={(e) => {
                          setUrl(e.target.value);
                          setRespone(null);
                          setImage(null);
                          uploader();
                          imageInputRef.current.value = null;
                        }}
                        value={url}
                      />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        uploader(e);
                        setUrl(``);
                        setRespone(null);
                      }}
                      ref={imageInputRef}
                      multiple={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <div className="card-body with-border">
                  <div className="text-center pb-3 font18 w600">Select model</div>
                  <div>
                    <div className="form-check" onClick={() => setSelectModel(1)}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectModel"
                        id="select1"
                        checked={selectModel === 1}
                        readOnly
                      />
                      <label className="form-check-label w600" htmlFor="select1">
                        Select both
                      </label>
                    </div>
                    <div className="form-check" onClick={() => setSelectModel(2)}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectModel"
                        id="select2"
                        checked={selectModel === 2}
                        readOnly
                      />
                      <label className="form-check-label w600" htmlFor="select2">
                        M2 transformer
                      </label>
                    </div>
                    <div className="form-check" onClick={() => setSelectModel(3)}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="selectModel"
                        id="select3"
                        checked={selectModel === 3}
                        readOnly
                      />
                      <label className="form-check-label w600" htmlFor="select3">
                        Show anh tell
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card-body text-center">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 text-center">
            {(image || url) && (
              <figure className="abs06">
                <img className={"show-image"} src={result || url} alt="title" />
              </figure>
            )}
          </div>
        </div>
        {respone && (
          <div className="row pb-5">
            <div className="col-12">
              <div className="card-body" ref={rsRef}>
                <div className="text-center mb-3">
                  <h1>Result</h1>
                </div>
                <ul style={{ listStyle: `none`, padding: 0, margin: 0, paddingLeft: "50px" }}>
                  {respone?.captions.map((item, inx) => (
                    <li key={inx} className="mb-3">
                      <b>{`Caption ${inx + 1}: `}</b>
                      <span className="font18">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
