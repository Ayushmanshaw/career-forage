import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.js?worker";

GlobalWorkerOptions.workerSrc = pdfjsWorker;
