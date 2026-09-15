import { useMemo, useState, type ReactNode } from 'react'
import { CalendarDays, CheckCircle2, CloudOff, Copy, FileText, PawPrint, Search, WifiOff } from 'lucide-react'
import { educators, meId, seedFamilies, seedSessions, type Family, type Session } from './mocks/data.ts'

type ProductScreen = 'day' | 'search' | 'ficha' | 'session'
type DayMode = 'mine' | 'team'
type SessionMode = 'capture' | 'write'

type ScenarioId = 'sitio' | 'hueco' | 'pautas' | 'nace' | 'explore'

const scenarios: { id: ScenarioId; title: string; start: string; outcome: string }[] = [
  { id: 'sitio', title: 'Al terminar en el sitio', start: 'Mi día → sesión de Luna, captura mínima.', outcome: 'La nota queda en la ficha, no en el papel.' },
  { id: 'hueco', title: 'Cazar a Luna y ver el hueco', start: 'Buscar familia.', outcome: 'La ficha enseña lo que falta.' },
  { id: 'pautas', title: 'Una redacción, dos canales', start: 'Sesión de Luna en redacción.', outcome: 'Un texto; copiar a WhatsApp o PDF.' },
  { id: 'nace', title: 'La próxima clase nace en la ficha', start: 'Ficha de Luna.', outcome: 'La sesión nueva aparece en Mi día.' },
  { id: 'explore', title: 'Explorar libre', start: 'Mi día.', outcome: 'Navegación del producto sin semilla.' },
]

function educator(id: string) {
  return educators.find((e) => e.id === id) ?? educators[0]
}

function familyOf(families: Family[], id: string) {
  return families.find((f) => f.id === id)
}

