// frontend/apps/web/src/pages/projects/new/index.tsx
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { PageHeader } from "@/components/page-header";
import type { Document, Disciplina, Milestone, User } from "@/types/project";

// ----------------- HTTP helpers -----------------
const API_BASE = "/api/v1";
const joinURL = (b: string, p: string) => `${b.replace(/\/+$/, "")}/${p.replace(/^\/+/, "")}`;

async function getJSON<T>(path: string): Promise<T> {
  const url = joinURL(API_BASE, path);
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}\n${txt}`);
  }
  return (await res.json()) as T;
}

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const url = joinURL(API_BASE, path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const raw = await res.text().catch(() => "");
  if (!res.ok) {
    let msg = raw || res.statusText;
    try {
      const parsed = JSON.parse(raw);
      msg = parsed?.message || raw || res.statusText;
    } catch {}
    const err: any = new Error(`POST ${url} -> HTTP ${res.status} ${res.statusText}\n${msg}`);
    err.status = res.status;
    err.body = raw;
    throw err;
  }

  if (!raw) return undefined as T;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined as T;
  }
}

// ----------------- Tipos locais -----------------
type NewProjectForm = {
  name: string;
  code: string;
  clientId: number | null; // obrigatório
  description: string;     // UI
  status: string;          // UI
  startDate: string;       // UI
  endDate: string;         // UI
};

type ClientOption = { id: number; name: string };

// resposta paginada padrão do Spring
type PageResp<T> = { content: T[]; totalElements: number; totalPages: number; number: number; size: number };

type OrganizationDTO = { id: number; name: string; orgType?: string };

// gera um código simples e (bem) único
const genCode = () => `PROJ-${Date.now().toString(36).toUpperCase()}`;

// ----------------- Utils clientes -----------------
function normalizeOrgs(resp: OrganizationDTO[] | PageResp<OrganizationDTO>): OrganizationDTO[] {
  return Array.isArray(resp) ? resp : resp?.content ?? [];
}

async function fetchClientsSmart(): Promise<ClientOption[]> {
  // tua rota real via proxy do Vite: /api/v1/orgs?type=CLIENT
  const candidates = [
    "/orgs?type=CLIENT&size=1000",
    "/orgs?type=CLIENT",
  ];

  const errors: string[] = [];
  for (const path of candidates) {
    try {
      const data = await getJSON<OrganizationDTO[] | PageResp<OrganizationDTO>>(path);
      const items = normalizeOrgs(data).map((o) => ({ id: o.id, name: o.name }));
      if (items.length || path.endsWith("CLIENT")) {
        console.log("[clients] ok via", path, items);
        return items;
      }
    } catch (e: any) {
      errors.push(`- ${path}: ${e.message?.split("\n")[0] ?? e}`);
    }
  }
  throw new Error(`Nenhuma rota de clientes encontrada:\n${errors.join("\n")}`);
}

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // ----------- clientes (GET real) -----------
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setClientsLoading(true);
        setClientsError(null);
        const list = await fetchClientsSmart();
        setClients(list);
      } catch (e: any) {
        console.error("[clients] falha:", e);
        setClientsError(e?.message ?? "Falha ao carregar clientes");
        setClients([]);
      } finally {
        setClientsLoading(false);
      }
    })();
  }, []);

  // ----------- formulário -----------
  const [projectData, setProjectData] = useState<NewProjectForm>({
    name: "",
    code: genCode(),
    clientId: null,
    description: "",
    status: "planejamento",
    startDate: "",
    endDate: "",
  });

  // ----------- UI mock Disciplinas/Marcos (inalterado) -----------
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    {
      id: 1,
      name: "Civil",
      documents: [
        { id: 1, name: "Plantas Baixas", dueDate: "" },
        { id: 2, name: "Memorial Descritivo Civil", dueDate: "" },
      ],
      destinatarios: { cliente: [], fornecedor: [], interno: [] },
    },
    {
      id: 2,
      name: "Elétrica",
      documents: [
        { id: 3, name: "Projeto Elétrico - Baixa Tensão", dueDate: "" },
        { id: 4, name: "Memorial Descritivo Elétrico", dueDate: "" },
      ],
      destinatarios: { cliente: [], fornecedor: [], interno: [] },
    },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, name: "Entrega Inicial", description: "Documentação básica do projeto", dueDate: "" },
  ]);

  const [userGroups] = useState<Record<string, User[]>>({
    cliente: [
      { id: 1, name: "João Silva", email: "joao@empresaabc.com" },
      { id: 2, name: "Maria Santos", email: "maria@empresaabc.com" },
      { id: 3, name: "Carlos Oliveira", email: "carlos@empresaabc.com" },
    ],
    fornecedor: [
      { id: 4, name: "Ana Costa", email: "ana@construtoraXYZ.com" },
      { id: 5, name: "Pedro Mendes", email: "pedro@construtoraXYZ.com" },
      { id: 6, name: "Lucia Ferreira", email: "lucia@construtoraXYZ.com" },
    ],
    interno: [
      { id: 7, name: "Roberto Lima", email: "roberto@docflow.com" },
      { id: 8, name: "Sandra Costa", email: "sandra@docflow.com" },
      { id: 9, name: "Felipe Santos", email: "felipe@docflow.com" },
    ],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!projectData.name.trim()) {
      alert("Informe o nome do projeto.");
      setIsLoading(false);
      return;
    }
    if (projectData.clientId == null) {
      alert("Selecione o cliente.");
      setIsLoading(false);
      return;
    }
    if (!projectData.code.trim()) {
      alert("Informe um código único para o projeto.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        code: projectData.code.trim(),
        name: projectData.name.trim(),
        clientId: projectData.clientId,
      };

      // log pra diagnosticar resposta
      console.log("[POST] /projects payload:", payload);
      const created = await postJSON<any>("/projects", payload);
      console.log("[POST] /projects response:", created);

      // se seu backend não retorna body no 201, tudo bem — seguimos
      navigate("/projects");
    } catch (err: any) {
      alert(err?.message ?? "Erro ao criar projeto.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof NewProjectForm, value: string | number | null) => {
    setProjectData((prev) => ({ ...prev, [field]: value } as NewProjectForm));
  };

  // --------- Disciplinas / Documentos / Destinatários / Marcos (mesmo código) ---------
  const addDisciplina = () => {
    const newDisciplina: Disciplina = {
      id: Date.now(),
      name: "",
      documents: [],
      destinatarios: { cliente: [], fornecedor: [], interno: [] },
    };
    setDisciplinas((prev) => [...prev, newDisciplina]);
  };

  const removeDisciplina = (id: number) => {
    setDisciplinas((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDisciplina = (id: number, field: keyof Disciplina, value: any) => {
    setDisciplinas((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const addDocument = (disciplinaId: number) => {
    setDisciplinas((prev) =>
      prev.map((d) =>
        d.id === disciplinaId
          ? { ...d, documents: [...d.documents, { id: Date.now(), name: "", dueDate: "" } as Document] }
          : d,
      ),
    );
  };

  const removeDocument = (disciplinaId: number, docId: number) => {
    setDisciplinas((prev) =>
      prev.map((d) => (d.id === disciplinaId ? { ...d, documents: d.documents.filter((doc) => doc.id !== docId) } : d)),
    );
  };

  const updateDocument = (disciplinaId: number, docId: number, field: keyof Document, value: string) => {
    setDisciplinas((prev) =>
      prev.map((d) =>
        d.id === disciplinaId
          ? { ...d, documents: d.documents.map((doc) => (doc.id === docId ? { ...doc, [field]: value } : doc)) }
          : d,
      ),
    );
  };

  const toggleDestinatario = (
    disciplinaId: number,
    groupType: keyof Disciplina["destinatarios"],
    userId: number,
  ) => {
    setDisciplinas((prev) =>
      prev.map((d) => {
        if (d.id !== disciplinaId) return d;
        const currentGroup = d.destinatarios[groupType] || [];
        const newGroup = currentGroup.includes(userId)
          ? currentGroup.filter((id) => id !== userId)
          : [...currentGroup, userId];
        return { ...d, destinatarios: { ...d.destinatarios, [groupType]: newGroup } };
      }),
    );
  };

  const addMilestone = () => {
    setMilestones((prev) => [...prev, { id: Date.now(), name: "", description: "", dueDate: "" }]);
  };

  const removeMilestone = (id: number) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMilestone = (id: number, field: keyof Milestone, value: string) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  // ----------------- UI -----------------
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/projects" />
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <PageHeader title="Novo Projeto" description="Cadastre um novo projeto no sistema">
            <Link to="/projects">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Projeto *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Expansão da Sede"
                      value={projectData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código do Projeto *</Label>
                    <Input
                      id="code"
                      placeholder="Ex: PROJ-2025-001"
                      value={projectData.code}
                      onChange={(e) => updateField("code", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (UI)</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o projeto..."
                    className="min-h-[100px]"
                    value={projectData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente *</Label>
                    <Select
                      disabled={clientsLoading || !!clientsError}
                      value={projectData.clientId != null ? String(projectData.clientId) : ""}
                      onValueChange={(value) => updateField("clientId", value ? Number(value) : null)}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            clientsLoading
                              ? "Carregando clientes..."
                              : clientsError
                              ? "Falha ao carregar clientes"
                              : "Selecione o cliente"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                          </SelectItem>
                        ))}
                        {!clientsLoading && !clientsError && clients.length === 0 && (
                          <div className="px-3 py-2 text-sm text-muted-foreground">Nenhum cliente encontrado</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status Inicial (UI)</Label>
                    <Select value={projectData.status} onValueChange={(value) => updateField("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planejamento">Planejamento</SelectItem>
                        <SelectItem value="em-andamento">Em Andamento</SelectItem>
                        <SelectItem value="em-revisao">Em Revisão</SelectItem>
                        <SelectItem value="pausado">Pausado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Data de Início (UI)</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Data Prevista de Conclusão (UI)</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={projectData.endDate}
                      onChange={(e) => updateField("endDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disciplinas / Documentos / Destinatários / Marcos - UI */}
            <Card className="neon-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Disciplinas e Documentos</CardTitle>
                    <CardDescription>Configure as disciplinas do projeto, seus documentos e destinatários</CardDescription>
                  </div>
                  <Button type="button" onClick={addDisciplina} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Disciplina
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {disciplinas.map((disciplina, index) => (
                  <div key={disciplina.id} className="border-2 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Disciplina {index + 1}</h3>
                      {disciplinas.length > 1 && (
                        <Button type="button" onClick={() => removeDisciplina(disciplina.id)} variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`disciplina-name-${disciplina.id}`}>Nome da Disciplina</Label>
                      <Select value={disciplina.name} onValueChange={(value) => updateDisciplina(disciplina.id, "name", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a disciplina" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Civil">Civil</SelectItem>
                          <SelectItem value="Elétrica">Elétrica</SelectItem>
                          <SelectItem value="Hidráulica">Hidráulica</SelectItem>
                          <SelectItem value="Automação">Automação</SelectItem>
                          <SelectItem value="Estrutural">Estrutural</SelectItem>
                          <SelectItem value="Arquitetura">Arquitetura</SelectItem>
                          <SelectItem value="HVAC">HVAC</SelectItem>
                          <SelectItem value="Segurança">Segurança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Documentos da Disciplina</Label>
                        <Button type="button" onClick={() => addDocument(disciplina.id)} variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Documento
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {disciplina.documents.map((document) => (
                          <div key={document.id} className="flex gap-2 items-center">
                            <Input
                              placeholder="Nome do documento"
                              value={document.name}
                              onChange={(e) => updateDocument(disciplina.id, document.id, "name", e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              type="date"
                              value={document.dueDate}
                              onChange={(e) => updateDocument(disciplina.id, document.id, "dueDate", e.target.value)}
                              className="w-40"
                            />
                            {disciplina.documents.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeDocument(disciplina.id, document.id)}
                                variant="ghost"
                                size="sm"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Destinatários da Disciplina</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(userGroups).map(([groupType, users]) => (
                          <div key={groupType} className="space-y-2">
                            <Label className="text-sm font-medium capitalize">{groupType}</Label>
                            <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-3">
                              {users.map((user) => (
                                <div key={user.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`disciplina-${disciplina.id}-${groupType}-${user.id}`}
                                    checked={
                                      disciplina.destinatarios[groupType as keyof Disciplina["destinatarios"]]?.includes(user.id) ||
                                      false
                                    }
                                    onCheckedChange={() =>
                                      toggleDestinatario(disciplina.id, groupType as keyof Disciplina["destinatarios"], user.id)
                                    }
                                  />
                                  <Label
                                    htmlFor={`disciplina-${disciplina.id}-${groupType}-${user.id}`}
                                    className="text-xs"
                                  >
                                    {user.name}
                                    <br />
                                    <span className="text-muted-foreground">{user.email}</span>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Marcos */}
            <Card className="neon-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Marcos Contratuais</CardTitle>
                    <CardDescription>Defina os marcos e datas limite para entrega dos documentos</CardDescription>
                  </div>
                  <Button type="button" onClick={addMilestone} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Marco
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Marco {index + 1}</h4>
                      {milestones.length > 1 && (
                        <Button type="button" onClick={() => removeMilestone(milestone.id)} variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`milestone-name-${milestone.id}`}>Nome do Marco</Label>
                        <Input
                          id={`milestone-name-${milestone.id}`}
                          placeholder="Ex: Entrega Inicial"
                          value={milestone.name}
                          onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`milestone-date-${milestone.id}`}>Data Limite</Label>
                        <Input
                          id={`milestone-date-${milestone.id}`}
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(milestone.id, "dueDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`milestone-desc-${milestone.id}`}>Descrição</Label>
                      <Textarea
                        id={`milestone-desc-${milestone.id}`}
                        placeholder="Descreva os documentos e requisitos deste marco..."
                        value={milestone.description}
                        onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="flex justify-end gap-4">
              <Link to="/projects">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading || clientsLoading} className="neon-border">
                {isLoading ? "Criando Projeto..." : (<><Save className="mr-2 h-4 w-4" /> Criar Projeto</>)}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
