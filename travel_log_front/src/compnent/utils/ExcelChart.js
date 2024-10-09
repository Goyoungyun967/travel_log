import exceljs from "exceljs";
import html2canvas from "html2canvas";
function downloadWorkbook(chart, chartData, title) {
  // excel 파일 생성
  let workbook = new exceljs.Workbook();

  const dataSheet = workbook.addWorksheet(title);

  //테이블의 경우, 데이터를 넣어줌
  const keys = Object.keys(chartData[0]);
  let position = [
    {
      tl: { col: keys.length + 3, row: 1 }, // left, top
      br: { col: keys.length + 3 + 11, row: 20 }, // right, bottom
    },
  ];
  for (let i = 1; i < keys.length; i++) {
    dataSheet.getCell(1, i + 1).value = keys[i];
    chartData.forEach((item, index) => {
      dataSheet.getCell(index + 2, i + 1).value = item[keys[i]];
    });
  }
  chartData.forEach((item, index) => {
    dataSheet.getCell(index + 2, 1).value = item.name;
  });

  let promise = [];
  chart.forEach((item, index) => {
    promise.push(
      html2canvas(item, { scale: 10 }).then((c) => {
        let image = c.toDataURL();
        const imageId2 = workbook.addImage({
          base64: image,
          extension: "png",
        });

        dataSheet.addImage(imageId2, position[index]);
      })
    );
  });

  Promise.all(promise).then(() => {
    workbook.xlsx.writeBuffer().then((b) => {
      let a = new Blob([b]);
      let url = window.URL.createObjectURL(a);
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day =
        date.getDay() + 1 > 10 ? date.getDay() + 1 : "0" + (date.getDay() + 1);
      let elem = document.createElement("a");
      elem.href = url;
      elem.download = `${year}-${month}-${day}_${title}.xlsx`;
      document.body.appendChild(elem);
      elem.style = "display: none";
      elem.click();
      elem.remove();
    });
  });
}

export { downloadWorkbook };
