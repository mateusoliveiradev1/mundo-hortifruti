// Converte datas para o formato: dd/mm/aaaa às hh:mm

export function formatarData(data) {
  const dt = new Date(data);
  const dia = String(dt.getDate()).padStart(2, "0");
  const mes = String(dt.getMonth() + 1).padStart(2, "0");
  const ano = dt.getFullYear();

  const horas = String(dt.getHours()).padStart(2, "0");
  const minutos = String(dt.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}
