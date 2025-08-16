import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter, useSearchParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function TenderRequestsPage() {
  const router = useNavigate()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [comments, setComments] = useState("")
  const [selectedRequests, setSelectedRequests] = useState<any[]>([])

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",").map(Number) || []

    // Simulação de dados das solicitações selecionadas
    const mockRequests = [
      {
        id: 1,
        requestNumber: "REQ-2025001",
        project: "Projeto Alpha",
        origin: "Empresa ABC (Cliente)",
        destination: "Construtora XYZ (Fornecedor)",
        purpose: "Aprovação inicial",
        documentsCount: 3,
        status: "Pendente",
      },
      {
        id: 4,
        requestNumber: "REQ-2025004",
        project: "Projeto Beta",
        origin: "Interno",
        destination: "Empresa DEF (Cliente)",
        purpose: "Envio de documentação técnica",
        documentsCount: 4,
        status: "Pendente",
      },
    ]

    const filtered = mockRequests.filter((req) => ids.includes(req.id))
    setSelectedRequests(filtered)
  }, [searchParams])

  const handleApproveAll = async () => {
    setIsProcessing(true)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)

    // Redirecionar para geração de GRDs em lote
    const ids = selectedRequests.map((req) => req.id).join(",")
    navigate(`/requests/tender/generate-grds?ids=${ids}`)
  }

  const handleRejectAll = async () => {
    setIsProcessing(true)
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(false)
    navigate("/requests")
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
          <PageHeader
            title="Tender Solicitações"
            description={`Processar ${selectedRequests.length} solicitação${selectedRequests.length === 1 ? "" : "ões"} selecionada${selectedRequests.length === 1 ? "" : "s"}`}
          >
            <Link to="/requests">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Solicitações Selecionadas</CardTitle>
                <CardDescription>Revise as solicitações que serão processadas em lote</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{request.requestNumber}</h3>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <p>
                          <strong>Projeto:</strong> {request.project}
                        </p>
                        <p>
                          <strong>Documentos:</strong> {request.documentsCount}
                        </p>
                        <p>
                          <strong>Origem:</strong> {request.origin}
                        </p>
                        <p>
                          <strong>Destino:</strong> {request.destination}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong>Propósito:</strong> {request.purpose}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  <strong>Total:</strong> {selectedRequests.length} solicitação
                  {selectedRequests.length === 1 ? "" : "ões"} para processar
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Processamento em Lote</CardTitle>
                <CardDescription>Analise e tome uma decisão para todas as solicitações selecionadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="batch-comments">Comentários (aplicado a todas as solicitações)</Label>
                  <Textarea
                    id="batch-comments"
                    placeholder="Adicione comentários sobre a análise das solicitações..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Ações disponíveis:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <strong>Aprovar Todas:</strong> Aprovará todas as solicitações e permitirá gerar GRDs em lote
                    </li>
                    <li>
                      • <strong>Rejeitar Todas:</strong> Rejeitará todas as solicitações com o comentário fornecido
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4 justify-end pt-4">
                  <Button variant="destructive" onClick={handleRejectAll} disabled={isProcessing}>
                    <XCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processando..." : "Rejeitar Todas"}
                  </Button>
                  <Button onClick={handleApproveAll} disabled={isProcessing} className="neon-border">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processando..." : "Aprovar Todas e Gerar GRDs"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
