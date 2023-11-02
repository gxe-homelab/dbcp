<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';

	export let data: PageData;

	const rm = (name: string) =>
		fetch(`${base}/database?name=${name}`, { method: 'delete' }).then(invalidateAll);
</script>

<form
	method="post"
	action="?/create"
	class="py-10 w-min mx-auto flex lg:flex-row flex-col gap-10"
	use:enhance={() => invalidateAll}
>
	<table>
		<caption class="text-left pb-5">
			<h1>💪 CURRENT DATABASE</h1>
		</caption>

		<thead>
			<th>oid</th>
			<th>name</th>
			<th>connection limit</th>
			<th>can connect?</th>
			<th>delete</th>
		</thead>

		<tbody>
			{#each data.databases as db (db.oid)}
				{#if db.oid > 10}
					<tr>
						<td>{db.oid}</td>
						<td>{db.datname}</td>
						<td>{db.datconnlimit == -1 ? '∞' : db.datconnlimit}</td>
						<td>{db.datallowconn ? 'yes' : 'no'}</td>
						<td class="text-center">
							<button
								disabled={db.oid < 16400}
								type="button"
								on:click={() => rm(db.datname)}
								class="disabled:opacity-40 disabled:cursor-not-allowed"
							>
								💣
							</button>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>

	<div class="flex flex-col gap-5 grow">
		<h1>🐊 ADD DATABASE</h1>

		<label class="flex flex-col gap-1">
			<span>Name:</span>
			<input type="text" name="name" />
		</label>

		<label class="flex flex-col gap-1">
			<span>Connection Limit:</span>
			<select name="owner">
				{#each data.users as user}
					{#if !user.rolname.startsWith('pg_')}
						<option selected={user.rolname == 'admin'} value={user.rolname}>{user.rolname}</option>
					{/if}
				{/each}
			</select>
		</label>

		<label class="flex gap-2 items-center">
			<input type="checkbox" name="allowconn" />
			<span>Can Connect</span>
		</label>

		<label class="flex flex-col gap-1">
			<span>Connection Limit:</span>
			<input type="number" name="connlimit" min={-1} max={100} />
		</label>

		<div class="flex gap-3 pt-3">
			<button type="reset" class="grow bg-neutral-700 text-neutral-100 py-2.5">Reset</button>
			<button type="submit" class="grow bg-blue-700 text-neutral-200">Submit</button>
		</div>
	</div>
</form>

<style lang="postcss">
	th {
		@apply text-left uppercase text-opacity-75 text-xs;
	}

	th,
	td {
		@apply p-2.5 border-2;
	}
</style>
