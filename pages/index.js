import { useCallback, useRef, useState } from "react";
import Header from "../component/Header";
import Info from "../component/Info";
import Seo from "../component/Share/Seo";
import { sendImage } from "../services/callApi";

const serviceUrl = `http://a0ee-103-109-40-10.ngrok.io/predict`;

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
  const [image, setImage] = useState();
  const [url, setUrl] = useState(``);
  const [selectModel, setSelectModel] = useState(1);
  const [fetch, setFetch] = useState(false);
  const { result, uploader } = useDisplayImage();

  const handleSubmit = useCallback(async () => {
    if (!image && !url) {
      alert(`Vui lòng chọn đủ thông tin`);
      return;
    }
    if (image) {
      console.log(image);
    } else {
      const formData = new FormData();
      formData.append(`url`, url);
      // const rs = await sendImage(formData);
      // console.log(rs);
      const rs = await fetch(serviceUrl, {
        method: "POST",
        body: formData,
      });
      console.log(rs)
    }
  }, [image, url]);

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
                    disabled={fetch}
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
      </div>
    </>
  );
};
export default Home;
