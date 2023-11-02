<script lang="ts">
	import { VisXYContainer, VisLine, VisScatter, VisAxis } from '@unovis/svelte';
	import type { PageData } from './$types';
	import { poll } from '$lib/poll';

	export let data: PageData;

	let statistics = [data.throughput];
	let derived = [
		{
			yFetched: 0,
			yReturned: 0,
			x: Date.now()
		},
		{
			yFetched: 0,
			yReturned: 0,
			x: Date.now()
		}
	];

	poll(async () => {
		const res = await fetch('/api/monitoring/throughput');

		if (statistics.length == 1) {
			statistics = [...statistics, await res.json()];
		} else {
			statistics = [statistics[1], await res.json()];
		}

		derived = [
			...derived,
			{
				yFetched: statistics[1].fetched - statistics[0].fetched,
				yReturned: statistics[1].returned - statistics[0].returned,
				x: Date.now()
			}
		];

		console.log(statistics, derived);
	}, 2000);

	const x = (data) => data.x;

	const y = [(data) => data.yFetched, (data) => data.yReturned];
	console.log(data.throughput);
</script>

<section class="flex">
	<VisXYContainer data={derived}>
		<VisLine {x} {y} />
	</VisXYContainer>

	<VisXYContainer data={derived}>
		<VisAxis type="x" />
		<VisAxis type="y" />

		<VisLine curveType="linear" fallbackValue={7} {x} {y} />
		<VisScatter {x} {y} />
	</VisXYContainer>

	<VisXYContainer data={derived}>
		<VisLine {x} {y} />
	</VisXYContainer>
</section>

<section>databases</section>

<section>users</section>
