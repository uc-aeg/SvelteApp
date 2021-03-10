<script>
	import { onMount } from 'svelte';
	import Welcome from './screens/Welcome.svelte';
	import Game from './screens/Game.svelte';
	import { select } from './select';
	import { load_image } from './utils.js';
	import * as Sentry from "@sentry/browser";
	import { Integrations } from "@sentry/tracing";

	Sentry.init({
		dsn: "https://bb4c1914b9804472aa1bac0b36f4baf1@o534444.ingest.sentry.io/5656691",
		integrations: [new Integrations.BrowserTracing()],
		tracesSampleRate: 1.0,
	});

	let celebs_promise;

	let state = 'welcome'; // 'welcome' or 'playing'
	let selection;

	const start = async (e) => {
		const { celebs, lookup } = await celebs_promise;

		selection = select(celebs, lookup, e.detail.category.slug);
		state = 'playing';
	};

	const load_celebs = async () => {
		//Sentry.captureMessage('hello');
		const res = await fetch('https://cameo-explorer.netlify.app/celeb.json');
		const data=[];
		if(res.status != '404'){
			data = await res.json();
		}else{
			//Sentry.captureMessage('404 error');
			return res.status;
		}

		const lookup = new Map();

		data.forEach(c => {
			lookup.set(c.id, c);
		});

		const subset = new Set();
		data.forEach(celeb => {
			if (celeb.reviews >= 50) {
				subset.add(celeb);
				celeb.similar.forEach(id => {
					subset.add(lookup.get(id));
				});
			}
		});

		return {
			celebs: Array.from(subset),
			lookup
		};
	};

	onMount(() => {
		//Sentry.captureMessage('Hello, world!');
		celebs_promise = load_celebs();

		load_image('/icons/right.svg');
		load_image('/icons/wrong.svg');
	});
	let text = "Hi";
</script>

<main>
	<p data-testid="text">{text}</p>
	{#if state === 'welcome'}
		<Welcome on:select={start}/>
	{:else if state === 'playing'}
		<Game {selection} on:restart={() => state = 'welcome'}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>