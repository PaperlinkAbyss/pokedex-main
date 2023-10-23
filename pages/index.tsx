import { useState } from 'react'
import DetailedPokemon from '~/DetailedPokemon'
import PokemonDisplay from '~/PokemonDisplay'
import ViewSelector from '~/ViewSelector'
export type View = 'gallery' | 'list' | 'table'
type Props = { allPokemon: Record<string, unknown>[] }
export default function App(props: Props) {
  const [view, setView] = useState<View>('gallery')
  const stateUpdate = (view: View) => {
    setView(view)
  }
  const [selectedPokemon, setSelectedPokemon] = useState<string>('')
  function detailedPokemon(pokemon: string) {
    setSelectedPokemon(pokemon)
  }

  return (
    <main className='absolute top-0 mt-[-4px]  w-auto bg-green-200'>
      <ViewSelector
        stateUpdate={stateUpdate}
        currentState={view}
      />
      <div className='flex flex-row'>
        <PokemonDisplay
          allPokemon={props.allPokemon}
          setSelectedPokemon={detailedPokemon}
          currentState={view}
        />
        {selectedPokemon && (
          <DetailedPokemon
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        )}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const allPokemon: Record<string, unknown>[] = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=150',
  )
    .then((response) => response.json())
    .then((data) => data.results)

  return { props: { allPokemon } }
}