export default function App() {
  const [demo, setDemo] = useState(true)
  const [scenario, setScenario] = useState<ScenarioId>('sitio')
  const [screen, setScreen] = useState<ProductScreen>('day')
  const [dayMode, setDayMode] = useState<DayMode>('mine')
  const [sessionMode, setSessionMode] = useState<SessionMode>('capture')
  const [familyId, setFamilyId] = useState('luna')
  const [sessionId, setSessionId] = useState('s-luna-hoy')
  const [families, setFamilies] = useState(seedFamilies)
  const [sessions, setSessions] = useState(seedSessions)
  const [query, setQuery] = useState('')
  const [offline, setOffline] = useState(false)
  const [toast, setToast] = useState('')
  const [newWhen, setNewWhen] = useState('Mañana 10:00')
  const [dialog, setDialog] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [newDog, setNewDog] = useState('')
  const [newHuman, setNewHuman] = useState('')

  const family = familyOf(families, familyId)
  const session = sessions.find((s) => s.id === sessionId)
  const hideChrome = screen === 'session' && sessionMode === 'capture'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return families
    return families.filter((f) => f.dog.toLowerCase().includes(q) || f.human.toLowerCase().includes(q))
  }, [families, query])

  const visibleSessions = sessions.filter((s) => (dayMode === 'mine' ? s.educatorId === meId : true))

  function notify(text: string) {
    setToast(text)
  }

  function boot(id: ScenarioId) {
    setScenario(id)
    setFamilies(seedFamilies())
    setSessions(seedSessions())
    setQuery('')
    setToast('')
    setOffline(id === 'sitio')
    setDialog(false)
    setCreateOpen(false)
    setDayMode('mine')
    if (id === 'sitio') {
      setScreen('day')
      setFamilyId('luna')
      setSessionId('s-luna-hoy')
      setSessionMode('capture')
    } else if (id === 'hueco') {
      setScreen('search')
      setFamilyId('luna')
      setSessionMode('write')
    } else if (id === 'pautas') {
      setFamilyId('luna')
      setSessionId('s-luna-hoy')
      setSessions((prev) =>
        prev.map((s) =>
          s.id === 's-luna-hoy'
            ? { ...s, note: 'Se tensó un momento en la correa al cruzar otra pareja.', noteInFile: true, pautas: '' }
            : s,
        ),
      )
      setFamilies((prev) =>
        prev.map((f) =>
          f.id === 'luna'
            ? { ...f, history: [{ id: 'n1', when: 'Hoy 18:00', text: 'Se tensó un momento en la correa al cruzar otra pareja.' }] }
            : f,
        ),
      )
      setScreen('session')
      setSessionMode('write')
    } else if (id === 'nace') {
      setScreen('ficha')
      setFamilyId('luna')
      setSessionMode('write')
    } else {
      setScreen('day')
      setSessionMode('write')
    }
    setDemo(false)
  }

  function openSession(s: Session, mode: SessionMode) {
    setSessionId(s.id)
    setFamilyId(s.familyId)
    setSessionMode(mode)
    setScreen('session')
  }

  function saveNote() {
    if (!session) return
    const text = session.note.trim()
    if (!text) {
      notify('Escribe algo antes de guardar. El papel no espera un campo vacío.')
      return
    }
    const localOnly = offline
    setSessions((prev) =>
      prev.map((s) =>
        s.id === session.id ? { ...s, noteInFile: !localOnly, noteLocalOnly: localOnly } : s,
      ),
    )
    if (!localOnly) {
      setFamilies((prev) =>
        prev.map((f) =>
          f.id === session.familyId
            ? {
                ...f,
                history: [{ id: `h-${Date.now()}`, when: `${session.dateLabel} ${session.time}`, text }, ...f.history],
              }
            : f,
        ),
      )
      notify(`Ya está en la ficha de ${family?.dog ?? 'esta familia'}.`)
    } else {
      notify('Guardado en este dispositivo. Aún no está en los otros ordenadores.')
    }
  }

  function savePautas() {
    if (!session?.pautas.trim()) {
      notify('Redacta las pautas una vez; luego eliges el canal.')
      return
    }
    notify('Pautas guardadas en esta sesión. Ahora puedes copiar o sacar PDF.')
  }

  async function copyWhatsapp() {
    const text = session?.pautas.trim()
    if (!text) {
      notify('No hay texto que copiar.')
      return
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* prototype */
    }
    notify('Texto copiado — pégalo en WhatsApp. No fingimos “enviado”.')
  }

  function fakePdf() {
    if (!session?.pautas.trim()) {
      notify('No hay texto para el PDF.')
      return
    }
    notify('PDF con membrete listo (simulado). Mismo texto, otro canal.')
  }

  function fillGap(gapId: string) {
    setFamilies((prev) =>
      prev.map((f) => (f.id === familyId ? { ...f, gaps: f.gaps.filter((g) => g.id !== gapId) } : f)),
    )
    notify('Hueco actualizado. La ficha ya no finge estar completa: simplemente tiene un dato más.')
  }

  function createSession() {
    const id = `s-new-${Date.now()}`
    const next: Session = {
      id,
      familyId,
      educatorId: meId,
      time: newWhen.includes('10') ? '10:00' : '11:00',
      dateLabel: 'Mañana',
      note: '',
      noteInFile: false,
      noteLocalOnly: false,
      pautas: '',
    }
    setSessions((prev) => [...prev, next])
    setSessionId(id)
    setDialog(false)
    notify('Sesión creada desde la ficha. Ya aparece en Mi día.')
    setScreen('day')
  }

  function createFamily() {
    if (!newDog.trim() || !newHuman.trim()) {
      notify('Mínimo: nombre del perro y del humano.')
      return
    }
    const id = `f-${Date.now()}`
    const created: Family = {
      id,
      dog: newDog.trim(),
      human: newHuman.trim(),
      phone: '',
      gaps: [
        { id: 'tel', label: 'Teléfono' },
        { id: 'salud', label: 'Historial de salud' },
      ],
      history: [],
    }
    setFamilies((prev) => [created, ...prev])
    setFamilyId(id)
    setCreateOpen(false)
    setNewDog('')
    setNewHuman('')
    setScreen('ficha')
    notify('Familia mínima creada. Casi todo es un hueco, a propósito.')
  }

  if (demo) {
    return (
      <div className="min-h-screen bg-[var(--background-default)] p-6 md:p-10">
        <p className="text-sm font-semibold tracking-wide text-[var(--foreground-muted)]">Vínculo Animal · demo</p>
        <h1 className="mt-2 max-w-xl text-3xl font-bold">Elige un escenario. No empieces por una pantalla suelta.</h1>
        <p className="mt-3 max-w-xl text-[var(--foreground-muted)]">
          Cada uno enseña una consecuencia: la nota entra en la ficha, el hueco se ve, las pautas se redactan una vez, o la sesión nace en la familia.
        </p>
        <ul className="mt-8 grid max-w-3xl gap-3">
          {scenarios.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => boot(s.id)}
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--background-subtle)] p-4 text-left hover:border-[var(--border-strong)]"
              >
                <strong className="block text-lg">{s.title}</strong>
                <span className="mt-1 block text-sm text-[var(--foreground-muted)]">Empieza: {s.start}</span>
                <span className="mt-1 block text-sm">Salida: {s.outcome}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      {!hideChrome && (
        <aside className="hidden border-r border-[var(--border-default)] bg-[var(--background-muted)] p-4 md:block">
          <div className="mb-6 flex items-center gap-2 px-1">
            <span className="rounded-lg bg-[var(--action-primary)] p-2 text-white">
              <PawPrint size={18} aria-hidden />
            </span>
            <div>
              <strong className="block">Vínculo Animal</strong>
              <span className="text-xs text-[var(--foreground-muted)]">CRM de clase</span>
            </div>
          </div>
          <nav aria-label="Principal" className="space-y-1">
            <NavBtn active={screen === 'day'} onClick={() => setScreen('day')} icon={<CalendarDays size={16} />}>
              Mi día
            </NavBtn>
            <NavBtn active={screen === 'search' || screen === 'ficha'} onClick={() => setScreen('search')} icon={<Search size={16} />}>
              Familias
            </NavBtn>
          </nav>
          <button
            onClick={() => setDemo(true)}
            className="mt-8 w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--foreground-muted)] hover:bg-[var(--background-subtle)]"
          >
            Cambiar escenario
          </button>
        </aside>
      )}

      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-default)] bg-[var(--background-subtle)] px-4 py-2 text-sm">
          <span className="text-[var(--foreground-muted)]">{scenarios.find((s) => s.id === scenario)?.title}</span>
          {scenario === 'sitio' && (
            <button
              onClick={() => setOffline((v) => !v)}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--border-default)] px-2 py-1"
            >
              {offline ? <WifiOff size={14} /> : <CloudOff size={14} />}
              {offline ? 'Sin red (simulado)' : 'Con red'}
            </button>
          )}
        </div>

        <main className={`flex-1 p-4 ${hideChrome ? 'md:p-6' : 'md:p-7'}`}>
          {screen === 'day' && (
            <DayScreen
              sessions={visibleSessions}
              families={families}
              mode={dayMode}
              onMode={setDayMode}
              onOpen={(s) => openSession(s, s.familyId === 'luna' && s.educatorId === meId ? 'capture' : 'write')}
              onSearch={() => setScreen('search')}
            />
          )}
          {screen === 'search' && (
            <SearchScreen
              query={query}
              onQuery={setQuery}
              families={filtered}
              onOpen={(id) => {
                setFamilyId(id)
                setScreen('ficha')
              }}
              onCreate={() => setCreateOpen(true)}
            />
          )}
          {screen === 'ficha' && family && (
            <FichaScreen
              family={family}
              sessions={sessions.filter((s) => s.familyId === family.id)}
              onFillGap={fillGap}
              onOpenSession={(s) => openSession(s, 'write')}
              onNew={() => setDialog(true)}
            />
          )}
          {screen === 'session' && session && family && (
            <SessionScreen
              family={family}
              session={session}
              mode={sessionMode}
              onMode={setSessionMode}
              onNote={(text) =>
                setSessions((prev) => prev.map((s) => (s.id === session.id ? { ...s, note: text } : s)))
              }
              onPautas={(text) =>
                setSessions((prev) => prev.map((s) => (s.id === session.id ? { ...s, pautas: text } : s)))
              }
              onSaveNote={saveNote}
              onSavePautas={savePautas}
              onCopy={copyWhatsapp}
              onPdf={fakePdf}
              onBack={() => setScreen(sessionMode === 'capture' ? 'day' : 'ficha')}
            />
          )}
        </main>

        {!hideChrome && (
          <nav className="grid grid-cols-2 border-t border-[var(--border-default)] bg-[var(--background-subtle)] md:hidden" aria-label="Principal">
            <button className="py-3" onClick={() => setScreen('day')}>
              Día
            </button>
            <button className="py-3" onClick={() => setScreen('search')}>
              Familias
            </button>
          </nav>
        )}
      </div>

      {toast && (
        <div role="status" className="fixed bottom-20 left-4 right-4 z-20 flex gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--background-subtle)] p-3 shadow-lg md:bottom-6 md:left-auto md:right-6 md:w-[380px]">
          <CheckCircle2 className="shrink-0 text-[var(--status-success)]" aria-hidden />
          <p className="text-sm">{toast}</p>
        </div>
      )}

      {dialog && (
        <dialog open className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4">
          <form
            className="w-full max-w-md rounded-xl bg-[var(--background-subtle)] p-5"
            onSubmit={(e) => {
              e.preventDefault()
              createSession()
            }}
          >
            <h2 className="text-lg font-bold">Nueva sesión desde la ficha</h2>
            <label className="mt-4 block text-sm font-medium" htmlFor="when">
              Cuándo
            </label>
            <input
              id="when"
              value={newWhen}
              onChange={(e) => setNewWhen(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--border-default)] px-3 py-2"
            />
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">Educador: Marta (tú). El calendario es una vista, no el origen.</p>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="rounded-lg bg-[var(--action-primary)] px-4 py-2 font-semibold text-white">
                Crear sesión
              </button>
              <button type="button" className="rounded-lg bg-[var(--action-secondary)] px-4 py-2" onClick={() => setDialog(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}

      {createOpen && (
        <dialog open className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 p-4">
          <form
            className="w-full max-w-md rounded-xl bg-[var(--background-subtle)] p-5"
            onSubmit={(e) => {
              e.preventDefault()
              createFamily()
            }}
          >
            <h2 className="text-lg font-bold">Familia mínima</h2>
            <label className="mt-4 block text-sm font-medium" htmlFor="dog">
              Perro
            </label>
            <input id="dog" value={newDog} onChange={(e) => setNewDog(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--border-default)] px-3 py-2" />
            <label className="mt-3 block text-sm font-medium" htmlFor="human">
              Humano responsable
            </label>
            <input id="human" value={newHuman} onChange={(e) => setNewHuman(e.target.value)} className="mt-1 w-full rounded-lg border border-[var(--border-default)] px-3 py-2" />
            <div className="mt-4 flex gap-2">
              <button type="submit" className="rounded-lg bg-[var(--action-primary)] px-4 py-2 font-semibold text-white">
                Crear
              </button>
              <button type="button" className="rounded-lg bg-[var(--action-secondary)] px-4 py-2" onClick={() => setCreateOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  )
}

function NavBtn({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${active ? 'bg-[var(--background-subtle)] font-semibold text-[var(--action-primary)]' : 'hover:bg-[var(--background-subtle)]'}`}
    >
      {icon}
      {children}
    </button>
  )
}

function DayScreen({
  sessions,
  families,
  mode,
  onMode,
  onOpen,
  onSearch,
}: {
  sessions: Session[]
  families: Family[]
  mode: DayMode
  onMode: (m: DayMode) => void
  onOpen: (s: Session) => void
  onSearch: () => void
}) {
  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--foreground-muted)]">Hoy</p>
          <h1 className="text-2xl font-bold">Martes 15 sep</h1>
        </div>
        <div className="flex rounded-lg bg-[var(--background-muted)] p-1" role="tablist" aria-label="Vista del día">
          <button role="tab" aria-selected={mode === 'mine'} className={`rounded-md px-3 py-1.5 text-sm ${mode === 'mine' ? 'bg-[var(--background-subtle)] font-semibold' : ''}`} onClick={() => onMode('mine')}>
            Mis sesiones
          </button>
          <button role="tab" aria-selected={mode === 'team'} className={`rounded-md px-3 py-1.5 text-sm ${mode === 'team' ? 'bg-[var(--background-subtle)] font-semibold' : ''}`} onClick={() => onMode('team')}>
            Equipo
          </button>
        </div>
      </div>
      {sessions.length === 0 ? (
        <div className="mt-8 rounded-xl border border-[var(--border-default)] p-6">
          <p>No hay clases hoy.</p>
          <button onClick={onSearch} className="mt-3 rounded-lg bg-[var(--action-secondary)] px-4 py-2">
            Buscar familia
          </button>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {sessions.map((s) => {
            const f = familyOf(families, s.familyId)
            const ed = educator(s.educatorId)
            const now = s.id === 's-luna-hoy' && s.educatorId === meId
            return (
              <li key={s.id}>
                <button
                  onClick={() => onOpen(s)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left ${now ? 'border-[var(--border-focus)] bg-[var(--background-subtle)]' : 'border-[var(--border-default)] bg-[var(--background-subtle)]'}`}
                >
                  <span>
                    <strong className="block">
                      {s.dateLabel} {s.time} · {f?.dog}
                    </strong>
                    <span className="text-sm text-[var(--foreground-muted)]">{f?.human}</span>
                    {now && <span className="mt-1 block text-sm font-semibold">Ahora — captura en el sitio</span>}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm">
                    <span className="size-2.5 rounded-full" style={{ background: ed.color }} aria-hidden />
                    {ed.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function SearchScreen({
  query,
  onQuery,
  families,
  onOpen,
  onCreate,
}: {
  query: string
  onQuery: (v: string) => void
  families: Family[]
  onOpen: (id: string) => void
  onCreate: () => void
}) {
  return (
    <section>
      <h1 className="text-2xl font-bold">Familias</h1>
      <label className="mt-4 block text-sm font-medium" htmlFor="q">
        Buscar familia
      </label>
      <input
        id="q"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Nombre del perro o del humano"
        className="mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--background-subtle)] px-3 py-3"
      />
      {families.length === 0 ? (
        <div className="mt-6 rounded-xl border border-[var(--border-default)] p-6">
          <p>No hay coincidencias.</p>
          <button onClick={onCreate} className="mt-3 rounded-lg bg-[var(--action-primary)] px-4 py-2 font-semibold text-white">
            Crear familia
          </button>
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {families.map((f) => (
            <li key={f.id}>
              <button
                onClick={() => onOpen(f.id)}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--background-subtle)] px-4 py-3 text-left"
              >
                <span>
                  <strong>
                    {f.dog}, {f.human}
                  </strong>
                  {f.gaps.length > 0 && (
                    <span className="mt-1 block text-sm text-[var(--status-incomplete)]">Falta {f.gaps[0].label.toLowerCase()}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onCreate} className="mt-4 text-sm font-semibold text-[var(--foreground-muted)]">
        Nueva familia
      </button>
    </section>
  )
}

function FichaScreen({
  family,
  sessions,
  onFillGap,
  onOpenSession,
  onNew,
}: {
  family: Family
  sessions: Session[]
  onFillGap: (id: string) => void
  onOpenSession: (s: Session) => void
  onNew: () => void
}) {
  return (
    <section>
      <p className="text-sm text-[var(--foreground-muted)]">{family.human}</p>
      <h1 className="text-3xl font-bold">{family.dog}</h1>
      {family.gaps.length > 0 && (
        <div className="mt-4 rounded-xl bg-[var(--background-muted)] p-4">
          <p className="text-sm font-semibold">Qué falta</p>
          <ul className="mt-2 space-y-2">
            {family.gaps.map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[var(--background-subtle)] px-2 py-1 text-sm">Falta {g.label.toLowerCase()}</span>
                <button onClick={() => onFillGap(g.id)} className="text-sm font-semibold">
                  Completar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="mt-6 font-bold">Historial</h2>
      {family.history.length === 0 ? (
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">Aún no hay evolución. Si anotas en el sitio, aparece aquí.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {family.history.map((h) => (
            <li key={h.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--background-subtle)] p-3 text-sm">
              <span className="text-[var(--foreground-muted)]">{h.when}</span>
              <p className="mt-1">{h.text}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={onNew} className="rounded-lg bg-[var(--action-primary)] px-4 py-2.5 font-semibold text-white">
          Nueva sesión
        </button>
        {sessions[0] && (
          <button onClick={() => onOpenSession(sessions[0])} className="rounded-lg bg-[var(--action-secondary)] px-4 py-2.5 font-semibold">
            Abrir última sesión
          </button>
        )}
      </div>
    </section>
  )
}

function SessionScreen({
  family,
  session,
  mode,
  onMode,
  onNote,
  onPautas,
  onSaveNote,
  onSavePautas,
  onCopy,
  onPdf,
  onBack,
}: {
  family: Family
  session: Session
  mode: SessionMode
  onMode: (m: SessionMode) => void
  onNote: (t: string) => void
  onPautas: (t: string) => void
  onSaveNote: () => void
  onSavePautas: () => void
  onCopy: () => void
  onPdf: () => void
  onBack: () => void
}) {
  const status = session.noteLocalOnly
    ? 'Solo en este dispositivo'
    : session.noteInFile
      ? 'En el archivo'
      : 'Aún no está en la ficha'

  return (
    <section className="mx-auto max-w-xl">
      <button onClick={onBack} className="text-sm font-semibold text-[var(--foreground-muted)]">
        Atrás
      </button>
      <p className="mt-2 text-sm text-[var(--foreground-muted)]">
        {session.dateLabel} {session.time} · {family.human}
      </p>
      <h1 className="text-2xl font-bold">{family.dog}</h1>
      {mode === 'write' && (
        <div className="mt-3 flex gap-2">
          <button className="text-sm underline" onClick={() => onMode('capture')}>
            Ver captura mínima
          </button>
        </div>
      )}
      {mode === 'capture' && (
        <div className="mt-3 flex gap-2">
          <button className="text-sm underline" onClick={() => onMode('write')}>
            Pasar a redacción (escritorio)
          </button>
        </div>
      )}

      <label className="mt-6 block text-sm font-medium" htmlFor="evo">
        Evolución de esta clase
      </label>
      <textarea
        id="evo"
        value={session.note}
        onChange={(e) => onNote(e.target.value)}
        rows={mode === 'capture' ? 8 : 4}
        className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-[var(--background-subtle)] p-3"
        placeholder="Dos frases. Lo que iría a la libretita."
      />
      <p className="mt-2 text-sm" aria-live="polite">
        {status}
        {session.noteLocalOnly ? ' · pendiente de los otros PCs' : ''}
      </p>
      <button onClick={onSaveNote} className="mt-3 w-full rounded-xl bg-[var(--action-primary)] py-3 font-bold text-white hover:bg-[var(--action-primary-hover)]">
        Guardar en la ficha
      </button>

      {mode === 'write' && (
        <div className="mt-8">
          {family.history.length === 0 && !session.noteInFile && (
            <p className="mb-3 rounded-lg bg-[var(--background-muted)] p-3 text-sm">El historial está vacío. Puedes redactar pautas igual.</p>
          )}
          <label className="block text-sm font-medium" htmlFor="pautas">
            Ejercicios para casa
          </label>
          <textarea
            id="pautas"
            value={session.pautas}
            onChange={(e) => onPautas(e.target.value)}
            rows={5}
            className="mt-1 w-full rounded-xl border border-[var(--border-default)] bg-[var(--background-subtle)] p-3"
            placeholder="Un solo texto. WhatsApp o PDF salen de aquí."
          />
          <button onClick={onSavePautas} className="mt-3 rounded-lg bg-[var(--action-primary)] px-4 py-2.5 font-semibold text-white">
            Guardar pautas
          </button>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={onCopy} className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-secondary)] px-4 py-2.5 font-semibold">
              <Copy size={16} /> Copiar para WhatsApp
            </button>
            <button onClick={onPdf} className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-secondary)] px-4 py-2.5 font-semibold">
              <FileText size={16} /> PDF con membrete
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
