export type Educator = { id: string; name: string; color: string }
export type Gap = { id: string; label: string }
export type HistoryNote = { id: string; when: string; text: string }
export type Session = {
  id: string
  familyId: string
  educatorId: string
  time: string
  dateLabel: string
  note: string
  noteInFile: boolean
  noteLocalOnly: boolean
  pautas: string
}
export type Family = {
  id: string
  dog: string
  human: string
  phone: string
  gaps: Gap[]
  history: HistoryNote[]
}

export const educators: Educator[] = [
  { id: 'marta', name: 'Marta', color: '#2f6f4e' },
  { id: 'luis', name: 'Luis', color: '#3d5a80' },
  { id: 'sofia', name: 'Sofía', color: '#7a5c3e' },
]

export const meId = 'marta'

export function seedFamilies(): Family[] {
  return [
    {
      id: 'luna',
      dog: 'Luna',
      human: 'Ana Ruiz',
      phone: '612 440 118',
      gaps: [{ id: 'salud', label: 'Historial de salud' }, { id: 'react', label: 'Reactividades' }],
      history: [],
    },
    {
      id: 'kira',
      dog: 'Kira',
      human: 'Pablo Méndez',
      phone: '655 902 441',
      gaps: [],
      history: [{ id: 'k1', when: 'Ayer', text: 'Mejoró el encuentro con otros perros en el parque.' }],
    },
    {
      id: 'nala',
      dog: 'Nala',
      human: 'Elena Soto',
      phone: '',
      gaps: [{ id: 'tel', label: 'Teléfono' }, { id: 'salud', label: 'Historial de salud' }],
      history: [],
    },
  ]
}

export function seedSessions(): Session[] {
  return [
    {
      id: 's-luna-hoy',
      familyId: 'luna',
      educatorId: 'marta',
      time: '18:00',
      dateLabel: 'Hoy',
      note: '',
      noteInFile: false,
      noteLocalOnly: false,
      pautas: '',
    },
    {
      id: 's-kira-hoy',
      familyId: 'kira',
      educatorId: 'luis',
      time: '17:00',
      dateLabel: 'Hoy',
      note: 'Mejoró el encuentro con otros perros en el parque.',
      noteInFile: true,
      noteLocalOnly: false,
      pautas: '',
    },
    {
      id: 's-nala-hoy',
      familyId: 'nala',
      educatorId: 'sofia',
      time: '19:30',
      dateLabel: 'Hoy',
      note: '',
      noteInFile: false,
      noteLocalOnly: false,
      pautas: '',
    },
  ]
}
