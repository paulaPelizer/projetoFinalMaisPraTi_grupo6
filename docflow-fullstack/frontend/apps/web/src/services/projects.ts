import { apiPost } from "@/lib/api";

export interface CreateProjectRequest {
  name: string;
  code?: string;
  description?: string;
  client?: string;      // ajuste para clientId: number se o backend exigir
  status?: string;      // ajuste conforme o enum do backend
  startDate?: string;   // "YYYY-MM-DD"
  endDate?: string;     // "YYYY-MM-DD"
  // Se seu backend espera mais campos, adicione aqui.
}

export interface ProjectResponse {
  id: number;
  name: string;
  // ...demais campos que o backend retorna
}

export async function createProject(data: CreateProjectRequest) {
  // ajuste o caminho se no Swagger for outro, por ex. "/projects/create"
  return apiPost<ProjectResponse>("/projects", data);
}
