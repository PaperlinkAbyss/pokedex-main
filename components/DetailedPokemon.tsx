// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useLayoutEffect, useState } from 'react'
import { Abilities, ID, Stats, Types, type Sprites } from './initialPokemon'
import toCap from './toCap'
type StatePokemon = {
  name: string
  height: number
  types: Types
  abilities: Abilities
  stats: Stats
  sprites: Sprites
  id: ID
}
type DetailedPokemon = {
  selectedPokemon: string
  setSelectedPokemon: (name: string) => void
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png
export default function DetailedPokemon({ selectedPokemon, setSelectedPokemon }: DetailedPokemon) {
  /**
   * Important Structure For Reference: {
   * .weight,
   * .height,
   * .types?.[0-1].type
   * .stats[0-5].base_stat(value of the stat).name (of the previous value, hp, atk, etc)
   * abilities?.[0-1].name,
   * .sprites?.
   *  back_default
   *  back_shiny
   *  front_shiny
   *  back_female?
   *  back_shiny_female?
   *  front_shiny_female?
   *
   *  other.
   *    official_artwork.front_default -> Fixed URL "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/ Number Of The Pokemon (aka .id).png"
   *    dream_world.front_dafault (Also fixed URL,"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/ .id the same.svg")
   *  version.
   *    generation-i to generation-viii in roman numbers, each having fixed URLs and containing .[name of the generation].front_default
   *
   * }
   *
   * For extra details: Check ./DetailedPokemon.tsx
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentPokemon, setCurrentPokemon] = useState < Record<string, any>('')

  useLayoutEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
      .then((response) => response.text())
      .then((data) => {
        return JSON.parse(data)
      })
      .then(({ name, height, types, abilities, stats, sprites, id }: StatePokemon) => {
        setCurrentPokemon({
          name,
          height,
          types,
          abilities,
          stats,
          sprites,
          id,
        })
        setIsHidden(false)
      })
  }, [selectedPokemon])

  const [isHidden, setIsHidden] = useState(!!selectedPokemon)
  useEffect(() => {
    setIsHidden(!!selectedPokemon)
    // setSelectedPokemon('')
  }, [selectedPokemon])
  return (
    <aside
      className={`bg-white/80 md:visible md:fixed md:right-0 md:ml-0 md:mt-auto md:flex md:h-screen md:w-1/3 md:rounded-r-lg md:border-2 md:border-cyan-600
        ${
          isHidden
            ? 'hidden'
            : ' bg-mainbg fixed top-0 order-1  m-0 flex h-full w-full flex-col overflow-hidden p-0 '
        }`}
    >
      <div className='flex justify-center '>
        <img
          className=' max-h-48 self-center shadow-[0_35px_20px_-20px_rgba(255,255,255,0.5)]  sm:max-h-72'
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon?.id}.png`}
        />
      </div>
      <main className='mt-5 flex flex-col text-center '>
        <p>
          <strong className='font-bold '>Name:</strong>
          {toCap(currentPokemon?.name)}
        </p>
        <p>
          <strong className='font-bold '>Height:</strong>
          {currentPokemon?.height / 10}
        </p>
        <p>
          <strong className='font-bold '>
            {currentPokemon?.types?.[1] ? 'Types: ' : 'Type: '}
          </strong>
          {currentPokemon?.types?.[1]
            ? `${toCap(currentPokemon?.types?.[0].type.name)},  ${currentPokemon?.types?.[1].type
                .name}`
            : toCap(currentPokemon?.types?.[0].type.name)}
        </p>
        <p>
          <strong className='font-bold '>
            {currentPokemon?.abilities?.[1] ? 'Abilities: ' : 'Ability: '}
          </strong>
          {currentPokemon?.abilities?.[1]
            ? `${toCap(currentPokemon?.abilities?.[0].ability.name)}, ${currentPokemon
                ?.abilities?.[1].ability.name}`
            : toCap(currentPokemon?.abilities?.[0].ability.name)}
        </p>
        <p>
          <strong className='font-bold '>Stats: </strong>
          {currentPokemon?.stats?.map(
            (currentStat: { stat: { name: string }; base_stat: string }) => {
              //Recorre el array de los stats sacando el nombre del atributo (hp, ataque, defensa, especiales, velocidad) y el valor
              return (
                <p key={currentStat.stat.name}>
                  <strong className='font-medium'>{toCap(currentStat.stat.name)}:</strong>
                  {currentStat.base_stat}
                </p>
              )
            },
          )}
        </p>
        <div className='overflow-none mt-5 flex w-full snap-mandatory flex-row place-content-between bg-cyan-100 bg-opacity-60 md:overflow-auto'>
          {currentPokemon?.sprites?.front_default && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.back_default && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.front_female && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.back_female && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.front_shiny && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.back_shiny && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.front_shiny_female && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/${currentPokemon?.id}.png`}
              alt=''
            />
          )}
          {currentPokemon?.sprites?.back_shiny_female && (
            <img
              className='snap-x'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female${currentPokemon?.id}.png`}
              alt=''
            />
          )}
        </div>
        <button
          onClick={() => setSelectedPokemon('')}
          className='mt-5 w-fit self-center rounded-md border-2 border-cyan-600 bg-cyan-200 bg-opacity-70 p-2 pl-4 pr-4 font-extrabold hover:bg-cyan-500 md:hidden'
        >
          Close
        </button>
      </main>
    </aside>
  )
}
