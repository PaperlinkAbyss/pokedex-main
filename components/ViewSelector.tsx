import { View } from '~w/pokedex'
type Props = {
  stateUpdate: (argument: View) => void
  currentState: View
}

export default function ViewSelector({ stateUpdate, currentState }: Props) {
  return (
    <nav className='m-1 mb-0 mt-2 flex w-fit flex-row rounded-t-lg border-2 border-b-0 border-cyan-800 bg-cyan-100 p-1'>
      <div
        className={`p-1 ${
          currentState === 'gallery' ? ' rounded-lg border-2 border-dotted border-cyan-600' : 'p-2'
        }`}
        onClick={() => stateUpdate('gallery')}
      >
        Gallery
      </div>
      <div
        className={`p-1 ${
          currentState === 'table' ? ' rounded-lg border-2 border-dotted border-cyan-600' : 'p-2'
        }`}
        onClick={() => stateUpdate('table')}
      >
        Table
      </div>
      <div
        className={`p-1 ${
          currentState === 'list' ? 'rounded-lg border-2 border-dotted border-cyan-600' : 'p-2'
        }`}
        onClick={() => stateUpdate('list')}
      >
        List
      </div>
    </nav>
  )
}
