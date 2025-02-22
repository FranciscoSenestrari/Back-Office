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
    `${baseUrl}api/estadisticas/ventastotales?fechaInicio=2025-02-01T00:00:00&fechaFin=2025-02-12T23:59:59`
    //    `${baseUrl}api/informes/ventas?fechaInicio=${fecha_inicio}&fechaFin=${fecha_fin}`
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
export async function pedidosXfecha(fecha_inicio: string, fecha_fin: string) {
  const response = await axios.get(
    `${baseUrl}api/estadisticas/pedidos_por_fechas?fechaInicio=${fecha_inicio}T00:00:00&fechaFin=${fecha_fin}T23:59:59`
  );
  return response;
}
export async function productosMasVendidos() {
  const response = await axios.get(
    `${baseUrl}api/estadisticas/productosmasvendidos`
  );
  return response;
}
export async function productoMasRecaudo() {
  const response = await axios.get(
    `${baseUrl}api/estadisticas/productosmasrecaudados`
  );
  return response;
}
export async function productosMasVendidosFecha(
  fecha_inicio: string,
  fecha_fin: string
) {
  const response = await axios.get(
    `${baseUrl}api/estadisticas/productosmasvendidos?fechaInicio=${fecha_inicio}T00:00:00&fechaFin=${fecha_fin}T23:59:59`
  );
  return response;
}
