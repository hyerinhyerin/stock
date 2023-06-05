async function stockData() {
  const respone = await axios
    .post("/oauth2/tokenP", {
      grant_type: "client_credentials",
      appkey: "PSVQ0RfoVrJIIJ2O4NqMycEMAFsDXKfwNJB0",
      appsecret:
        "nWg4NGjBRkWPVlV41z6uD7RdWybT05Evw27vd8iHz1C3J9P5qrlI1nRsAJzbaxzZtlPDDGHocwZBLivNSBWikz3XXCvmqmFffDr3sMQBllvZJa1vhB76w8r1aiavLId40nRxBoGyJbMhuKMnNOrYLEG1SBIXBa2EsViWqHikcOb7lWhWzZk=",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(respone);
}
stockData();
