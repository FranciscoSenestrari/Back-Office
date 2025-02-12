import axios from "axios";
import { Producto } from "../pages/Productos/Productos";
import { ProductoCarga } from "../pages/Productos/CargaProductos";
import toast from "react-hot-toast";
const baseUrl2 = "http://localhost:8080/";
export const baseUrl = "https://8s6ggzdl-8080.brs.devtunnels.ms/";

export function getUser(username: string) {
  const response = axios.get(`${baseUrl}api/user/profile?username=${username}`);
  return response;
}

export function loginUser(username: string, password: string) {
  const response = axios.post(`${baseUrl}auth/login`, {
    username: username,
    password: password,
  });
  return response;
}
export function informes(fecha_inicio: string, fecha_fin: string) {
  const response = axios.get(
    `${baseUrl}api/informes/ventas?fechaInicio=${fecha_inicio}&fechaFin=${fecha_fin}`
  );
  return response;
}

export function getPedidos() {
  const response = axios.get(`${baseUrl}api/pedidos`);
  return response;
}

export function getProductos() {
  const response = axios.get(`${baseUrl}api/productos`);
  return response;
}

export function cargarProductos(producto: ProductoCarga) {
  const response = axios.post(`${baseUrl}api/productos`, producto);
  return response;
}

export async function cambiarEstadoPedido(estado: string, id: number) {
  await axios.put(`${baseUrl}api/pedidos/${id}/estado`, {
    estado: estado,
  });
}
