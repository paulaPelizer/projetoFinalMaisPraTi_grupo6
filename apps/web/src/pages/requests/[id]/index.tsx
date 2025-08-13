import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, FileText, Users, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter, useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function RequestDetailPage() {
  const router = useNavigate()
  const params = useParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [comments, setComments] = useState("")

  // Simulação de dados da solicitação
  const request = {
    id: params.id,
    requestNumber: "REQ-2025001",
    project: "Projeto Alpha",
    origin: "Empresa ABC (Cliente)",
    destination: "Construtora XYZ (Fornecedor)",
    purpose: "Aprovação inicial",
    description:
      "Solicitação de aprovação dos documentos iniciais do projeto para dar continuidade às próximas etapas.",
    priority: "Alta",
    status: "Pendente",
    requestDate: "10/05/2025",
    expectedReturn: "15/05/2025",
    requesterContact: "João Silva - joao@empresaabc.com",
    targetContact: "Carlos Mendes - carlos@construtoraXYZ.com",
    documents: [
      { id: 1, code: "DOC-001", name: "Planta Baixa - Térreo", revision: "Rev. 2" },
      { id: 2, code: "DOC-002", name: "Memorial Descritivo", revision: "Rev. 1" },
      { id: 3, code: "DOC-004", name: "Cronograma Executivo", revision: "Rev. 1" },
    ],
    justification: "Necessário para dar continuidade ao cronograma do projeto e evitar atrasos na execução.",
    specialInstructions: "Verificar especialmente as cotas da planta baixa e os prazos do cronograma.",
  }

  const handleApprove = async () => {
    setIsProcessing(true)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    navigate(`/requests/${params.id}/generate-grd`)
  }

  const handleReject = async () => {
    setIsProcessing(true)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    navigate("/requests")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendente":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Aprovada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Rejeitada":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgente":
        return "destructive"
      case "Alta":
        return "default"
      case "Normal":
        return "secondary"
      case "Baixa":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/requests" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <PageHeader title={`Solicitação ${request.requestNumber}`} description="Detalhes da solicitação">
            <Link to="/requests">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="grid gap-6">
            <Card className="neon-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    Informações Gerais
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(request.priority)}>{request.priority}</Badge>
                    <Badge variant="outline">{request.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Projeto</Label>
                    <p className="font-medium">{request.project}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Propósito</Label>
                    <p className="font-medium">{request.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Data da Solicitação</Label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {request.requestDate}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Retorno Esperado</Label>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {request.expectedReturn}
                    </p>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Descrição</Label>
                  <p className="mt-1">{request.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Origem e Destino
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Solicitante</Label>
                    <p className="font-medium">{request.origin}</p>
                    <p className="text-sm text-muted-foreground">{request.requesterContact}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Destinatário</Label>
                    <p className="font-medium">{request.destination}</p>
                    <p className="text-sm text-muted-foreground">{request.targetContact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documentos ({request.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <p className="font-medium">
                          {doc.code} - {doc.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{doc.revision}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Visualizar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Detalhes Adicionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Justificativa</Label>
                  <p className="mt-1">{request.justification}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Instruções Especiais</Label>
                  <p className="mt-1">{request.specialInstructions}</p>
                </div>
              </CardContent>
            </Card>

            {request.status === "Pendente" && (
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle>Processamento da Solicitação</CardTitle>
                  <CardDescription>Analise a solicitação e tome uma decisão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comments">Comentários (opcional)</Label>
                    <Textarea
                      id="comments"
                      placeholder="Adicione comentários sobre a análise da solicitação..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button variant="destructive" onClick={handleReject} disabled={isProcessing}>
                      <XCircle className="mr-2 h-4 w-4" />
                      {isProcessing ? "Processando..." : "Rejeitar"}
                    </Button>
                    <Button onClick={handleApprove} disabled={isProcessing} className="neon-border">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {isProcessing ? "Processando..." : "Aprovar e Gerar GRD"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
