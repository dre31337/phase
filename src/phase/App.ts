import { Camera, OGLRenderingContext, Renderer, Transform } from "ogl";
import { Shape } from "../elements/Shape";
import { EventBus } from "../util/EventBus";
import { CameraContoller } from "./CameraController";
import { Tick } from "./Tick";
import { Viewport } from "./Viewport";
import { MeshFactory } from "./meshes/MeshFactory";

export class App {
  
  readonly container: HTMLElement = document.getElementById("container");
  readonly renderer: Renderer = new Renderer({});
  readonly viewport: Viewport = new Viewport(this.container);
  readonly tick = new Tick();
  readonly camera: Camera = new Camera(this.renderer.gl, {
    left: -this.viewport.x * 0.5,
    right: this.viewport.x * 0.5,
    top: this.viewport.y * 0.5,
    bottom: -this.viewport.y * 0.5,
    near: -1e3,
    far: 1e3,
  });
  readonly cameraController = new CameraContoller(this.camera);
  readonly scene: Transform = new Transform();

  private static instance: App | null = null;
  static get() {
    if (App.instance === null) {
      App.instance = new App();
    }
    return App.instance;
  }
  static gl(): OGLRenderingContext {
    if (App.instance === null) {
      throw "App needs to be inialized before getting rendering context!";
    }
    return App.instance.renderer.gl;
  }
  private constructor() {
    this.container.appendChild(this.renderer.gl.canvas);
    this.onResize();

    EventBus.on(Viewport.updateEvent, this.onResize);
    EventBus.on(Tick.renderEvent, this.onRender);
  }

  private onResize = () => {
    this.renderer.setSize(this.viewport.x, this.viewport.y);
    this.renderer.dpr = this.viewport.dpr;
  }

  private onRender = () => {
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }

  addShape = (...shapes: Shape[]) => {
    shapes.forEach(shape => {
      this.scene.addChild(MeshFactory.createMesh(shape));
    })
  }
}
