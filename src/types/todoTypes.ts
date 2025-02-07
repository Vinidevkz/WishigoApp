export enum Category{
    Work = "Trabalho",
    Scholl = "Escola/Estudos",
    Personal = "Pessoal"
}

export interface Task {
    id: number,
    name: string,
    description: string,
    status: boolean,
    category: Category
}

