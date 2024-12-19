import axios from "axios";
const baseUrl = "https://xh8p97s3-8080.brs.devtunnels.ms/";
export function getUser(username: string) {
  const response = axios.get(`${baseUrl}api/user/profile?username=${username}`);
  return response;
}

export function login(username: string, password: string) {
  const response = axios.post(`${baseUrl}auth/login`, { username, password });
  return response;
}
export function informes(fecha_inicio: string, fecha_fin: string) {
  const response = axios.get(
    `${baseUrl}aapi/informes/ventas?fechaInicio=${fecha_inicio}&fechaFin=${fecha_fin}`
  );
  return response;
}
