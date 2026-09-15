import api from "./axios";

export function getVehicle() {
  return api.get("/vehicle/getAll");
}
