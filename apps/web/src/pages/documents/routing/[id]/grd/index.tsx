import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Printer, FileText, Building, Calendar, User } from "lucide-react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function GRDViewPage() {
  const params = useParams()

  // Dados simulados da GRD
  const grd = {
    number: "GRD-ABC-XYZ-2025001",
    date: "10/05/2025",
    protocol: "PROT-2025-001234",
    project: "Projeto Alpha",
    origin: {
      name: "Empresa ABC",
      type: "Cliente",
      contact: "João Silva",
      email: "joao@empresaabc.com",
      phone: "(11) 9999-9999",
      address: "Rua das Empresas, 123 - Centro - São Paulo/SP",
    },
    destination: {
      name: "Construtora XYZ",
      type: "Fornecedor",
      contact: "Carlos Mendes",
      email: "carlos@construtoraXYZ.com",
      phone: "(11) 5555-5555",
      address: "Av. das Construções, 456 - Industrial - São Paulo/SP",
    },
    purpose: "Aprovação inicial dos documentos do projeto",
    deliveryMethod: "Entrega Pessoal",
    documents: [
      { id: 1, code: "DOC-001", name: "Planta Baixa - Térreo", revision: "Rev. 2", format: "A1", pages: 1 },
      { id: 2, code: "DOC-002", name: "Memorial Descritivo", revision: "Rev. 1", format: "A4", pages: 15 },
      { id: 3, code: "DOC-004", name: "Cronograma Executivo", revision: "Rev. 1", format: "A4", pages: 3 },
    ],
    observations: "Documentos para aprovação inicial. Prazo de retorno: 5 dias úteis.",
    status: "Emitida",
    emittedBy: "Sistema DocFlow",
    emissionDate: "10/05/2025 14:30",
  }

  const totalPages = grd.documents.reduce((sum, doc) => sum + doc.pages, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/grds" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <PageHeader title={`GRD ${grd.number}`} description="Guia de Remessa de Documentação">
            <Link to="/grds">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <div className="space-y-6">
            {/* Cabeçalho da GRD */}
            <Card className="neon-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl neon-text">GUIA DE REMESSA DE DOCUMENTAÇÃO</CardTitle>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge variant="default" className="text-lg px-4 py-2">
                    {grd.number}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    {grd.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Emissão</p>
                    <p className="font-bold flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {grd.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Protocolo</p>
                    <p className="font-bold">{grd.protocol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projeto</p>
                    <p className="font-bold">{grd.project}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Origem e Destino */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="neon-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    REMETENTE
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-bold text-lg">{grd.origin.name}</p>
                    <Badge variant="outline">{grd.origin.type}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <strong>Contato:</strong> {grd.origin.contact}
                    </p>
                    <p className="text-sm text-muted-foreground">Email: {grd.origin.email}</p>
                    <p className="text-sm text-muted-foreground">Telefone: {grd.origin.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      <strong>Endereço:</strong>
                      <br />
                      {grd.origin.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="neon-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    DESTINATÁRIO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-bold text-lg">{grd.destination.name}</p>
                    <Badge variant="outline">{grd.destination.type}</Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <strong>Contato:</strong> {grd.destination.contact}
                    </p>
                    <p className="text-sm text-muted-foreground">Email: {grd.destination.email}</p>
                    <p className="text-sm text-muted-foreground">Telefone: {grd.destination.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      <strong>Endereço:</strong>
                      <br />
                      {grd.destination.address}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detalhes da Remessa */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>DETALHES DA REMESSA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Propósito</p>
                    <p className="font-medium">{grd.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Método de Entrega</p>
                    <p className="font-medium">{grd.deliveryMethod}</p>
                  </div>
                </div>
                {grd.observations && (
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="font-medium">{grd.observations}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lista de Documentos */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  DOCUMENTOS TRAMITADOS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grd.documents.map((doc, index) => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </Badge>
                        <div>
                          <p className="font-medium">
                            {doc.code} - {doc.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {doc.revision} • Formato: {doc.format} • {doc.pages} página{doc.pages > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Incluído</Badge>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-sm">
                  <span>
                    <strong>Total de documentos:</strong> {grd.documents.length}
                  </span>
                  <span>
                    <strong>Total de páginas:</strong> {totalPages}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Assinaturas */}
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>ASSINATURA DO REMETENTE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">REMETENTE</p>
                    <div className="border-b border-muted-foreground mt-8 mb-2"></div>
                    <p className="text-sm text-muted-foreground">Assinatura e Data</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rodapé */}
            <Card className="neon-border">
              <CardContent className="pt-6">
                <div className="text-center text-sm text-muted-foreground space-y-1">
                  <p>Emitido por: {grd.emittedBy}</p>
                  <p>Data/Hora de Emissão: {grd.emissionDate}</p>
                  <p className="font-medium">DocFlow - Sistema de Gestão de Documentos Técnicos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
