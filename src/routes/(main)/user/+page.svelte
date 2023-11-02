<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';

	export let data: PageData;

	const rm = (name: string) =>
		fetch(`${base}/user?name=${name}`, { method: 'delete' }).then(invalidateAll);
</script>

<form
	method="post"
	action="?/create"
	class="py-10 w-min mx-auto flex lg:flex-row flex-col gap-10"
	use:enhance={({}) => {
		return ({ result }) => invalidateAll();
	}}
>
	<table>
		<caption class="text-left pb-5">
			<h1>💪 CURRENT USER</h1>
		</caption>

		<thead>
			<th>oid</th>
			<th>name</th>
			<th>connection limit</th>
			<th>super user?</th>
			<th>can create role?</th>
			<th>can create db?</th>
			<th>can login?</th>
			<th>delete</th>
		</thead>

		<tbody>
			{#each data.users as user (user.oid)}
				<tr>
					<td>{user.oid}</td>
					<td>{user.rolname}</td>
					<td>{user.rolconnlimit == -1 ? 'unlimited' : user.rolconnlimit}</td>
					<td>{user.rolsuper ? 'yes' : 'no'}</td>
					<td>{user.rolcreaterole ? 'yes' : 'no'}</td>
					<td>{user.rolcreatedb ? 'yes' : 'no'}</td>
					<td>{user.rolcanlogin ? 'yes' : 'no'}</td>
					<td class="text-center">
						<button
							disabled={user.oid < 16400}
							type="button"
							on:click={() => rm(user.rolname)}
							class="disabled:opacity-40 disabled:cursor-not-allowed"
						>
							💣
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex flex-col gap-5 grow">
		<h1>🐊 ADD USER</h1>

		<label class="flex flex-col gap-1">
			<span>Name:</span>
			<input type="text" name="name" />
		</label>

		<label class="flex flex-col gap-1">
			<span>Password:</span>
			<input type="password" name="password" />
		</label>

		<label class="flex gap-2 items-center">
			<input type="checkbox" name="sudo" />
			<span>Is Sudo</span>
		</label>

		<label class="flex gap-2 items-center">
			<input type="checkbox" name="createdb" />
			<span>Can Create Database</span>
		</label>

		<label class="flex gap-2 items-center">
			<input type="checkbox" name="createrole" />
			<span>Can Create Role</span>
		</label>

		<label class="flex gap-2 items-center">
			<input type="checkbox" name="login" />
			<span>Can Login</span>
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
