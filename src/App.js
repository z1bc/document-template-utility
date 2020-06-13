import React, { useRef, useEffect } from 'react';
import Pdf from "./pdf/document.pdf";
import json from './contact.json';
import { PDFDocument } from "pdf-lib";

const fetchPdf = () => {
  return fetch(Pdf).then((pdf) => pdf.arrayBuffer());
}

const editPdf = async() => {
  const pdfjs = await import('pdfjs-dist/build/pdf');
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  return pdfjs.getDocument(Pdf).promise
  .then(async(pdf) => {
    const page = await pdf.getPage(1);
    const data = await page.getTextContent();

    const matches = data.items.filter(item => {
      let returned = false;
      Object.keys(json.doc).forEach(element => {
        if (item.str.includes(element)) {
          returned = true;
        }
      });
      return returned;
    });

    const transformedValues = matches.map(item => {
    let trasnformedItem = "";
     Object.keys(json.doc).forEach(element => {
        trasnformedItem = item;
        trasnformedItem.str= item.str.replace(`{{doc.${element}}}`, json.doc[element]);
      });
      return trasnformedItem;
    });
    console.log(page);

    const canvas = document.getElementById("canvas");
    const viewport = page.getViewport({
      scale: 1
    });

     page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport
    })
    const show = await page.getTextContent();
    return data;
  }).then((data) => {
    console.log(data);
  })
};

 function App() {
  editPdf();
  return (
    <div className="App">
     <h1>nesto</h1>
     <a href="./pdf/document.pdf" download="file">file</a>
     <canvas id="canvas" width="600" height="600"></canvas>
    </div>
  );
}

export default App;
