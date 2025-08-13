import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRightLeft } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function NewRoutingPage() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState([
    { id: 1, code: "DOC-001", name: "Planta Baixa - Térreo", checked: false },
    { id: 2, code: "DOC-002", name: "Memorial Descritivo", checked: false },
    { id: 3, code: "DOC-003", name: "Projeto Estrutural", checked: false },
    { id: 4, code: "DOC-004", name: "Cronograma Executivo", checked: false },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    navigate("/documents")
  }

  const toggleDocument = (id: number) => {
    setSelectedDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, checked: !doc.checked } : doc)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <MainNav currentPath="/documents" />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <PageHeader title="Nova Tramitação" description="Crie uma nova tramitação de documentos">
            <Link to="/documents">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
          </PageHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Informações da Tramitação</CardTitle>
                <CardDescription>Dados principais da tramitação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Projeto *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o projeto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="projeto-alpha">Projeto Alpha</SelectItem>
                        <SelectItem value="expansao-sede">Expansão Sede</SelectItem>
                        <SelectItem value="reforma-unidade-3">Reforma Unidade 3</SelectItem>
                        <SelectItem value="projeto-beta">Projeto Beta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grd-number">Número da GRD</Label>
                    <Input id="grd-number" placeholder="Será gerado automaticamente" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purpose">Propósito da Tramitação *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o propósito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aprovacao-inicial">Aprovação Inicial</SelectItem>
                      <SelectItem value="revisao-projeto">Revisão de Projeto</SelectItem>
                      <SelectItem value="entrega-final">Entrega Final</SelectItem>
                      <SelectItem value="validacao-tecnica">Validação Técnica</SelectItem>
                      <SelectItem value="aprovacao-orcamento">Aprovação de Orçamento</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o objetivo desta tramitação..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Origem e Destino</CardTitle>
                <CardDescription>Defina quem está enviando e quem irá receber os documentos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origem *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Quem está enviando" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interno">Interno</SelectItem>
                        <SelectItem value="empresa-abc">Empresa ABC (Cliente)</SelectItem>
                        <SelectItem value="construtora-xyz">Construtora XYZ (Fornecedor)</SelectItem>
                        <SelectItem value="industria-123">Indústria 123 (Cliente)</SelectItem>
                        <SelectItem value="engenharia-abc">Engenharia ABC (Fornecedor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destino *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Quem irá receber" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empresa-abc">Empresa ABC (Cliente)</SelectItem>
                        <SelectItem value="construtora-xyz">Construtora XYZ (Fornecedor)</SelectItem>
                        <SelectItem value="industria-123">Indústria 123 (Cliente)</SelectItem>
                        <SelectItem value="engenharia-abc">Engenharia ABC (Fornecedor)</SelectItem>
                        <SelectItem value="arquitetura-def">Arquitetura DEF (Fornecedor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-origin">Contato na Origem</Label>
                    <Input id="contact-origin" placeholder="Nome do responsável" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-destination">Contato no Destino</Label>
                    <Input id="contact-destination" placeholder="Nome do responsável" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Documentos para Tramitação</CardTitle>
                <CardDescription>Selecione os documentos que serão tramitados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {selectedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`doc-${doc.id}`}
                          checked={doc.checked}
                          onCheckedChange={() => toggleDocument(doc.id)}
                        />
                        <div>
                          <Label htmlFor={`doc-${doc.id}`} className="font-medium">
                            {doc.code} - {doc.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">Projeto Alpha</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Rev. 2</div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedDocuments.filter((doc) => doc.checked).length} documento(s) selecionado(s)
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Prazos e Observações</CardTitle>
                <CardDescription>Defina prazos e adicione observações importantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="send-date">Data de Envio</Label>
                    <Input id="send-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expected-return">Retorno Esperado</Label>
                    <Input id="expected-return" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    placeholder="Instruções especiais, prazos específicos, etc..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/documents">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="neon-border">
                {isLoading ? (
                  "Criando..."
                ) : (
                  <>
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    Criar Tramitação
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
