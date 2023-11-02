<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const dbSize = data.size[0].pg_size_pretty;

	console.log(data.throughput);
</script>

<div class="bg-neutral-800/50 p-5 rounded-md">
	<h1 class="font-semibold text-2xl capitalize">
		{data.database.datname}
		<span class="font-light text-base">{dbSize}</span>
	</h1>

	<span class="font-light text-base">{data.size}</span>
</div>

{#each data.tables as table}
	<p>{JSON.stringify(table)}</p>
{/each}
