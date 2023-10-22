<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let { databases, users } = data;
</script>

<div class="border p-5 flex flex-col gap-3">
	<h1 class="font-semibold text-lg">Database</h1>

	<form
		method="post"
		use:enhance={() =>
			async ({ result, update }) => {
				if (result.type == 'success') {
					databases = [...databases, result.data];
					update({ reset: true });
				}
			}}
		action="?/database"
		class="flex flex-col gap-3"
	>
		<label class="flex items-center gap-3">
			Name:
			<input type="text" name="name" />
		</label>

		<label class="flex items-center gap-3">
			User:
			<select name="user">
				{#each users as user}
					<option value={user.id}>{user.username}</option>
				{/each}
			</select>
		</label>

		<button type="submit"> create </button>
	</form>

	{#if databases.length > 0}
		<div class="flex flex-col">
			{#each databases as database, i}
				<p>{i + 1}. {database.name}</p>
			{/each}
		</div>
	{:else}
		<p class="italic">No databases found</p>
	{/if}
</div>

<div class="border p-5 flex flex-col gap-3">
	<h1 class="font-semibold text-lg">Users</h1>

	<form
		use:enhance={() =>
			async ({ result, update }) => {
				if (result.type == 'success') {
					users = [...users, result.data];
					update({ reset: true });
				}
			}}
		method="post"
		action="?/user"
		class="flex flex-col gap-3"
	>
		<label class="flex items-center gap-3">
			Username:
			<input type="text" name="username" />
		</label>

		<label class="flex items-center gap-3">
			Password:
			<input type="password" name="password" id="" />
		</label>

		<button> create </button>
	</form>

	{#if users.length > 0}
		<div class="flex flex-col">
			{#each users as user, i}
				<p>{i + 1}. {user.username}</p>
			{/each}
		</div>
	{:else}
		<p class="italic">No databases found</p>
	{/if}
</div>
