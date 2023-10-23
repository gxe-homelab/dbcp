<script lang="ts">
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<div class="w-screen h-screen flex justify-center items-center">
	<form method="post" use:enhance class="flex flex-col p-2 gap-8">
		<h1 class="text-3xl">Are you sure you want to logout?</h1>

		<div class="flex gap-2 justify-end">
			<Button type="button" on:click={() => goto('/')} color="light">Cancel</Button>
			<Button type="submit" color="red">Logout</Button>
		</div>
	</form>
</div>
