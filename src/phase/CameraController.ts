import { Camera, Vec2, Vec3 } from "ogl";
import { EventBus } from "../util/EventBus";
import { App } from "./App";
import { Tick } from "./Tick";
import { Viewport } from "./Viewport";

export class CameraContoller {

  private isDragging = false;
  private mouse = new Vec2();
  private zoom = 1;
  private position = new Vec3();
  private tolerance = 0;

  constructor(private camera: Camera) {
    camera.position.set(0);
    camera.lookAt([0, 0, -1]);
    
    window.addEventListener("wheel", this.onWheel);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);

    EventBus.on(Viewport.updateEvent, this.onViewportUpdate);
    EventBus.on(Tick.event, this.onTick);
  }

  private onMouseDown = (e: MouseEvent) => {
    this.isDragging = true;
    this.mouse.set(e.clientX, e.clientY);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    this.position.x -= (e.clientX - this.mouse.x) / this.zoom;
    this.position.y += (e.clientY - this.mouse.y) / this.zoom;
    this.mouse.set(e.clientX, e.clientY);
  };

  private onMouseUp = (e: MouseEvent) => {
    this.isDragging = false;
  };


  private onTick = () => {
    this.camera.position.x += (this.position.x - this.camera.position.x) * 0.2;
    this.camera.position.y += (this.position.y - this.camera.position.y) * 0.2;
    this.camera.zoom += (this.zoom - this.camera.zoom) * 0.2;
    this.camera.updateProjectionMatrix();
  }

  private onWheel = (e: WheelEvent) => {
    const delta = e.deltaY;
    this.tolerance = Math.max(Math.abs(delta) * 5, this.tolerance);

    const zoomFactor = 1 - delta / this.tolerance;
    
    const view = App.get().viewport.v2;
    const dx = e.clientX - 0.5 * view.x;
    const dy = e.clientY - 0.5 * view.y;

    const x = this.position.x + dx / this.zoom;
    const y = this.position.y - dy / this.zoom;
    
    this.zoom *= zoomFactor;

    this.position.x = x - dx / this.zoom;
    this.position.y = y + dy / this.zoom;
  };

  private onViewportUpdate = (v: Viewport) => {
    this.camera.left = -v.x * 0.5;
    this.camera.right = v.x * 0.5;
    this.camera.top = v.y * 0.5;
    this.camera.bottom = -v.y * 0.5;

    this.camera.updateProjectionMatrix();
  };
}
