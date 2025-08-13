import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Link } from 'react-router-dom'
import { useRouter } from "react-router-dom"
import { MainNav } from "@/components/main-nav"
import { PageHeader } from "@/components/page-header"

export default function NewDocumentPage() {
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    navigate("/documents")
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
          <PageHeader title="Novo Documento" description="Cadastre um novo documento no sistema">
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
                <CardTitle>Informações do Documento</CardTitle>
                <CardDescription>Dados principais do documento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código do Documento *</Label>
                    <Input id="code" placeholder="Ex: DOC-001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revision">Revisão</Label>
                    <Input id="revision" placeholder="Ex: Rev. 1" defaultValue="Rev. 0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Documento *</Label>
                  <Input id="name" placeholder="Ex: Planta Baixa - Térreo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" placeholder="Descreva o documento..." className="min-h-[80px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Label htmlFor="type">Tipo de Documento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planta-baixa">Planta Baixa</SelectItem>
                        <SelectItem value="memorial-descritivo">Memorial Descritivo</SelectItem>
                        <SelectItem value="cronograma">Cronograma</SelectItem>
                        <SelectItem value="orcamento">Orçamento</SelectItem>
                        <SelectItem value="projeto-estrutural">Projeto Estrutural</SelectItem>
                        <SelectItem value="projeto-hidraulico">Projeto Hidráulico</SelectItem>
                        <SelectItem value="projeto-eletrico">Projeto Elétrico</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Formato</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a0">A0</SelectItem>
                        <SelectItem value="a1">A1</SelectItem>
                        <SelectItem value="a2">A2</SelectItem>
                        <SelectItem value="a3">A3</SelectItem>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="digital">Digital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Responsabilidade</CardTitle>
                <CardDescription>Defina quem é responsável pelo documento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsible">Responsável Técnico</Label>
                    <Input id="responsible" placeholder="Nome do responsável" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Fornecedor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construtora-xyz">Construtora XYZ</SelectItem>
                        <SelectItem value="engenharia-abc">Engenharia ABC</SelectItem>
                        <SelectItem value="arquitetura-def">Arquitetura DEF</SelectItem>
                        <SelectItem value="consultoria-123">Consultoria 123</SelectItem>
                        <SelectItem value="interno">Interno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="creation-date">Data de Criação</Label>
                    <Input id="creation-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Prazo de Entrega</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Upload de Arquivo</CardTitle>
                <CardDescription>Faça upload do arquivo do documento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Arraste e solte o arquivo aqui</h3>
                    <p className="text-sm text-muted-foreground mb-4">ou clique para selecionar um arquivo</p>
                    <Button variant="outline">Selecionar Arquivo</Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Formatos aceitos: PDF, DWG, DXF, JPG, PNG</p>
                  <p>Tamanho máximo: 50MB</p>
                </div>
              </CardContent>
            </Card>

            <Card className="neon-border">
              <CardHeader>
                <CardTitle>Status e Localização</CardTitle>
                <CardDescription>Defina o status inicial e localização do documento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status Inicial</Label>
                    <Select defaultValue="em-elaboracao">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="em-elaboracao">Em Elaboração</SelectItem>
                        <SelectItem value="em-revisao">Em Revisão</SelectItem>
                        <SelectItem value="aguardando-aprovacao">Aguardando Aprovação</SelectItem>
                        <SelectItem value="aprovado">Aprovado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização Atual</Label>
                    <Select defaultValue="interno">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interno">Interno</SelectItem>
                        <SelectItem value="cliente">Cliente</SelectItem>
                        <SelectItem value="fornecedor">Fornecedor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" placeholder="Observações sobre o documento..." className="min-h-[80px]" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/documents">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="neon-border">
                {isLoading ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Cadastrar Documento
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
