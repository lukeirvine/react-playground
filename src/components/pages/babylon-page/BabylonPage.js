import React, { useEffect, useState } from "react";
import { Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera, Texture, StandardMaterial } from "@babylonjs/core";
import SceneComponent from "./../../scene-component/SceneComponent"; // uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import NavBar from './../../nav-bar/NavBar';
import { Button } from 'react-bootstrap';
import './BabylonPage.css';

let ball;

const onSceneReady = (scene) => {

    const canvas = scene.getEngine().getRenderingCanvas();

    // Physics
    scene.gravity = new Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;


    // Textures
    var bball = new StandardMaterial("bball", scene);
    bball.diffuseTexture = new Texture("https://i.imgur.com/HM8TSYA.jpg", scene);
    bball.specularTexture = new Texture("https://i.imgur.com/HM8TSYA.jpg", scene);
    bball.ambientTexture = new Texture("https://i.imgur.com/HM8TSYA.jpg", scene);

    // Camera
    var camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0,0,0), scene);
    camera.setTarget(new Vector3(0,0,0, scene));
    camera.attachControl(canvas, true);


    // Lighting
    var light = new HemisphericLight("HemiLight", new Vector3(0, 20, 0), scene);
    light.intensity = 0.6


    // Ball
    ball = MeshBuilder.CreateSphere("ball", {diameter: 3}, scene);
    ball.material = bball;
    ball.rotation.y = Math.PI;
    ball.checkCollisions = true;
};

const BabylonPage = () => {
    const [rotate, setRotate] = useState(true);

    /**
     * Will run on every frame render.  We are spinning the box on y-axis.
     */
    const onRender = (scene) => {
        if (ball !== undefined && rotate) {
        ball.rotation.y += 0.04;
        ball.rotation.z += 0.04;
        }
    };

    useEffect(() => {
        console.log("rotate", rotate)
    }, [rotate])

    return (
        <div>
            <NavBar />
            <Button id="rotate-btn" onClick={() => setRotate(prev => !prev)}>Rotate</Button>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" />
        </div>
    )
};

export default BabylonPage;