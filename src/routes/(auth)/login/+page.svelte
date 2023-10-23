<script lang="ts">
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import type { PageData, ActionData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;

	const enhanceFn: SubmitFunction = ({}) => {
		return ({ update }) => {
			update({ reset: true });
		};
	};
</script>

<div class="w-screen h-screen flex justify-center items-center">
	<form use:enhance={enhanceFn} method="post" class="max-w-screen-sm grow flex flex-col gap-7">
		<h1 class="font-semibold text-3xl">Login</h1>

		<Label defaultClass="space-y-2">
			<span>Username</span>
			<Input name="username" type="text" size="md" required />
			{#if form?.missing && form?.username}
				<Helper color="red">Username is required!</Helper>
			{/if}
		</Label>

		<Label defaultClass="space-y-2">
			<span>Password</span>
			<Input name="password" type="password" size="md" required />

			{#if form?.missing && form.password}
				<Helper color="red">Password is required!</Helper>
			{/if}

			{#if form?.wrong}
				<Helper color="red">Password is incorrect!</Helper>
			{/if}
		</Label>

		{#if form?.notfound}
			<Helper class="-mb-4" color="red">User doesn't exist!</Helper>
		{/if}

		<Button type="submit" color="dark">Submit</Button>
	</form>
</div>
