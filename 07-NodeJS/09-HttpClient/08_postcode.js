import axios from "axios";

// devU01TX0FVVEgyMDIyMDcwNDEyNTMzNjExMjc1OTc=

(async () => {
  let json = null;
  try {
    // axios를 활용하여 다른 백엔드에게 hTTP GET 파라미터를 전달하고 결과를 리턴받는다.
    const response = await axios.get(
      "http://www.juso.go.kr/addrlink/addrLinkApi.do",
      {
        params: {
          confmKey: "devU01TX0FVVEgyMDIyMDcwNDEyNTMzNjExMjc1OTc=", // 발급받은 승인키
          currentPage: 1, // 현재 페이지 번호
          countPerPage: 20, // 페이지당 출력할 결과 Row 수
          keyword: "서초W",
          resultType: "json", // 검색결과형식 설정(xml, json)
        },
      }
    );

    if (response.data.results?.common?.errorCode !== "0") {
      const error = new Error();
      error.response = {
        status: response.data.results.common.errorCode,
        statusText: response.data.results.common.errorMessage,
      };

      throw error;
    }
    json = response.data;
  } catch (error) {
    const errorMsg =
      "[" + error.response.status + "]" + error.response.statusText;
    console.log(errorMsg);
    return;
  }

  json.results.juso.map((item, index) => {
    console.log("[%s] ", item.zipNo);
    console.log("[지번주소] " + item.jibunAddr);
    console.log("[도로명주소] " + item.readAddr);
    console.log();
  });
})();
