import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Printer, Download, CheckCircle } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter, useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function GenerateGRDPage() {
  const router = useNavigate()
  const params = useParams()
  const [isGenerating, setIsGenerating] = useState(false)
  const [grdGenerated, setGrdGenerated] = useState(false)

  // Dados da solicitação e GRD
  const request = {
    id: params.id,
    requestNumber: "REQ-2025001",
    project: "Projeto Alpha",
    origin: "Empresa ABC (Cliente)",
    destination: "Construtora XYZ (Fornecedor)",
    purpose: "Aprovação inicial",
    documents: [
      { id: 1, code: "DOC-001", name: "Planta Baixa - Térreo", revision: "Rev. 2", format: "A1" },
      { id: 2, code: "DOC-002", name: "Memorial Descritivo", revision: "Rev. 1", format: "A4" },
      { id: 3, code: "DOC-004", name: "Cronograma Executivo", revision: "Rev. 1", format: "A4" },
    ],
  }

  const grdData = {
    number: "GRD-ABC-XYZ-2025001",
    date: new Date().toLocaleDateString("pt-BR"),
    protocol: "PROT-2025-001234",
  }

  const handleGenerateGRD = async () => {
    setIsGenerating(true)
    // Simular geração da GRD
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    setGrdGenerated(true)
  }

  const handleFinalize = () => {
    navigate("/requests")
  }

  if (grdGenerated) {
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
              title="GRD Gerada com Sucesso"
              description="A Guia de Remessa foi gerada e a solicitação foi concluída"
            >
              <Link to="/requests">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Solicitações
                </Button>
              </Link>
            </PageHeader>

            <div className="space-y-6">
              <Card className="neon-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <CardTitle className="text-green-500">GRD Gerada com Sucesso!</CardTitle>
                  </div>
                  <CardDescription>
                    A Guia de Remessa de Documentação foi gerada e a solicitação {request.requestNumber} foi marcada
                    como concluída.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Número da GRD</Label>
                      <p className="font-bold text-lg neon-text">{grdData.number}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Data de Geração</Label>
                      <p className="font-medium">{grdData.date}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Protocolo</Label>
                      <p className="font-medium">{grdData.protocol}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-4">
                    <Link to={`/documents/routing/${params.id}/grd`}>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Visualizar GRD
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exportar PDF
                    </Button>
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimir
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button onClick={handleFinalize} className="neon-border">
                  Finalizar e Voltar para Solicitações
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
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
            title="Gerar GRD"
            description="Gere a Guia de Remessa de Documentação para a solicitação aprovada"
          >
            <Link to={`/requests/${params.id}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Dados da Solicitação</CardTitle>
                <CardDescription>Informações da solicitação aprovada</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Número da Solicitação</Label>
                    <p className="font-medium">{request.requestNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Projeto</Label>
                    <p className="font-medium">{request.project}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Origem</Label>
                    <p className="font-medium">{request.origin}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Destino</Label>
                    <p className="font-medium">{request.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Dados da GRD</CardTitle>
                <CardDescription>Informações que serão incluídas na Guia de Remessa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grd-number">Número da GRD</Label>
                    <Input id="grd-number" value={grdData.number} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grd-date">Data de Emissão</Label>
                    <Input id="grd-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="protocol">Protocolo</Label>
                    <Input id="protocol" value={grdData.protocol} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-method">Método de Entrega</Label>
                    <Input id="delivery-method" placeholder="Ex: Correios, Entrega Pessoal" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    placeholder="Observações adicionais para a GRD..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Documentos Incluídos</CardTitle>
                <CardDescription>Lista de documentos que serão tramitados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {request.documents.map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-medium">
                            {doc.code} - {doc.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {doc.revision} • Formato: {doc.format}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Incluído</Badge>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  <strong>Total de documentos:</strong> {request.documents.length}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to={`/requests/${params.id}`}>
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button onClick={handleGenerateGRD} disabled={isGenerating} className="neon-border">
                <FileText className="mr-2 h-4 w-4" />
                {isGenerating ? "Gerando GRD..." : "Gerar GRD"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
