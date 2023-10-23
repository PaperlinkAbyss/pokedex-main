//Base API call interface for starter state and ts type infer.

export type Sprites = {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other: Record<string, unknown>
}
export type Stats = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}[]
export type Types = {
  slot: number
  type: {
    name: string
    url: string
  }
}[]
export type Abilities = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}[]
export type ID = number
