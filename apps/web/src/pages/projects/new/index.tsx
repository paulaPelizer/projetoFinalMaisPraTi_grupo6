import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"
import type { Document, Disciplina, Milestone, User, ProjectData } from "@/types/project"

export default function NewProjectPage() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Dados básicos do projeto
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    code: "",
    description: "",
    client: "",
    status: "planejamento",
    startDate: "",
    endDate: "",
  })

  // Disciplinas com documentos e destinatários
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([
    {
      id: 1,
      name: "Civil",
      documents: [
        { id: 1, name: "Plantas Baixas", dueDate: "" },
        { id: 2, name: "Memorial Descritivo Civil", dueDate: "" },
      ],
      destinatarios: {
        cliente: [],
        fornecedor: [],
        interno: [],
      },
    },
    {
      id: 2,
      name: "Elétrica",
      documents: [
        { id: 3, name: "Projeto Elétrico - Baixa Tensão", dueDate: "" },
        { id: 4, name: "Memorial Descritivo Elétrico", dueDate: "" },
      ],
      destinatarios: {
        cliente: [],
        fornecedor: [],
        interno: [],
      },
    },
  ])

  // Marcos contratuais
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      name: "Entrega Inicial",
      description: "Documentação básica do projeto",
      dueDate: "",
    },
  ])

  // Usuários disponíveis por grupo
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
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validação básica
    if (!projectData.name || !projectData.client) {
      alert("Por favor, preencha os campos obrigatórios")
      setIsLoading(false)
      return
    }

    try {
      // Simular criação do projeto
      const newProject = {
        ...projectData,
        id: Date.now(),
        disciplinas,
        milestones,
        createdAt: new Date().toISOString(),
      }

      console.log("Criando novo projeto:", newProject)

      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar para a lista de projetos
      navigate("/projects")
    } catch (error) {
      console.error("Erro ao criar projeto:", error)
      alert("Erro ao criar projeto. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateProjectData = (field: keyof ProjectData, value: string) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
  }

  // Funções para gerenciar disciplinas
  const addDisciplina = () => {
    const newDisciplina: Disciplina = {
      id: Date.now(),
      name: "",
      documents: [],
      destinatarios: {
        cliente: [],
        fornecedor: [],
        interno: [],
      },
    }
    setDisciplinas([...disciplinas, newDisciplina])
  }

  const removeDisciplina = (id: number) => {
    setDisciplinas(disciplinas.filter((d) => d.id !== id))
  }

  const updateDisciplina = (id: number, field: keyof Disciplina, value: any) => {
    setDisciplinas(disciplinas.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }

  // Funções para gerenciar documentos
  const addDocument = (disciplinaId: number) => {
    setDisciplinas(
      disciplinas.map((d) => {
        if (d.id === disciplinaId) {
          const newDoc: Document = {
            id: Date.now(),
            name: "",
            dueDate: "",
          }
          return { ...d, documents: [...d.documents, newDoc] }
        }
        return d
      }),
    )
  }

  const removeDocument = (disciplinaId: number, docId: number) => {
    setDisciplinas(
      disciplinas.map((d) => {
        if (d.id === disciplinaId) {
          return { ...d, documents: d.documents.filter((doc) => doc.id !== docId) }
        }
        return d
      }),
    )
  }

  const updateDocument = (disciplinaId: number, docId: number, field: keyof Document, value: string) => {
    setDisciplinas(
      disciplinas.map((d) => {
        if (d.id === disciplinaId) {
          return {
            ...d,
            documents: d.documents.map((doc) => (doc.id === docId ? { ...doc, [field]: value } : doc)),
          }
        }
        return d
      }),
    )
  }

  // Funções para gerenciar destinatários
  const toggleDestinatario = (disciplinaId: number, groupType: keyof Disciplina["destinatarios"], userId: number) => {
    setDisciplinas(
      disciplinas.map((d) => {
        if (d.id === disciplinaId) {
          const currentGroup = d.destinatarios[groupType] || []
          const newGroup = currentGroup.includes(userId)
            ? currentGroup.filter((id) => id !== userId)
            : [...currentGroup, userId]

          return {
            ...d,
            destinatarios: {
              ...d.destinatarios,
              [groupType]: newGroup,
            },
          }
        }
        return d
      }),
    )
  }

  // Funções para marcos contratuais
  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now(),
      name: "",
      description: "",
      dueDate: "",
    }
    setMilestones([...milestones, newMilestone])
  }

  const removeMilestone = (id: number) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const updateMilestone = (id: number, field: keyof Milestone, value: string) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

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
                      onChange={(e) => updateProjectData("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Código do Projeto</Label>
                    <Input
                      id="code"
                      placeholder="Ex: PROJ-2025-001"
                      value={projectData.code}
                      onChange={(e) => updateProjectData("code", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o projeto..."
                    className="min-h-[100px]"
                    value={projectData.description}
                    onChange={(e) => updateProjectData("description", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente *</Label>
                    <Select
                      value={projectData.client}
                      onValueChange={(value) => updateProjectData("client", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empresa-abc">Empresa ABC</SelectItem>
                        <SelectItem value="construtora-xyz">Construtora XYZ</SelectItem>
                        <SelectItem value="industria-123">Indústria 123</SelectItem>
                        <SelectItem value="empresa-def">Empresa DEF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status Inicial</Label>
                    <Select value={projectData.status} onValueChange={(value) => updateProjectData("status", value)}>
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
                    <Label htmlFor="start-date">Data de Início</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={projectData.startDate}
                      onChange={(e) => updateProjectData("startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Data Prevista de Conclusão</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={projectData.endDate}
                      onChange={(e) => updateProjectData("endDate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disciplinas e Documentos */}
            <Card className="neon-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Disciplinas e Documentos</CardTitle>
                    <CardDescription>
                      Configure as disciplinas do projeto, seus documentos e destinatários
                    </CardDescription>
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

                    {/* Nome da Disciplina */}
                    <div className="space-y-2">
                      <Label htmlFor={`disciplina-name-${disciplina.id}`}>Nome da Disciplina</Label>
                      <Select
                        value={disciplina.name}
                        onValueChange={(value) => updateDisciplina(disciplina.id, "name", value)}
                      >
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

                    {/* Documentos da Disciplina */}
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

                    {/* Destinatários da Disciplina */}
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
                                      disciplina.destinatarios[
                                        groupType as keyof Disciplina["destinatarios"]
                                      ]?.includes(user.id) || false
                                    }
                                    onCheckedChange={() =>
                                      toggleDestinatario(
                                        disciplina.id,
                                        groupType as keyof Disciplina["destinatarios"],
                                        user.id,
                                      )
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

            {/* Marcos Contratuais */}
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

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4">
              <Link to="/projects">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="neon-border">
                {isLoading ? (
                  "Criando Projeto..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Criar Projeto
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
