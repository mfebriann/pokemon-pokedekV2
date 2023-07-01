function Header() {
	return (
		<header className="bg-blue-600 fixed top-0 left-0 right-0 py-4 px-4">
			<nav className="container flex justify-between items-center mx-auto">
				<a href="/" className=" text-yellow-300 font-semibold text-3xl sm:text-4xl">
					Pokedek?
				</a>
				<ul>
					<li className="text-white font-medium sm:text-lg">
						<a href="/" className="block px-4 py-2 text-sm rounded-md bg-blue-300/30 hover:bg-blue-300/20">
							Home
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

function Body() {
	const [pokemonName, setPokemonName] = React.useState('');
	const [pokemonData, setPokemonData] = React.useState(null);
	const [status, setStatus] = React.useState(false);
	const [statusLoading, setStatusLoading] = React.useState(false);
	const [detailPokemon, setDetailPokemon] = React.useState(false);
	const [collapseMoves, setCollapseMoves] = React.useState(false);

	const colorsType = {
		bug: '#1A4C24',
		dark: '#040706',
		dragon: '#428B93',
		electric: '#E1E32A',
		fairy: '#971944',
		fighting: '#9A3F25',
		fire: '#A72122',
		flying: '#49677D',
		ghost: '#313367',
		grass: '#157A3B',
		ground: '#A8702B',
		ice: '#86D1F3',
		normal: '#75515D',
		poison: '#5E2D88',
		psychic: '#A42A6C',
		rock: '#44170B',
		steel: '#60746D',
		water: '#1453E0',
	};

	async function RequestAPI() {
		try {
			const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
			const response = await request.json();
			setPokemonData(response);
		} catch (e) {
			setStatus(true);
			setPokemonData(null);
			console.log(`Error: ${e}`);
		} finally {
			setStatusLoading(false);
		}
	}

	function getPokemonName(e) {
		e.preventDefault();
		setPokemonName(e.target.value);
	}

	function dataPokemon(e) {
		e.preventDefault();
		setStatusLoading(true);
		setPokemonData(null);
		RequestAPI();
		setPokemonName('');
	}

	function dataDetailPokemon() {
		setDetailPokemon(true);
	}

	function closeDetailPokemon(e) {
		if (e.target.classList.contains('fixed') || e.target.tagName === 'svg' || e.target.tagName === 'path') {
			setDetailPokemon(false);
			setCollapseMoves(false);
		}
	}

	return (
		<main className="mt-32 px-4">
			<section className="container mx-auto">
				<h1 className="font-bold text-slate-800 text-5xl sm:text-center">Pokemon Pokedex</h1>
				<form className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row" onSubmit={dataPokemon}>
					<input type="search" placeholder="Search pokemon name..." className="border-blue-400 border-2 rounded-sm px-3 py-2 focus:border-blue-300 outline-none w-full sm:w-[500px]" autoFocus required value={pokemonName} onChange={getPokemonName} />
					<button type="submit" className="bg-blue-600 rounded-md p-3 text-white font-medium w-full sm:w-auto">
						Search
					</button>
				</form>
				<div className="mt-10 flex justify-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" className={`animate-spin ${!statusLoading ? 'hidden' : ''}`}>
						<path
							d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"
							fill="rgba(37,99,235,1)"
						></path>
					</svg>

					{detailPokemon ? (
						<div className="fixed inset-0 bg-black/70 z-10 grid place-items-center" onClick={closeDetailPokemon}>
							<div className="flex flex-row-reverse">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" className="cursor-pointer absolute right-0 top-10 md:static" onClick={closeDetailPokemon}>
									<path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z" fill="rgba(255,255,255,1)"></path>
								</svg>
								<div className="bg-white rounded-md w-full overflow-auto absolute left-0 bottom-0 h-[90vh] md:static md:h-[480px] md:w-[600px]">
									<figure className="h-80 flex justify-center flex-col items-center gap-8 rounded-t-md" style={{ background: `linear-gradient(to top, rgb(243, 244, 246), ${colorsType[`${pokemonData['types'][0].type.name}`]})` }}>
										<img src={pokemonData.sprites.versions['generation-v']['black-white'].animated['front_default']} alt={pokemonData.name} className="h-48 " />
										<figcaption className="font-semibold italic text-slate-800 text-2xl sm:text-3xl capitalize">{pokemonData.name}</figcaption>
									</figure>
									<div className="bg-white md:rounded-b-md py-8 px-10 flex flex-col gap-y-8">
										<div>
											<p className="text-slate-700 font-semibold text-center text-xl mb-3">Type</p>
											<ul className="flex justify-center flex-wrap gap-2">
												{pokemonData['types'].map((typePokemon) => {
													return (
														<li key={typePokemon.type.name} className="capitalize font-medium text-white px-3 py-2 text-sm rounded-full" style={{ backgroundColor: colorsType[`${typePokemon.type.name}`] }}>
															{typePokemon.type.name}
														</li>
													);
												})}
											</ul>
										</div>
										<div className={`${collapseMoves ? '' : 'h-52'} overflow-hidden relative`}>
											<p className="text-slate-700 font-semibold text-center text-xl mb-3">Moves</p>
											<ul className="flex justify-center flex-wrap gap-2">
												{pokemonData['moves'].map((movePokemon) => {
													return (
														<li key={movePokemon.move.name} className="capitalize font-medium text-white px-3 py-2 text-sm rounded-full" style={{ backgroundColor: colorsType[`${pokemonData['types'][0].type.name}`] }}>
															{movePokemon.move.name}
														</li>
													);
												})}
											</ul>
											<div className={`absolute bottom-0 left-0 right-0 flex h-40 items-end justify-center bg-gradient-to-b from-transparent to-white ${collapseMoves ? 'hidden' : ''}`}>
												<button
													className="rounded border-2 border-blue-600 bg-white px-3 py-2 text-sm text-blue-600 duration-100 hover:bg-blue-600 hover:text-white"
													onClick={function () {
														setCollapseMoves(true);
													}}
												>
													Show All
												</button>
											</div>
										</div>
										<div>
											<p className="text-slate-700 font-semibold text-center text-xl mb-3">Stats</p>
											<div className="flex flex-col gap-3">
												{pokemonData['stats'].map((statPokemon) => {
													return (
														<div className="flex gap-4 justify-center items-center" key={statPokemon.stat.name}>
															<span className="uppercase text-slate-600 font-medium text-right w-1/2">{statPokemon.stat.name.split('-').join(' ')}</span>
															<div className="bg-gray-200 h-5 w-1/2 rounded-full">
																<div className="h-full rounded-full flex justify-center items-center" style={{ width: `${statPokemon.base_stat}%`, backgroundColor: colorsType[`${pokemonData['types'][0].type.name}`] }}>
																	<span className="text-white font-semibold">{statPokemon.base_stat}%</span>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						''
					)}

					{pokemonData != null ? (
						<figure className="mx-auto w-full transform cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-gradient-to-t from-gray-100 to-gray-300 pb-3 text-center duration-150 ease-in-out hover:scale-105 sm:w-80" onClick={dataDetailPokemon}>
							<img src={pokemonData.sprites.versions['generation-v']['black-white'].animated['front_default']} alt={pokemonData.name} className="mx-auto h-40 pt-6" />
							<figcaption className="font-semibold italic text-slate-800 text-2xl mt-5 sm:text-3xl capitalize">{pokemonData.name}</figcaption>
						</figure>
					) : (
						<p className={`font-medium text-2xl sm:text-3xl text-slate-900/20 text-center ${statusLoading ? 'hidden' : ''}`}>{!status ? 'Find your pokemon!' : 'Pokemon not found!'}</p>
					)}
				</div>
			</section>
		</main>
	);
}

function Footer() {
	return (
		<footer className="bg-blue-600 px-4 py-3 absolute bottom-0 left-0 right-0 text-white">
			<div className="container mx-auto flex items-center justify-between flex-wrap gap-3 text-sm">
				<span className="font-medium">2023. Pokedek?</span>
				<div className="flex items-center flex-wrap gap-4">
					<div>
						<span className="opacity-60">API Powered by </span>
						<a href="https://pokeapi.co/" className="text-white underline font-medium">
							PokeAPI
						</a>
					</div>
					<span className="opacity-60"> | </span>
					<div>
						<span className="opacity-60">Inspired by </span>
						<a href="https://pokemon-pokedex-ebon.vercel.app/" className="text-white underline font-medium">
							Pokemon Pokedex Ebon
						</a>
					</div>
					<span className="opacity-60"> | </span>
					<div>
						<span className="opacity-60">Github </span>
						<a href="https://github.com/mfebriann" className="text-white underline font-medium">
							mfebriann
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

function App() {
	return (
		<>
			<Header />
			<Body />
			<Footer />
		</>
	);
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
