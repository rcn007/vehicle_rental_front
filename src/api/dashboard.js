import api from "./axios";

export const getDashboard=()=>{
    return api.get("/admin/dashboard")
}