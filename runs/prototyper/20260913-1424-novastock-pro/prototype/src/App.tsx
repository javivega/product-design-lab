import { useState } from 'react'
import { CheckCircle2, ClipboardList, Cloud, CloudOff, PackageCheck, ShieldCheck, WifiOff } from 'lucide-react'

type Screen = {
  name: string; group: string; title: string; purpose: string; primary: string; secondary: string
}

const screens: Screen[] = [
  { name: 'Espacio de recepción', group: 'Operación', title: 'Recepción R-2048', purpose: 'Registrar y cerrar una recepción con identidad y cantidad verificadas.', primary: 'Cerrar localmente', secondary: 'Derivar excepción' },
  { name: 'Revisión de excepción', group: 'Operación', title: 'Excepción de recepción', purpose: 'Comprender y entregar una recepción que no puede cerrarse localmente.', primary: 'Entregar a revisión', secondary: 'Volver a recepción' },
  { name: 'Espacio de tarea operativa', group: 'Operación', title: 'Picking P-186', purpose: 'Completar una tarea sin omitir identidad ni cantidad.', primary: 'Completar tarea', secondary: 'Crear seguimiento' },
  { name: 'Detalle de seguimiento pendiente', group: 'Operación', title: 'Seguimiento S-019', purpose: 'Retomar un control aplazado durante la hora punta.', primary: 'Completar seguimiento', secondary: 'Entregar caso' },
  { name: 'Visión operativa', group: 'Supervisión', title: 'Estado operativo', purpose: 'Consultar el estado junto con la confianza de los datos.', primary: 'Abrir incidencia', secondary: 'Actualizar consulta' },
  { name: 'Detalle de incidencia', group: 'Supervisión', title: 'Incidencia I-441', purpose: 'Entender una incidencia y llegar a su contexto de resolución.', primary: 'Abrir diferencia', secondary: 'Investigar artículo' },
  { name: 'Detalle de diferencia', group: 'Supervisión', title: 'Diferencia D-772', purpose: 'Decidir si una diferencia se corrige o queda pendiente.', primary: 'Registrar corrección', secondary: 'Dejar pendiente' },
  { name: 'Cola de revisión', group: 'Supervisión', title: 'Cola de revisión', purpose: 'Encontrar y retomar trabajo que no puede cerrarse con seguridad.', primary: 'Abrir caso', secondary: 'Filtrar casos' },
  { name: 'Investigación de artículo', group: 'Auditoría', title: 'Historia del artículo', purpose: 'Seguir los movimientos autorizados de un artículo.', primary: 'Abrir movimiento', secondary: 'Cambiar investigación' },
  { name: 'Detalle de movimiento', group: 'Auditoría', title: 'Movimiento M-938', purpose: 'Consultar la evidencia autorizada de un evento.', primary: 'Volver a la historia', secondary: 'Ver evidencia relacionada' },
]

