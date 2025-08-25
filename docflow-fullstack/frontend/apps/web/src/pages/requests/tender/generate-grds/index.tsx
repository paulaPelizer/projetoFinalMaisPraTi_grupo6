import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, CheckCircle, Download, Printer } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter, useSearchParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function GenerateGRDsBatchPage() {
  const router = useNavigate()
  const searchParams = useSearchParams()
  const [isGenerating, setIsGenerating] = useState(false)
  const [grdsGenerated, setGrdsGenerated] = useState(false)
  const [generatedGRDs, setGeneratedGRDs] = useState<any[]>([])

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",").map(Number) || []

    // Simulação de GRDs geradas
    const mockGRDs = [
      {
        id: 1,
        requestNumber: "REQ-2025001",
        grdNumber: "GRD-ABC-XYZ-2025001",
        project: "Projeto Alpha",
        documentsCount: 3,
      },
      {
        id: 4,
        requestNumber: "REQ-2025004",
        grdNumber: "GRD-INT-DEF-2025001",
        project: "Projeto Beta",
        documentsCount: 4,
      },
    ]

    const filtered = mockGRDs.filter((grd) => ids.includes(grd.id))
    setGeneratedGRDs(filtered)
  }, [searchParams])

  const handleGenerateGRDs = async () => {
    setIsGenerating(true)
    // Simular geração das GRDs
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setGrdsGenerated(true)
  }

  const handleFinalize = () => {
    navigate("/requests")
  }

  if (grdsGenerated) {
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
              title="GRDs Geradas com Sucesso"
              description="Todas as Guias de Remessa foram geradas e as solicitações foram concluídas"
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
                    <CardTitle className="text-green-500">GRDs Geradas com Sucesso!</CardTitle>
                  </div>
                  <CardDescription>
                    {generatedGRDs.length} Guia{generatedGRDs.length === 1 ? "" : "s"} de Remessa foram gerada
                    {generatedGRDs.length === 1 ? "" : "s"} e as solicitações foram marcadas como concluídas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedGRDs.map((grd) => (
                      <div key={grd.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg neon-text">{grd.grdNumber}</h3>
                          <Badge variant="default">Gerada</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Solicitação:</strong> {grd.requestNumber}
                          </p>
                          <p>
                            <strong>Projeto:</strong> {grd.project}
                          </p>
                          <p>
                            <strong>Documentos:</strong> {grd.documentsCount}
                          </p>
                          <p>
                            <strong>Data:</strong> {new Date().toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Link to={`/documents/routing/${grd.id}/grd`}>
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Visualizar
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir
                          </Button>
                        </div>
                      </div>
                    ))}
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
            title="Gerar GRDs em Lote"
            description={`Gerar ${generatedGRDs.length} Guia${generatedGRDs.length === 1 ? "" : "s"} de Remessa para as solicitações aprovadas`}
          >
            <Link to="/requests/tender">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>GRDs a serem Geradas</CardTitle>
                <CardDescription>
                  Confirme a geração das Guias de Remessa para as solicitações aprovadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedGRDs.map((grd) => (
                    <div key={grd.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{grd.grdNumber}</h3>
                        <Badge variant="outline">Pendente</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <p>
                          <strong>Solicitação:</strong> {grd.requestNumber}
                        </p>
                        <p>
                          <strong>Projeto:</strong> {grd.project}
                        </p>
                        <p>
                          <strong>Documentos:</strong> {grd.documentsCount}
                        </p>
                        <p>
                          <strong>Data:</strong> {new Date().toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  <strong>Total:</strong> {generatedGRDs.length} GRD{generatedGRDs.length === 1 ? "" : "s"} para gerar
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/requests/tender">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button onClick={handleGenerateGRDs} disabled={isGenerating} className="neon-border">
                <FileText className="mr-2 h-4 w-4" />
                {isGenerating
                  ? "Gerando GRDs..."
                  : `Gerar ${generatedGRDs.length} GRD${generatedGRDs.length === 1 ? "" : "s"}`}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
