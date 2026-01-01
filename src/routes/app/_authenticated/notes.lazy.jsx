import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { FolderOpenDot } from 'lucide-react'
import Note from '../../../components/Note'
import { useRecord } from '../../../hooks/useRecord'

export const Route = createLazyFileRoute('/app/_authenticated/notes')({
  component: Notes,
})

function Notes() {
  const [record] = useRecord()

  return (
    <>
      <title> Notes | Brillo </title>

      <div className="w-full h-full overflow-auto">
        {record.length == 0 && (
          <div>
            <figure className="p-8.25 flex flex-col items-center justify-center">
              <img
                src="/assets/img/file-search.svg"
                className="h-40 grayscale"
                alt=""
              />
              <p className="p-8.25 border-0 text-center border-grey opacity-65">
                No notes yet.
              </p>
            </figure>
          </div>
        )}

        {record.map((record, index) => (
          <section key={index} className="p-8.25 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-medium">{formatDate(record.date)}</h3>
              <FolderOpenDot />
            </div>
            <ul className="grid sm:grid-cols md:grid-cols-3 gap-4 flex-wrap">
              {record.notes.map((note, index, notes) => (
                <Note
                  key={note.id}
                  className={notes.length === 1 ? 'sm:max-w-[70%]' : ''}
                  note={note}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

function formatDate(date) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const format = [
    'en-us',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  ]

  const todayDate = today.toLocaleDateString(...format)
  const yesterdayDate = yesterday.toLocaleDateString(...format)

  return date === todayDate
    ? 'Today'
    : date === yesterdayDate
      ? 'Yesterday'
      : date
}