function SyncStatus({ offline }: { offline: boolean }) {
  return <span className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold ${offline ? 'bg-amber-50 text-[var(--status-warning)]' : 'bg-emerald-50 text-[var(--status-success)]'}`}>
    {offline ? <CloudOff size={17} aria-hidden /> : <Cloud size={17} aria-hidden />} {offline ? 'Guardado localmente · pendiente de sincronizar' : 'Datos confirmados'}
  </span>
}

function App() {
  const [active, setActive] = useState(screens[0])
  const [offline, setOffline] = useState(true)
  const [notice, setNotice] = useState('La recepción puede cerrarse localmente cuando identidad y cantidad están verificadas.')
  const groups = [...new Set(screens.map(s => s.group))]

  const complete = () => {
    setNotice(offline ? 'Guardado localmente. La operación puede continuar; la sincronización queda pendiente.' : 'Acción confirmada y registrada.')
  }

  return <div className="min-h-screen md:grid md:grid-cols-[270px_1fr]">
    <aside className="border-b border-[var(--border-default)] bg-[var(--background-subtle)] p-4 md:min-h-screen md:border-b-0 md:border-r">
      <div className="mb-6 flex items-center gap-3 px-2"><div className="rounded-md bg-[var(--action-primary)] p-2 text-white"><PackageCheck aria-hidden /></div><div><strong className="block">NovaStock Pro</strong><span className="text-sm text-[var(--foreground-muted)]">Demo operativa</span></div></div>
      <nav aria-label="Áreas del prototipo" className="space-y-5">
        {groups.map(group => <div key={group}><p className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground-muted)]">{group}</p>
          {screens.filter(s => s.group === group).map(screen => <button key={screen.name} onClick={() => { setActive(screen); setNotice('') }} className={`mb-1 w-full rounded-md px-3 py-2 text-left text-sm ${active.name === screen.name ? 'bg-[var(--action-secondary)] font-bold text-[var(--action-primary)]' : 'hover:bg-[var(--background-muted)]'}`}>{screen.name}</button>)}
        </div>)}
      </nav>
    </aside>
    <main className="p-4 sm:p-7">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-[var(--foreground-muted)]">{active.group} / {active.name}</p><h1 className="mt-1 text-2xl font-bold">{active.title}</h1></div><button onClick={() => setOffline(!offline)} className="rounded-md border border-[var(--border-default)] px-3 py-2 text-sm font-semibold">{offline ? <span className="inline-flex gap-2"><WifiOff size={17}/> Simular conexión</span> : <span className="inline-flex gap-2"><CloudOff size={17}/> Simular sin red</span>}</button></header>
      <section className="mb-5 rounded-md border border-[var(--border-default)] bg-[var(--background-subtle)] p-5 shadow-sm"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold">Trabajo actual</h2><p className="mt-1 text-[var(--foreground-muted)]">{active.purpose}</p></div><SyncStatus offline={offline} /></div>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]"><div className="rounded-md bg-[var(--background-muted)] p-4"><p className="text-sm font-semibold">Identidad y cantidad</p><label className="mt-3 block text-sm font-medium" htmlFor="item">Artículo o referencia</label><input id="item" defaultValue="SKU-00831 · Palé de bebidas" className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-white px-3 py-2" /><label className="mt-3 block text-sm font-medium" htmlFor="amount">Cantidad verificada</label><input id="amount" defaultValue="48 unidades" className="mt-1 w-full rounded-md border border-[var(--border-default)] bg-white px-3 py-2" /></div>
          <div className="rounded-md border border-[var(--border-default)] p-4"><p className="text-sm font-semibold">Contexto y evidencia</p><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between gap-3"><dt className="text-[var(--foreground-muted)]">Origen</dt><dd>Muelle 3</dd></div><div className="flex justify-between gap-3"><dt className="text-[var(--foreground-muted)]">Responsable</dt><dd>Operario de muelle</dd></div><div className="flex justify-between gap-3"><dt className="text-[var(--foreground-muted)]">Estado</dt><dd>{offline ? 'Pendiente de sincronizar' : 'Confirmado'}</dd></div></dl></div></div>
        <div className="mt-5 flex flex-wrap gap-3"><button onClick={complete} className="rounded-md bg-[var(--action-primary)] px-4 py-2.5 font-bold text-white hover:bg-[var(--action-primary-hover)]">{active.primary}</button><button onClick={() => setNotice('Acción secundaria preparada como simulación.') } className="rounded-md bg-[var(--action-secondary)] px-4 py-2.5 font-semibold">{active.secondary}</button></div>
      </section>
      {notice && <div role="status" className="flex gap-3 rounded-md border border-[var(--border-default)] bg-white p-4 text-sm"><CheckCircle2 className="shrink-0 text-[var(--status-success)]" aria-hidden /><span>{notice}</span></div>}
      <section className="mt-5 grid gap-4 lg:grid-cols-2"><article className="rounded-md border border-[var(--border-default)] bg-white p-5"><h2 className="flex items-center gap-2 font-bold"><ClipboardList size={18}/> Historial relacionado</h2><p className="mt-2 text-sm text-[var(--foreground-muted)]">Los detalles y casos pendientes conservan el origen para poder retomar el trabajo sin reconstruirlo desde memoria.</p></article><article className="rounded-md border border-[var(--border-default)] bg-white p-5"><h2 className="flex items-center gap-2 font-bold"><ShieldCheck size={18}/> Condición de confianza</h2><p className="mt-2 text-sm text-[var(--foreground-muted)]">Los datos no confirmados se muestran como provisionales. Las políticas de conflicto siguen simuladas.</p></article></section>
    </main>
  </div>
}

export default App
