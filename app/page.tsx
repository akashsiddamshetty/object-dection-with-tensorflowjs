'use client'
import React, { FC, useEffect, useRef } from "react";
import * as tf from '@tensorflow/tfjs-core';
import * as cocossd from "@tensorflow-models/coco-ssd";
import '@tensorflow/tfjs-backend-webgl';

import Webcam from "react-webcam";
import { drawRect } from "@/components/utils";
interface pageProps {}

const App: FC<pageProps> = ({}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await cocossd.load();
    console.log(net)
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net: cocossd.ObjectDetection) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      // @ts-expect-error

      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      
      const video = webcamRef.current.video;
      // @ts-expect-error

      const videoWidth = webcamRef.current.video.videoWidth;
      // @ts-expect-error

      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      // @ts-expect-error

      webcamRef.current.video.width = videoWidth;
      // @ts-expect-error

      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      // @ts-expect-error

      canvasRef.current.width = videoWidth;
      // @ts-expect-error

      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // @ts-expect-error

       const obj = await net.detect(video);

      // Draw mesh
      // @ts-expect-error

      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx)
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            // @ts-expect-error

            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            // @ts-expect-error

            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
};

export default App;
