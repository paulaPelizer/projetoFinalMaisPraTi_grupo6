export interface Document {
  id: number
  name: string
  dueDate: string
}

export interface Disciplina {
  id: number
  name: string
  documents: Document[]
  destinatarios: {
    cliente: number[]
    fornecedor: number[]
    interno: number[]
  }
}

export interface Milestone {
  id: number
  name: string
  description: string
  dueDate: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface ProjectData {
  name: string
  code: string
  description: string
  client: string
  status: string
  startDate: string
  endDate: string
}
