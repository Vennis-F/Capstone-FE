export type Character = {
  id: string
  name: string
  role: CharacterRole
  lane: Lane
  description: string
  imgUrl: string
}

export type CharacterFormInput = {
  name: string
  role: CharacterRole
  lane: Lane
  description: string
  imgUrl: string
}

export enum CharacterRole {
  Bruiser = 'Bruiser',
  AP = 'AP',
  Assassin = 'Assassin',
  AD = 'AD Carry',
  SP = 'Support',
  Jung = 'Jungler',
  Tank = 'Tank',
}

export enum Lane {
  Lane = 'Lane',
  Top = 'Top',
  Mid = 'Mid',
  Bot = 'Bot',
  Jung = 'Jung',
}
